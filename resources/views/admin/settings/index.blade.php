@extends('admin.layouts.app')

@section('title', 'Pengaturan')
@section('page-title', 'Pengaturan')
@section('page-description', 'Pengaturan global sistem')

@section('content')
<div class="max-w-full">

<form method="POST"
      action="{{ route('admin.settings.update') }}"
      class="w-full rounded-2xl
             bg-slate-900/60 border border-slate-800
             p-8 space-y-8">
    @csrf
    @method('PUT')

    <!-- INFORMASI UMUM -->
    <div>
        <h2 class="text-lg font-semibold text-slate-100 mb-4">
            Informasi Umum
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
                <label class="text-sm text-slate-400">Nama Website</label>
                <input name="site_name"
                       value="{{ old('site_name', $site_name) }}"
                       class="input-dark">
            </div>

            <div>
                <label class="text-sm text-slate-400">Email</label>
                <input name="site_email"
                       value="{{ old('site_email', $site_email) }}"
                       class="input-dark">
            </div>
        </div>
    </div>

    <!-- DESKRIPSI -->
    <div>
        <label class="text-sm text-slate-400">Deskripsi Website</label>
        <textarea name="site_description"
                  rows="4"
                  class="input-dark">{{ old('site_description', $site_description) }}</textarea>
    </div>

    <!-- KONTAK -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label class="text-sm text-slate-400">Telepon</label>
            <input name="site_phone"
                   value="{{ old('site_phone', $site_phone) }}"
                   class="input-dark">
        </div>

        <div>
            <label class="text-sm text-slate-400">Alamat</label>
            <input name="site_address"
                   value="{{ old('site_address', $site_address) }}"
                   class="input-dark">
        </div>
    </div>

    <!-- ACTION -->
    <div class="flex justify-end pt-6 border-t border-slate-800">
        <button class="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">
            💾 Simpan
        </button>
    </div>

</form>
</div>
@endsection
