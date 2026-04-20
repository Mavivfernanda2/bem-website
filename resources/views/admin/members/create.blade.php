@extends('admin.layouts.app')

@section('title', 'Tambah Anggota')
@section('page-title', 'Tambah Anggota')
@section('page-description', 'Tambahkan anggota struktur organisasi')

@section('content')
<div class="w-full max-w-4xl">

    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <form action="{{ route('admin.members.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            {{-- NAMA --}}
            <div class="mb-5">
                <label class="block mb-2 text-sm text-slate-300">
                    Nama <span class="text-red-400">*</span>
                </label>
                <input type="text" name="name"
                    class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none">
            </div>

            {{-- LEVEL --}}
            <div class="mb-5">
                <label class="block mb-2 text-sm text-slate-300">
                    Level <span class="text-red-400">*</span>
                </label>
                <select name="level"
                    class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white">
                    <option value="">Pilih Level</option>
                    <option value="university">BEM Universitas</option>
                    <option value="faculty">BEM Fakultas</option>
                    <option value="hima">HIMA</option>
                </select>
            </div>

            {{-- FAKULTAS --}}
            <div class="mb-5">
                <label class="block mb-2 text-sm text-slate-300">Fakultas</label>
                <select name="faculty_id"
                    class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white">
                    <option value="">Pilih Fakultas</option>
                    @foreach($faculties as $f)
                        <option value="{{ $f->id }}">{{ $f->name }}</option>
                    @endforeach
                </select>
            </div>

            {{-- ORGANISASI --}}
            <div class="mb-5">
                <label class="block mb-2 text-sm text-slate-300">Organisasi</label>
                <select name="organization_id"
                    class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white">
                    <option value="">Pilih Organisasi</option>
                    @foreach($organizations as $o)
                        <option value="{{ $o->id }}">{{ $o->name }}</option>
                    @endforeach
                </select>
            </div>

            {{-- JABATAN --}}
            <div class="mb-5">
                <label class="block mb-2 text-sm text-slate-300">
                    Jabatan <span class="text-red-400">*</span>
                </label>
                <select name="position"
                    class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white">
                    <option value="">Pilih Jabatan</option>
                    <option>Ketua</option>
                    <option>Wakil Ketua</option>
                    <option>Sekretaris</option>
                    <option>Bendahara</option>
                    <option>Media</option>
                    <option>Anggota</option>
                </select>
            </div>

            {{-- FOTO --}}
            <div class="mb-6">
                <label class="block mb-2 text-sm text-slate-300">Foto</label>
                <input type="file" name="photo"
                    class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white">
            </div>

            {{-- BUTTON --}}
            <div class="flex gap-3">
                <button type="submit"
                    class="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-xl text-white font-medium">
                    Simpan
                </button>

                <a href="{{ route('admin.members.index') }}"
                    class="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-xl text-white">
                    Batal
                </a>
            </div>

        </form>

    </div>
</div>
@endsection