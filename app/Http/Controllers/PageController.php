<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Program;
use App\Models\Faculty;
use App\Models\Organization;

class PageController extends Controller
{
    /**
     * =========================
     * HOMEPAGE
     * =========================
     */
    public function beranda()
    {
        $programs = [
            [
                'icon' => '📚',
                'title' => 'Pendidikan & Akademik',
                'description' => 'Program pengembangan akademik mahasiswa.',
            ],
            [
                'icon' => '🤝',
                'title' => 'Sosial & Kemasyarakatan',
                'description' => 'Kegiatan sosial dan pengabdian masyarakat.',
            ],
            [
                'icon' => '💡',
                'title' => 'Kreativitas & Inovasi',
                'description' => 'Pengembangan kreativitas mahasiswa.',
            ],
            [
                'icon' => '🏆',
                'title' => 'Kepemimpinan & Organisasi',
                'description' => 'Pelatihan kepemimpinan dan soft skill.',
            ],
        ];

        $news = News::with(['organization.faculty'])
            ->where('status', 'published')
            ->orderByDesc('publish_date')
            ->take(3)
            ->get();

        return view('pages.beranda', compact('programs', 'news'));
    }

    /**
     * =========================
     * PROFIL
     * =========================
     */
    public function profil()
    {
        return view('pages.profil');
    }

    /**
     * =========================
     * PROGRAM GLOBAL (BEM + HIMA)
     * =========================
     */
    public function program()
    {
        $programs = Program::with('organization.faculty')
            ->where('status', 'active')
            ->orderByDesc('start_date')
            ->get();

        return view('pages.program', compact('programs'));
    }

    /**
     * =========================
     * DETAIL PROGRAM  ✅ (FINAL FIX)
     * =========================
     */
    public function showProgram(Program $program)
    {
        return view('pages.program-detail', compact('program'));
    }

    /**
     * =========================
     * BERITA
     * =========================
     */
    public function berita()
    {
        $news = News::with(['organization.faculty'])
            ->where('status', 'published')
            ->latest('publish_date')
            ->paginate(9);

        return view('pages.berita', compact('news'));
    }

    /**
     * =========================
     * DETAIL BERITA
     * =========================
     */
    public function beritaDetail($slug)
    {
        $berita = News::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $relatedNews = News::where('status', 'published')
            ->where('id', '!=', $berita->id)
            ->latest('publish_date')
            ->take(3)
            ->get();

        return view('pages.berita-detail', compact('berita', 'relatedNews'));
    }

    /**
     * ==================================================
     * BEM FAKULTAS + HIMA (FINAL & STABIL)
     * ==================================================
     */
    public function fakultas($slug)
    {
        /**
         * Alias URL → slug database
         */
        $aliasMap = [
                'filkom' => 'fakultas-ilmu-komputer',
                'ft'     => 'fakultas-teknik',
               'fkip'   => 'fakultas-keguruan',
              'fai'    => 'fakultas-agama-islam',
             'fe'     => 'fakultas-ekonomi',
        ];

        // Redirect alias (SEO-friendly)
        if (isset($aliasMap[$slug])) {
            return redirect()->route('fakultas.show', [
                'slug' => $aliasMap[$slug],
            ], 301);
        }

        /**
         * Fakultas
         */
        $faculty = Faculty::where('slug', $slug)->firstOrFail();

        /**
         * BEM Fakultas + eager load semua relasi
         */
        $bem = Organization::where('faculty_id', $faculty->id)
            ->where('type', 'bem')
            ->with([
                'leaders',
                'programs' => function ($q) {
                    $q->where('status', 'active')
                      ->orderByDesc('start_date');
                },
                'news' => function ($q) {
                    $q->where('status', 'published')
                      ->orderByDesc('publish_date');
                },
                'himas.leaders',
                'himas.programs' => function ($q) {
                    $q->where('status', 'active')
                      ->orderByDesc('start_date');
                },
                'himas.news' => function ($q) {
                    $q->where('status', 'published')
                      ->orderByDesc('publish_date');
                },
            ])
            ->firstOrFail();

        /**
         * HIMA (child organization dari BEM)
         */
        $himas = $bem->himas;

        /**
         * Berita Fakultas (gabungan BEM + semua HIMA)
         */
        $news = $bem->news
            ->merge($himas->flatMap->news)
            ->sortByDesc('publish_date')
            ->values();

        /**
         * Fakultas lain (navigasi)
         */
        $otherFaculties = Faculty::where('id', '!=', $faculty->id)
            ->orderBy('name')
            ->get();

        return view('pages.fakultas.index', compact(
            'faculty',
            'bem',
            'himas',
            'news',
            'otherFaculties'
        ));
    }
}
