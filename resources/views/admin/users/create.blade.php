@extends('admin.layouts.app')

@section('title', 'Tambah Pengguna')

@section('content')
<div class="space-y-8 max-w-5xl">

    <!-- JUDUL HALAMAN -->
    <div>
        <h1 class="text-2xl font-bold text-white">Tambah Pengguna</h1>
        <p class="text-sm text-slate-400">Tambah pengguna admin baru</p>
    </div>

    <!-- FORM CARD -->
    <div class="bg-slate-900/60 backdrop-blur
                border border-slate-800
                rounded-2xl p-8">

        <form action="{{ route('admin.users.store') }}" method="POST">
            @csrf

            <div class="space-y-6">

                <!-- NAMA -->
                <div>
                    <label class="block mb-2 font-medium text-slate-200">
                        Nama <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="name" value="{{ old('name') }}"
                           class="w-full h-11 px-4 rounded-lg
                                  bg-slate-800 border border-slate-700
                                  text-white focus:ring-2 focus:ring-emerald-500">
                </div>

                <!-- EMAIL -->
                <div>
                    <label class="block mb-2 font-medium text-slate-200">
                        Email <span class="text-red-500">*</span>
                    </label>
                    <input type="email" name="email" value="{{ old('email') }}"
                           class="w-full h-11 px-4 rounded-lg
                                  bg-slate-800 border border-slate-700
                                  text-white focus:ring-2 focus:ring-emerald-500">
                </div>

                <!-- GRID ROLE & FAKULTAS -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <!-- ROLE -->
                    <div>
                        <label class="block mb-2 font-medium text-slate-200">
                            Role <span class="text-red-500">*</span>
                        </label>
                        <select name="role" id="role"
                                class="w-full h-11 px-4 rounded-lg
                                       bg-slate-800 border border-slate-700
                                       text-white focus:ring-2 focus:ring-emerald-500">
                            <option value="">Pilih Role</option>
                            <option value="super_admin" @selected(old('role') === 'super_admin')>
                                Super Admin
                            </option>
                            <option value="faculty_admin" @selected(old('role') === 'faculty_admin')>
                                Admin Fakultas
                            </option>
                        </select>
                    </div>

                    <!-- FAKULTAS -->
                    <div id="faculty-wrapper">
                        <label class="block mb-2 font-medium text-slate-200">
                            Fakultas
                        </label>
                        <select name="faculty_id"
                                class="w-full h-11 px-4 rounded-lg
                                       bg-slate-800 border border-slate-700
                                       text-white focus:ring-2 focus:ring-emerald-500">
                            <option value="">Pilih Fakultas</option>
                            @foreach ($faculties as $faculty)
                                <option value="{{ $faculty->id }}"
                                    @selected(old('faculty_id') == $faculty->id)>
                                    {{ $faculty->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <!-- PASSWORD -->
                <div>
                    <label class="block mb-2 font-medium text-slate-200">
                        Password <span class="text-red-500">*</span>
                    </label>
                    <input type="password" name="password"
                           class="w-full h-11 px-4 rounded-lg
                                  bg-slate-800 border border-slate-700
                                  text-white focus:ring-2 focus:ring-emerald-500">
                </div>

                <!-- KONFIRMASI -->
                <div>
                    <label class="block mb-2 font-medium text-slate-200">
                        Konfirmasi Password <span class="text-red-500">*</span>
                    </label>
                    <input type="password" name="password_confirmation"
                           class="w-full h-11 px-4 rounded-lg
                                  bg-slate-800 border border-slate-700
                                  text-white focus:ring-2 focus:ring-emerald-500">
                </div>

                <!-- ACTION -->
                <div class="flex gap-4 pt-6">
                    <button type="submit"
                            class="px-6 py-2 rounded-lg
                                   bg-emerald-600 text-white
                                   hover:bg-emerald-700 transition">
                        Simpan
                    </button>

                    <a href="{{ route('admin.users.index') }}"
                       class="px-6 py-2 rounded-lg
                              bg-slate-700 text-white
                              hover:bg-slate-600 transition">
                        Batal
                    </a>
                </div>

            </div>
        </form>
    </div>
</div>
@endsection
