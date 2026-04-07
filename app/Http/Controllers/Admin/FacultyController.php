<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class FacultyController extends Controller
{
    /**
     * Display a listing of faculties
     */
    public function index()
    {
        $faculties = Faculty::latest()->paginate(10);
        return view('admin.faculties.index', compact('faculties'));
    }

    /**
     * Display the specified faculty (by slug)
     */
    public function show(Faculty $faculty)
    {
        return view('admin.faculties.show', compact('faculty'));
    }

    /**
     * Show the form for creating a new faculty
     */
    public function create()
    {
        return view('admin.faculties.create');
    }

    /**
     * Store a newly created faculty
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:150|unique:faculties,name',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Generate slug unik
        $slug = Str::slug($request->name);
        $originalSlug = $slug;
        $counter = 1;

        while (Faculty::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter++;
        }

        // Upload logo jika ada
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('faculties', 'public');
        }

        Faculty::create([
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description,
            'logo' => $logoPath,
        ]);

        return redirect()
            ->route('admin.faculties.index')
            ->with('success', 'Fakultas berhasil ditambahkan');
    }

    /**
     * Show the form for editing the specified faculty
     */
    public function edit(Faculty $faculty)
    {
        return view('admin.faculties.edit', compact('faculty'));
    }

    /**
     * Update the specified faculty
     */
    public function update(Request $request, Faculty $faculty)
    {
        $request->validate([
            'name' => 'required|string|max:150|unique:faculties,name,' . $faculty->id,
            'description' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Update slug jika nama berubah
        if ($faculty->name !== $request->name) {
            $slug = Str::slug($request->name);
            $originalSlug = $slug;
            $counter = 1;

            while (
                Faculty::where('slug', $slug)
                    ->where('id', '!=', $faculty->id)
                    ->exists()
            ) {
                $slug = $originalSlug . '-' . $counter++;
            }

            $faculty->slug = $slug;
        }

        // Update logo jika ada
        if ($request->hasFile('logo')) {
            if ($faculty->logo) {
                Storage::disk('public')->delete($faculty->logo);
            }

            $faculty->logo = $request->file('logo')->store('faculties', 'public');
        }

        $faculty->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()
            ->route('admin.faculties.index')
            ->with('success', 'Fakultas berhasil diperbarui');
    }

    /**
     * Remove the specified faculty
     */
    public function destroy(Faculty $faculty)
    {
        if ($faculty->logo) {
            Storage::disk('public')->delete($faculty->logo);
        }

        $faculty->delete();

        return redirect()
            ->route('admin.faculties.index')
            ->with('success', 'Fakultas berhasil dihapus');
    }
}
