<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\Organization;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProgramController extends Controller
{
    use AuthorizesRequests;

    /**
     * =========================
     * LIST PROGRAM
     * =========================
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Program::with('organization.faculty');

        // Admin fakultas → hanya program fakultasnya + BEM Univ
        if (!$user->isSuperAdmin()) {
            $query->whereHas('organization', function ($q) use ($user) {
                $q->whereNull('faculty_id')
                  ->orWhere('faculty_id', $user->faculty_id);
            });
        }

        $programs = $query->latest()->paginate(10);

        return view('admin.programs.index', compact('programs'));
    }

    /**
     * =========================
     * CREATE FORM
     * =========================
     */
    public function create(Request $request)
{
    $user = $request->user();

    // 🔥 GROUPING ORGANISASI
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

    return view('admin.programs.create', compact(
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
            'title'           => 'required|string|max:255',
            'description'     => 'nullable|string',
            'link'            => 'nullable|url',
            'organization_id' => 'required|exists:organizations,id',
            'image'           => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'status'          => 'required|in:draft,active,completed',
            'start_date'      => 'nullable|date',
            'end_date'        => 'nullable|date|after_or_equal:start_date',
        ]);

        // 🔒 KEAMANAN ORGANISASI
        if (!$user->isSuperAdmin()) {
            $org = Organization::findOrFail($validated['organization_id']);

            // Admin fakultas hanya boleh:
            // - BEM Univ (faculty_id null)
            // - Fakultas sendiri
            if (
                !is_null($org->faculty_id) &&
                $org->faculty_id !== $user->faculty_id
            ) {
                abort(403, 'Anda tidak memiliki akses ke organisasi ini.');
            }
        }

        // 🖼️ UPLOAD IMAGE
        if ($request->hasFile('image')) {
            $validated['image'] = $request
                ->file('image')
                ->store('programs', 'public');
        }

        Program::create($validated);

        return redirect()
            ->route('admin.programs.index')
            ->with('success', 'Program berhasil ditambahkan.');
    }

    /**
     * =========================
     * EDIT FORM
     * =========================
     */
    public function edit(Request $request, Program $program)
    {
        $this->authorize('update', $program);

        $user = $request->user();

        if ($user->isSuperAdmin()) {
            $organizations = Organization::with('faculty')
                ->orderBy('name')
                ->get();
        } else {
            $organizations = Organization::with('faculty')
                ->whereNull('faculty_id')
                ->orWhere('faculty_id', $user->faculty_id)
                ->orderBy('name')
                ->get();
        }

        $faculties = Faculty::orderBy('name')->get();

        return view('admin.programs.edit', compact(
            'program',
            'organizations',
            'faculties'
        ));
    }

    /**
     * =========================
     * UPDATE
     * =========================
     */
    public function update(Request $request, Program $program)
    {
        $this->authorize('update', $program);

        $user = $request->user();

        $validated = $request->validate([
            'title'           => 'required|string|max:255',
            'description'     => 'nullable|string',
            'link'            => 'nullable|url',
            'organization_id' => 'required|exists:organizations,id',
            'image'           => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'status'          => 'required|in:draft,active,completed',
            'start_date'      => 'nullable|date',
            'end_date'        => 'nullable|date|after_or_equal:start_date',
        ]);

        if (!$user->isSuperAdmin()) {
            $org = Organization::findOrFail($validated['organization_id']);

            if (
                !is_null($org->faculty_id) &&
                $org->faculty_id !== $user->faculty_id
            ) {
                abort(403);
            }
        }

        if ($request->hasFile('image')) {
            if ($program->image) {
                Storage::disk('public')->delete($program->image);
            }

            $validated['image'] = $request
                ->file('image')
                ->store('programs', 'public');
        }

        $program->update($validated);

        return redirect()
            ->route('admin.programs.index')
            ->with('success', 'Program berhasil diperbarui.');
    }

    /**
     * =========================
     * DELETE
     * =========================
     */
    public function destroy(Program $program)
    {
        $this->authorize('delete', $program);

        if ($program->image) {
            Storage::disk('public')->delete($program->image);
        }

        $program->delete();

        return redirect()
            ->route('admin.programs.index')
            ->with('success', 'Program berhasil dihapus.');
    }
}
