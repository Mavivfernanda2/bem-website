@extends('admin.layouts.app')

@section('title', 'Edit Berita')

@section('content')

<div class="space-y-6">

    <!-- PAGE TITLE -->
    <div>
        <h1 class="text-2xl font-bold text-white">Edit Berita</h1>
        <p class="text-sm text-slate-400">Edit data berita</p>
    </div>

    <!-- FORM WRAPPER -->
    <div class="bg-slate-900/60 backdrop-blur
                border border-slate-800
                rounded-2xl p-6 max-w-4xl">

        <form action="{{ route('admin.news.update', $news->id) }}"
              method="POST"
              enctype="multipart/form-data"
              class="space-y-6">
            @csrf
            @method('PUT')

            <!-- ORGANISASI -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Organisasi / HIMA <span class="text-red-400">*</span>
                </label>
                <select name="organization_id"
                        required
                        class="w-full rounded-xl bg-slate-800
                               border border-slate-700 text-slate-100
                               px-4 py-2.5
                               focus:ring-2 focus:ring-emerald-500">
                    @foreach($organizations as $org)
                        <option value="{{ $org->id }}"
                            @selected($news->organization_id === $org->id)>
                            {{ $org->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <!-- JUDUL -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Judul Berita <span class="text-red-400">*</span>
                </label>
                <input type="text"
                       name="title"
                       value="{{ old('title', $news->title) }}"
                       required
                       class="w-full rounded-xl bg-slate-800
                              border border-slate-700 text-slate-100
                              px-4 py-2.5
                              focus:ring-2 focus:ring-emerald-500
                              focus:outline-none">
            </div>

            <!-- RINGKASAN -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Ringkasan
                </label>
                <textarea name="excerpt"
                          rows="3"
                          maxlength="500"
                          class="w-full rounded-xl bg-slate-800
                                 border border-slate-700 text-slate-100
                                 px-4 py-2.5
                                 focus:ring-2 focus:ring-emerald-500
                                 focus:outline-none">{{ old('excerpt', $news->excerpt) }}</textarea>
                <p class="text-xs text-slate-500 mt-1">
                    Maksimal 500 karakter
                </p>
            </div>

            <!-- KONTEN -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Konten
                </label>
                <textarea name="content"
                          rows="8"
                          class="w-full rounded-xl bg-slate-800
                                 border border-slate-700 text-slate-100
                                 px-4 py-2.5
                                 focus:ring-2 focus:ring-emerald-500
                                 focus:outline-none">{{ old('content', $news->content) }}</textarea>
            </div>

            <!-- STATUS -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Status Berita <span class="text-red-400">*</span>
                </label>
                <select name="status"
                        required
                        class="w-full rounded-xl bg-slate-800
                               border border-slate-700 text-slate-100
                               px-4 py-2.5
                               focus:ring-2 focus:ring-emerald-500">
                    <option value="draft" @selected($news->status === 'draft')>
                        Draft
                    </option>
                    <option value="published" @selected($news->status === 'published')>
                        Dipublikasikan
                    </option>
                </select>
            </div>

            <!-- GAMBAR SAAT INI -->
            @if ($news->image)
                <div>
                    <label class="block text-sm font-medium text-slate-300 mb-2">
                        Gambar Saat Ini
                    </label>
                    <img src="{{ asset('storage/' . $news->image) }}"
                         alt="Gambar berita"
                         class="w-48 rounded-xl border border-slate-700">
                </div>
            @endif

            <!-- GANTI GAMBAR (DIKUNCI) -->
            <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">
                    Ganti Gambar
                    <span class="text-xs text-slate-500">
                        (PNG, JPG, JPEG • Max 2MB)
                    </span>
                </label>

                <input
                    type="file"
                    name="image"
                    accept="image/png,image/jpeg"
                    class="w-full rounded-xl bg-slate-800
                           border border-slate-700 text-slate-300
                           px-4 py-2.5
                           file:bg-slate-700 file:border-0
                           file:text-slate-200
                           file:px-4 file:py-2 file:rounded-lg
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
                    💾 Simpan Perubahan
                </button>

                <a href="{{ route('admin.news.index') }}"
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
