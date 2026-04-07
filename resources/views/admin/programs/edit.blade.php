@extends('admin.layouts.app')

@section('title', 'Edit Program')
@section('page-title', 'Edit Program')
@section('page-description', 'Edit data program')

@section('content')
<div class="max-w-4xl">
    <div class="rounded-2xl bg-slate-900/70 border border-slate-800 p-8">

        {{-- ERROR --}}
        @if ($errors->any())
            <div class="mb-6 rounded-xl bg-red-950/40 border border-red-800 p-4 text-sm text-red-300">
                <p class="font-semibold mb-2">Terjadi kesalahan:</p>
                <ul class="list-disc list-inside space-y-1">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('admin.programs.update', $program) }}"
              method="POST"
              enctype="multipart/form-data"
              class="space-y-6">
            @csrf
            @method('PUT')

            {{-- JUDUL --}}
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">
                    Judul Program <span class="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="title"
                    value="{{ old('title', $program->title) }}"
                    required
                    class="h-11 w-full rounded-xl bg-slate-800 border border-slate-700
                           px-4 text-slate-100 placeholder-slate-400
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
            </div>

            {{-- ORGANISASI --}}
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">
                    Organisasi / BEM / HIMA <span class="text-red-500">*</span>
                </label>
                <select
                    name="organization_id"
                    required
                    class="h-11 w-full rounded-xl bg-slate-800 border border-slate-700
                           px-4 text-slate-100
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="">— Pilih Organisasi —</option>
                    @foreach($organizations as $org)
                        <option value="{{ $org->id }}"
                            @selected(old('organization_id', $program->organization_id) == $org->id)>
                            {{ $org->name }} ({{ $org->faculty?->name }})
                        </option>
                    @endforeach
                </select>
            </div>

            {{-- DESKRIPSI --}}
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">Deskripsi</label>
                <textarea
                    name="description"
                    rows="4"
                    class="w-full rounded-xl bg-slate-800 border border-slate-700
                           px-4 py-3 text-slate-100 placeholder-slate-400
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >{{ old('description', $program->description) }}</textarea>
            </div>

            {{-- LINK --}}
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">
                    Link Program <span class="text-slate-400">(opsional)</span>
                </label>
                <input
                    type="url"
                    name="link"
                    value="{{ old('link', $program->link) }}"
                    placeholder="https://contoh.com"
                    class="h-11 w-full rounded-xl bg-slate-800 border border-slate-700
                           px-4 text-slate-100 placeholder-slate-400
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
            </div>

            {{-- TANGGAL --}}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-300">Tanggal Mulai</label>
                    <input
                        type="date"
                        name="start_date"
                        value="{{ old('start_date', $program->start_date?->format('Y-m-d')) }}"
                        class="h-11 w-full rounded-xl bg-slate-800 border border-slate-700
                               px-4 text-slate-100
                               focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                </div>
                <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-300">Tanggal Selesai</label>
                    <input
                        type="date"
                        name="end_date"
                        value="{{ old('end_date', $program->end_date?->format('Y-m-d')) }}"
                        class="h-11 w-full rounded-xl bg-slate-800 border border-slate-700
                               px-4 text-slate-100
                               focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                </div>
            </div>

            {{-- STATUS --}}
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">
                    Status <span class="text-red-500">*</span>
                </label>
                <select
                    name="status"
                    required
                    class="h-11 w-full rounded-xl bg-slate-800 border border-slate-700
                           px-4 text-slate-100
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="draft" @selected($program->status === 'draft')>Draft</option>
                    <option value="active" @selected($program->status === 'active')>Aktif</option>
                    <option value="completed" @selected($program->status === 'completed')>Selesai</option>
                </select>
            </div>

            {{-- GAMBAR SAAT INI --}}
            @if ($program->image)
                <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-300">Gambar Saat Ini</label>
                    <img
                        src="{{ Storage::url($program->image) }}"
                        class="w-40 h-28 rounded-xl object-cover border border-slate-700">
                </div>
            @endif

            {{-- GANTI GAMBAR --}}
            <div class="space-y-3">
                <label class="text-sm font-medium text-slate-300">
                    Ganti Gambar <span class="text-xs text-slate-400">(PNG / JPG, max 2MB)</span>
                </label>

                <label
                    class="inline-flex items-center gap-3 cursor-pointer
                           rounded-xl bg-slate-800 border border-slate-700
                           px-4 py-2 hover:bg-slate-700 transition">
                    <input type="file" name="image" accept="image/png,image/jpeg" class="hidden">
                    <span class="text-sm text-slate-200">Pilih File</span>
                </label>

                @error('image')
                    <p class="text-sm text-red-400">{{ $message }}</p>
                @enderror
            </div>

            {{-- ACTION --}}
            <div class="flex gap-3 pt-6">
                <button
                    type="submit"
                    class="h-11 px-6 rounded-xl bg-emerald-600 text-white
                           hover:bg-emerald-700 transition">
                    Simpan Perubahan
                </button>

                <a
                    href="{{ route('admin.programs.index') }}"
                    class="h-11 px-6 rounded-xl bg-slate-700 text-slate-200
                           hover:bg-slate-600 transition flex items-center">
                    Batal
                </a>
            </div>

        </form>
    </div>
</div>
@endsection