<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Organization;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class NewsController extends Controller
{
    use AuthorizesRequests;

    /**
     * =========================
     * LIST BERITA
     * =========================
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $query = News::with(['organization.faculty', 'author']);

        // Admin fakultas hanya lihat fakultasnya
        if (!$user->isSuperAdmin()) {
            $query->whereHas('organization', function ($q) use ($user) {
                $q->where('faculty_id', $user->faculty_id);
            });
        }

        $news = $query->latest()->paginate(10);

        return view('admin.news.index', compact('news'));
    }

    /**
     * =========================
     * FORM CREATE
     * =========================
     */
    public function create(Request $request)
{
    $user = $request->user();

    if ($user->isSuperAdmin()) {

        $bemUniversitas = Organization::where('type', 'bem')
            ->whereNull('faculty_id')
            ->get();

        $bemFakultas = Organization::where('type', 'bem')
            ->whereNotNull('faculty_id')
            ->get();

        $himas = Organization::where('type', 'hima')->get();

    } else {

        $bemUniversitas = Organization::where('type', 'bem')
            ->whereNull('faculty_id')
            ->get();

        $bemFakultas = Organization::where('type', 'bem')
            ->where('faculty_id', $user->faculty_id)
            ->get();

        $himas = Organization::where('type', 'hima')
            ->where('faculty_id', $user->faculty_id)
            ->get();
    }

    return view('admin.news.create', compact(
        'bemUniversitas',
        'bemFakultas',
        'himas'
    ));
}

    /**
     * =========================
     * STORE
     * =========================
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'organization_id' => 'required|exists:organizations,id',
            'title'           => 'required|string|max:255',
            'excerpt'         => 'nullable|string|max:500',
            'content'         => 'nullable|string',
            'external_link'   => 'nullable|url|max:2048',

            // 🔒 VALIDASI FILE KETAT
            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png',
                'max:2048', // 2MB
            ],

            'status'          => 'required|in:draft,published',
        ]);

        // 🔐 Keamanan admin fakultas
        if (!$user->isSuperAdmin()) {
            $org = Organization::findOrFail($validated['organization_id']);
            abort_if($org->faculty_id !== $user->faculty_id, 403);
        }

        $validated['author_id'] = $user->id;
        $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();

        if ($validated['status'] === 'published') {
            $validated['publish_date'] = now();
        }

        // 🖼️ Upload image aman
        if ($request->hasFile('image')) {
            $validated['image'] = $request
                ->file('image')
                ->store('news', 'public');
        }

        News::create($validated);

        return redirect()
            ->route('admin.news.index')
            ->with('success', 'Berita berhasil ditambahkan.');
    }

    /**
     * =========================
     * FORM EDIT
     * =========================
     */
    public function edit(Request $request, News $news)
    {
        $this->authorize('update', $news);

        $user = $request->user();

        $faculties = $user->isSuperAdmin()
            ? Faculty::orderBy('name')->get()
            : Faculty::where('id', $user->faculty_id)->get();

        $organizations = $user->isSuperAdmin()
            ? Organization::with('faculty')->orderBy('name')->get()
            : Organization::where('faculty_id', $user->faculty_id)
                ->with('faculty')
                ->orderBy('name')
                ->get();

        return view('admin.news.edit', compact(
            'news',
            'faculties',
            'organizations'
        ));
    }

    /**
     * =========================
     * UPDATE
     * =========================
     */
    public function update(Request $request, News $news)
    {
        $this->authorize('update', $news);

        $validated = $request->validate([
            'organization_id' => 'required|exists:organizations,id',
            'title'           => 'required|string|max:255',
            'excerpt'         => 'nullable|string|max:500',
            'content'         => 'nullable|string',
            'external_link'   => 'nullable|url|max:2048',

            // 🔒 VALIDASI FILE KETAT
            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png',
                'max:2048',
            ],

            'status'          => 'required|in:draft,published',
        ]);

        if ($news->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();
        }

        if ($validated['status'] === 'published' && $news->status !== 'published') {
            $validated['publish_date'] = now();
        }

        // 🖼️ Ganti image (hapus lama)
        if ($request->hasFile('image')) {
            if ($news->image) {
                Storage::disk('public')->delete($news->image);
            }

            $validated['image'] = $request
                ->file('image')
                ->store('news', 'public');
        }

        $news->update($validated);

        return redirect()
            ->route('admin.news.index')
            ->with('success', 'Berita berhasil diperbarui.');
    }

    /**
     * =========================
     * DELETE
     * =========================
     */
    public function destroy(News $news)
    {
        $this->authorize('delete', $news);

        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }

        $news->delete();

        return redirect()
            ->route('admin.news.index')
            ->with('success', 'Berita berhasil dihapus.');
    }
}
