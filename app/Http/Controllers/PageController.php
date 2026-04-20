<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Program;
use App\Models\Faculty;
use App\Models\Organization;
use App\Models\Member;

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
     * PROGRAM
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
     * =========================
     * ORMAWA
     * =========================
     */
    public function ormawa()
    {
        $faculties = Faculty::orderBy('name')->get();

        $organizations = Organization::with('faculty')
            ->orderBy('name')
            ->get();

        return view('ormawa.index', compact('faculties', 'organizations'));
    }

    /**
     * =========================
     * 🔥 FAKULTAS (SUPER FINAL FIX)
     * =========================
     */
    public function fakultas($slug)
    {
        /**
         * Alias URL
         */
        $aliasMap = [
            'filkom' => 'fakultas-ilmu-komputer',
            'ft'     => 'fakultas-teknik',
            'fkip'   => 'fakultas-keguruan',
            'fai'    => 'fakultas-agama-islam',
            'fe'     => 'fakultas-ekonomi',
        ];

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
         * BEM Fakultas
         */
        $bem = Organization::where('faculty_id', $faculty->id)
            ->where('type', 'bem')
            ->with([
                'leaders',
                'programs' => fn($q) => $q->where('status', 'active')->latest('start_date'),
                'news'     => fn($q) => $q->where('status', 'published')->latest('publish_date'),
                'himas.leaders',
                'himas.programs' => fn($q) => $q->where('status', 'active')->latest('start_date'),
                'himas.news'     => fn($q) => $q->where('status', 'published')->latest('publish_date'),
            ])
            ->firstOrFail();

        /**
         * HIMA
         */
        $himas = $bem->himas;

        /**
         * News gabungan
         */
        $news = $bem->news
            ->merge($himas->flatMap->news)
            ->sortByDesc('publish_date')
            ->values();

        /**
         * Fakultas lain
         */
        $otherFaculties = Faculty::where('id', '!=', $faculty->id)
            ->orderBy('name')
            ->get();

        /**
         * =====================================
         * 🔥🔥🔥 MEMBERS FINAL SUPER FIX 🔥🔥🔥
         * =====================================
         * AMBIL MEMBER BERDASARKAN ORGANIZATION
         * BUKAN CUMA faculty_id
         */
        $members = Member::whereHas('organization', function ($q) use ($faculty) {
                $q->where('faculty_id', $faculty->id);
            })
            ->where('is_active', 1)
            ->orderByRaw("
                CASE 
                    WHEN position = 'Ketua' THEN 1
                    WHEN position = 'Wakil Ketua' THEN 2
                    WHEN position = 'Sekretaris' THEN 3
                    WHEN position = 'Bendahara' THEN 4
                    ELSE 5
                END
            ")
            ->orderBy('order')
            ->get();

        return view('pages.fakultas.index', compact(
            'faculty',
            'bem',
            'himas',
            'news',
            'otherFaculties',
            'members'
        ));
    }
}