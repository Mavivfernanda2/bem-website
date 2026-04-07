@extends('admin.layouts.app')

@section('title', 'Pengguna')
@section('page-title', 'Pengguna')
@section('page-description', 'Kelola pengguna admin')

@section('content')
<div class="w-full space-y-6">

    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-lg font-semibold text-slate-200">Daftar Pengguna</h2>
            <p class="text-sm text-slate-400">Manajemen akun admin</p>
        </div>

        <a href="{{ route('admin.users.create') }}"
           class="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                  bg-emerald-600 hover:bg-emerald-700 text-white transition">
            ➕ Tambah Pengguna
        </a>
    </div>

    <div class="rounded-2xl bg-slate-800/60 border border-slate-700 shadow-lg overflow-hidden">
        <table class="w-full">
            <thead class="bg-slate-800 border-b border-slate-700 text-slate-300 text-xs uppercase">
                <tr>
                    <th class="px-6 py-4 text-left">Pengguna</th>
                    <th class="px-6 py-4 text-left">Role</th>
                    <th class="px-6 py-4 text-left">Fakultas</th>
                    <th class="px-6 py-4 text-right">Aksi</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-slate-700">
                {{-- isi user --}}
            </tbody>
        </table>
    </div>
</div>
@endsection
