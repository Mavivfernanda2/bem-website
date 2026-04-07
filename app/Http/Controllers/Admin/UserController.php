<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index()
    {
       $users = User::with(['faculty', 'role'])
    ->whereNotNull('role_id')
    ->latest()
    ->paginate(10);

        return view('admin.users.index', compact('users'));
    }

    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        $faculties = Faculty::all();

        $roles = [
            'super_admin'   => 'Super Admin',
            'faculty_admin' => 'Admin Fakultas',
        ];

        return view('admin.users.create', compact('faculties', 'roles'));
    }

    /**
     * Store a newly created user.
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'name'       => 'required|string|max:255',
        'email'      => 'required|string|email|max:255|unique:users',
        'password'   => ['required', 'confirmed', Password::defaults()],
        'role'       => 'required|in:super_admin,faculty_admin',
        'faculty_id' => 'nullable|required_if:role,faculty_admin|exists:faculties,id',
    ]);

    // Hash password
    $validated['password'] = Hash::make($validated['password']);

    // 🔥 Mapping role ke role_id
    if ($validated['role'] === 'super_admin') {
        $validated['role_id'] = 1;
        $validated['faculty_id'] = null;
    } else {
        $validated['role_id'] = 2;
    }

    // Hapus field role (tidak ada di DB)
    unset($validated['role']);

    User::create($validated);

    return redirect()
        ->route('admin.users.index')
        ->with('success', 'Pengguna berhasil ditambahkan.');
}

    /**
     * Show the form for editing the user.
     */
    public function edit(User $user)
    {
        $faculties = Faculty::all();

        $roles = [
            'super_admin'   => 'Super Admin',
            'faculty_admin' => 'Admin Fakultas',
        ];

        return view('admin.users.edit', compact('user', 'faculties', 'roles'));
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, User $user)
{
    $validated = $request->validate([
        'name'       => 'required|string|max:255',
        'email'      => 'required|string|email|max:255|unique:users,email,' . $user->id,
        'password'   => ['nullable', 'confirmed', Password::defaults()],
        'role'       => 'required|in:super_admin,faculty_admin',
        'faculty_id' => 'nullable|required_if:role,faculty_admin|exists:faculties,id',
    ]);

    if (!empty($validated['password'])) {
        $validated['password'] = Hash::make($validated['password']);
    } else {
        unset($validated['password']);
    }

    // 🔥 Mapping role ke role_id
    if ($validated['role'] === 'super_admin') {
        $validated['role_id'] = 1;
        $validated['faculty_id'] = null;
    } else {
        $validated['role_id'] = 2;
    }

    unset($validated['role']);

    $user->update($validated);

    return redirect()
        ->route('admin.users.index')
        ->with('success', 'Pengguna berhasil diperbarui.');
}

    /**
     * Remove the specified user.
     */
    public function destroy(Request $request, User $user)
    {
        if ($user->id === $request->user()->id) {
            return redirect()
                ->route('admin.users.index')
                ->with('error', 'Anda tidak dapat menghapus akun sendiri.');
        }

        $user->delete();

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'Pengguna berhasil dihapus.');
    }
}
