@extends('admin.layouts.app')

@section('title', 'Tambah Fakultas')

@section('content')

<div class="space-y-6">

    <!-- PAGE TITLE -->
    <div>
        <h1 class="text-2xl font-bold text-white">Tambah Fakultas</h1>
        <p class="text-sm text-slate-400">Tambah fakultas baru</p>
    </div>

    <!-- FORM CONTAINER (SAMA PERSIS KAYAK PENGATURAN) -->
    <div class="bg-slate-900/60 backdrop-blur
                border border-slate-800
                rounded-2xl p-6 max-w-3xl">

        <form action="{{ route('admin.faculties.store') }}"
              method="POST"
              enctype="multipart/form-data"
              class="space-y-6">
            @csrf

            <!-- NAMA FAKULTAS -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Nama Fakultas <span class="text-red-400">*</span>
                </label>
                <input type="text"
                       name="name"
                       required
                       class="w-full rounded-xl bg-slate-800
                              border border-slate-700
                              text-slate-100
                              px-4 py-2.5
                              focus:ring-2 focus:ring-emerald-500
                              focus:outline-none"
                       placeholder="Contoh: Fakultas Teknik">
            </div>

            <!-- DESKRIPSI -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Deskripsi
                </label>
                <textarea name="description"
                          rows="4"
                          class="w-full rounded-xl bg-slate-800
                                 border border-slate-700
                                 text-slate-100
                                 px-4 py-2.5
                                 focus:ring-2 focus:ring-emerald-500
                                 focus:outline-none"
                          placeholder="Deskripsi singkat tentang fakultas"></textarea>
            </div>

            <!-- LOGO -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Logo
                </label>
                <input type="file"
                       name="logo"
                       class="w-full rounded-xl bg-slate-800
                              border border-slate-700
                              text-slate-300
                              px-4 py-2.5">
                <p class="text-xs text-slate-500 mt-1">
                    Format JPG, PNG, GIF — maksimal 2MB
                </p>
            </div>

            <!-- ACTION -->
            <div class="flex items-center gap-3 pt-4">
                <button type="submit"
                        class="inline-flex items-center gap-2
                               bg-emerald-600 hover:bg-emerald-700
                               text-white text-sm font-medium
                               px-5 py-2.5 rounded-xl transition">
                    💾 Simpan
                </button>

                <a href="{{ route('admin.faculties.index') }}"
                   class="px-5 py-2.5 rounded-xl
                          text-sm text-slate-400
                          hover:bg-slate-800 transition">
                    Batal
                </a>
            </div>

        </form>
    </div>

</div>

@endsection
