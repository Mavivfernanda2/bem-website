@extends('admin.layouts.app')

@section('title', 'Edit Fakultas')
@section('page-title', 'Edit Fakultas')
@section('page-description', 'Edit data fakultas')

@section('content')
<div class="max-w-3xl">
    <div class="rounded-2xl bg-slate-900/70 border border-slate-800 p-8">

        <form action="{{ route('admin.faculties.update', $faculty) }}" method="POST" enctype="multipart/form-data"
              class="space-y-6">
            @csrf
            @method('PUT')

            <!-- Nama Fakultas -->
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">
                    Nama Fakultas <span class="text-red-500">*</span>
                </label>

                <input
                    type="text"
                    name="name"
                    value="{{ old('name', $faculty->name) }}"
                    required
                    class="h-11 w-full rounded-xl bg-slate-800 border
                        @error('name') border-red-500 @else border-slate-700 @enderror
                        px-4 text-slate-100 placeholder-slate-400
                        focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >

                @error('name')
                    <p class="text-sm text-red-500">{{ $message }}</p>
                @enderror
            </div>

            <!-- Deskripsi -->
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">
                    Deskripsi
                </label>

                <textarea
                    name="description"
                    rows="4"
                    class="w-full rounded-xl bg-slate-800 border
                        @error('description') border-red-500 @else border-slate-700 @enderror
                        px-4 py-3 text-slate-100 placeholder-slate-400
                        focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >{{ old('description', $faculty->description) }}</textarea>
            </div>

            <!-- Logo -->
            <div class="space-y-3">
                <label class="text-sm font-medium text-slate-300">
                    Ganti Logo
                </label>

                <label
                    class="flex items-center gap-4 w-fit cursor-pointer
                           rounded-xl bg-slate-800 border border-slate-700 px-4 py-2
                           hover:bg-slate-700 transition"
                >
                    <input type="file" name="logo" accept="image/*" class="hidden">
                    <span class="text-sm text-slate-200">Pilih File</span>
                    <span class="text-xs text-slate-400">JPG / PNG / GIF</span>
                </label>

                <p class="text-xs text-slate-400">
                    Maksimal 2MB. Kosongkan jika tidak ingin mengganti logo.
                </p>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-3 pt-6">
                <button
                    type="submit"
                    class="h-11 px-6 rounded-xl bg-emerald-600 text-white
                           hover:bg-emerald-700 transition"
                >
                    Simpan Perubahan
                </button>

                <a
                    href="{{ route('admin.faculties.index') }}"
                    class="h-11 px-6 rounded-xl bg-slate-700 text-slate-200
                           hover:bg-slate-600 transition flex items-center"
                >
                    Batal
                </a>
            </div>

        </form>
    </div>
</div>
@endsection