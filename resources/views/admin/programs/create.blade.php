@extends('admin.layouts.app')

@section('title', 'Tambah Program')

@section('content')

<div class="space-y-6">

    <!-- PAGE TITLE -->
    <div>
        <h1 class="text-2xl font-bold text-white">Tambah Program</h1>
        <p class="text-sm text-slate-400">Tambah program kegiatan baru</p>
    </div>

    <!-- FORM CONTAINER -->
    <div class="bg-slate-900/60 backdrop-blur
                border border-slate-800
                rounded-2xl p-6 max-w-4xl">

        <form action="{{ route('admin.programs.store') }}"
              method="POST"
              enctype="multipart/form-data"
              class="space-y-6">
            @csrf

            <!-- JUDUL -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Judul Program <span class="text-red-400">*</span>
                </label>
                <input type="text"
                       name="title"
                       required
                       value="{{ old('title') }}"
                       class="w-full rounded-xl bg-slate-800 border border-slate-700
                              text-slate-100 px-4 py-2.5
                              focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                       placeholder="Contoh: PESONA 3.0">
            </div>

            <!-- ORGANISASI -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Organisasi / BEM / HIMA <span class="text-red-400">*</span>
                </label>
                <select name="organization_id"
                        required
                        class="w-full rounded-xl bg-slate-800 border border-slate-700
                               text-slate-100 px-4 py-2.5
                               focus:ring-2 focus:ring-emerald-500">
                    <option value="">— Pilih Organisasi —</option>

<optgroup label="BEM Universitas">
    @foreach($bemUniversitas as $org)
        <option value="{{ $org->id }}">
            {{ $org->name }}
        </option>
    @endforeach
</optgroup>

<optgroup label="BEM Fakultas">
    @foreach($bemFakultas as $org)
        <option value="{{ $org->id }}">
            {{ $org->name }}
        </option>
    @endforeach
</optgroup>

<optgroup label="HIMA">
    @foreach($himas as $org)
        <option value="{{ $org->id }}">
            {{ $org->name }}
        </option>
    @endforeach
</optgroup>
                </select>
            </div>

            <!-- DESKRIPSI -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Deskripsi
                </label>
                <textarea name="description"
                          rows="4"
                          class="w-full rounded-xl bg-slate-800 border border-slate-700
                                 text-slate-100 px-4 py-2.5
                                 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          placeholder="Deskripsi singkat program">{{ old('description') }}</textarea>
            </div>

            <!-- LINK -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Link Program (opsional)
                </label>
                <input type="url"
                       name="link"
                       value="{{ old('link') }}"
                       class="w-full rounded-xl bg-slate-800 border border-slate-700
                              text-slate-100 px-4 py-2.5
                              focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                       placeholder="https://contoh.com">
            </div>

            <!-- STATUS -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Status Program <span class="text-red-400">*</span>
                </label>
                <select name="status"
                        required
                        class="w-full rounded-xl bg-slate-800 border border-slate-700
                               text-slate-100 px-4 py-2.5
                               focus:ring-2 focus:ring-emerald-500">
                    <option value="">— Pilih Status —</option>
                    <option value="draft" @selected(old('status') === 'draft')>Draft</option>
                    <option value="active" @selected(old('status') === 'active')>Aktif</option>
                    <option value="completed" @selected(old('status') === 'completed')>Selesai</option>
                </select>
            </div>

            <!-- TANGGAL -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-slate-300 mb-1">
                        Tanggal Mulai
                    </label>
                    <input type="date"
                           name="start_date"
                           value="{{ old('start_date') }}"
                           class="w-full rounded-xl bg-slate-800 border border-slate-700
                                  text-slate-100 px-4 py-2.5
                                  focus:ring-2 focus:ring-emerald-500">
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-300 mb-1">
                        Tanggal Selesai
                    </label>
                    <input type="date"
                           name="end_date"
                           value="{{ old('end_date') }}"
                           class="w-full rounded-xl bg-slate-800 border border-slate-700
                                  text-slate-100 px-4 py-2.5
                                  focus:ring-2 focus:ring-emerald-500">
                </div>
            </div>

            <!-- GAMBAR PROGRAM (DIKUNCI) -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Gambar Program
                    <span class="text-xs text-slate-500">
                        (PNG, JPG, JPEG • Max 2MB)
                    </span>
                </label>

                <input
                    type="file"
                    name="image"
                    accept="image/png,image/jpeg"
                    class="w-full text-slate-300
                           file:bg-slate-700 file:border-0
                           file:rounded-lg file:px-4 file:py-2
                           file:text-sm file:text-white
                           hover:file:bg-slate-600
                           focus:ring-2 focus:ring-emerald-500"
                >

                @error('image')
                    <p class="text-sm text-red-400 mt-1">
                        {{ $message }}
                    </p>
                @enderror
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

                <a href="{{ route('admin.programs.index') }}"
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
