<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Member;
use App\Models\Faculty;
use App\Models\Organization;

class MemberController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Super admin lihat semua, admin fakultas hanya miliknya
        if ($user->isSuperAdmin()) {
            $members = Member::latest()->get();
        } else {
            $members = Member::where('faculty_id', $user->faculty_id)
                ->latest()
                ->get();
        }

        return view('admin.members.index', compact('members'));
    }

    public function create()
    {
        $faculties = Faculty::all();
        $organizations = Organization::all();

        return view('admin.members.create', compact('faculties', 'organizations'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'position' => 'required',
            'level' => 'required',
            'organization_id' => 'nullable|exists:organizations,id',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $user = Auth::user();

        // 🔥 BUILD DATA MANUAL (ANTI ERROR)
        $data = [
            'name' => $request->name,
            'position' => $request->position,
            'level' => $request->level,

            // 🔥 WAJIB (biar masuk ke fakultas login)
            'faculty_id' => $user->faculty_id,

            // 🔥 WAJIB (biar muncul di halaman fakultas)
            'organization_id' => $request->organization_id,

            // 🔥 AUTO URUTAN SESUAI JABATAN
            'order' => $this->generateOrder($request->position),

            // 🔥 STATUS AKTIF
            'is_active' => 1,
        ];

        // Upload foto
        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('members', 'public');
        }

        Member::create($data);

        return redirect()->route('admin.members.index')
            ->with('success', 'Anggota berhasil ditambahkan');
    }

    public function edit(Member $member)
    {
        $this->authorizeAccess($member);

        $faculties = Faculty::all();
        $organizations = Organization::all();

        return view('admin.members.edit', compact('member', 'faculties', 'organizations'));
    }

    public function update(Request $request, Member $member)
    {
        $this->authorizeAccess($member);

        $request->validate([
            'name' => 'required',
            'position' => 'required',
            'level' => 'required',
            'organization_id' => 'nullable|exists:organizations,id',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $data = [
            'name' => $request->name,
            'position' => $request->position,
            'level' => $request->level,

            // 🔥 JANGAN DIUBAH
            'faculty_id' => $member->faculty_id,

            'organization_id' => $request->organization_id,

            // 🔥 UPDATE URUTAN OTOMATIS
            'order' => $this->generateOrder($request->position),

            'is_active' => 1,
        ];

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('members', 'public');
        }

        $member->update($data);

        return redirect()->route('admin.members.index')
            ->with('success', 'Anggota berhasil diupdate');
    }

    public function destroy(Member $member)
    {
        $this->authorizeAccess($member);

        $member->delete();

        return back()->with('success', 'Anggota dihapus');
    }

    /**
     * 🔒 Proteksi akses antar fakultas
     */
    private function authorizeAccess(Member $member)
    {
        $user = Auth::user();

        if (!$user->isSuperAdmin() && $member->faculty_id !== $user->faculty_id) {
            abort(403, 'Akses ditolak');
        }
    }

    /**
     * 🔥 AUTO URUTAN JABATAN (INI KUNCI BIAR RAPI)
     */
    private function generateOrder($position)
    {
        return match ($position) {
            'Ketua' => 1,
            'Wakil Ketua' => 2,
            'Sekretaris' => 3,
            'Bendahara' => 4,
            default => 5,
        };
    }
}