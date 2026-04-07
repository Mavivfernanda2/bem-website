@extends('admin.layouts.app')

@section('title', 'Fakultas')
@section('page-title', 'Fakultas')
@section('page-description', 'Kelola data fakultas')

@section('content')

<div class="w-full space-y-6">

    <!-- HEADER SECTION -->
    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-2xl font-bold text-slate-100">
                Daftar Fakultas
            </h2>
            <p class="text-sm text-slate-300 mt-1">
                Manajemen fakultas universitas
            </p>
        </div>

        {{-- ✅ TOMBOL TAMBAH HANYA SUPER ADMIN --}}
        @if(auth()->user()->isSuperAdmin())
            <a href="{{ route('admin.faculties.create') }}"
               class="inline-flex items-center gap-2
                      bg-emerald-600 hover:bg-emerald-700
                      text-white px-4 py-2 rounded-xl transition">
                ➕ Tambah Fakultas
            </a>
        @endif
    </div>

    <!-- TABLE CARD -->
    <div class="w-full
                bg-slate-800/60
                border border-slate-700
                rounded-2xl
                overflow-hidden">

        <table class="w-full text-sm">
            <thead class="bg-slate-800 border-b border-slate-700">
                <tr>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase">
                        Fakultas
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase">
                        Slug
                    </th>
                    <th class="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase">
                        Aksi
                    </th>
                </tr>
            </thead>

            <tbody class="divide-y divide-slate-700">
                @forelse($faculties as $faculty)
                    <tr class="hover:bg-slate-700/40 transition">
                        <td class="px-6 py-4 font-medium text-slate-100">
                            {{ $faculty->name }}
                        </td>

                        <td class="px-6 py-4 text-slate-400">
                            {{ $faculty->slug }}
                        </td>

                        <td class="px-6 py-4">
                            <div class="flex items-center justify-end gap-2">

                                {{-- 👁 LIHAT (SEMUA ADMIN BOLEH) --}}
                                <a href="{{ route('fakultas.show', $faculty->slug) }}"
                                   target="_blank"
                                   class="px-3 py-2 rounded-lg
                                          bg-blue-600/20 text-blue-400
                                          hover:bg-blue-600/30 transition"
                                   title="Lihat">
                                    👁
                                </a>

                                {{-- 🔒 EDIT & DELETE HANYA SUPER ADMIN --}}
                                @if(auth()->user()->isSuperAdmin())

                                    <a href="{{ route('admin.faculties.edit', $faculty) }}"
                                       class="px-3 py-2 rounded-lg
                                              bg-amber-600/20 text-amber-400
                                              hover:bg-amber-600/30 transition"
                                       title="Edit">
                                        ✏
                                    </a>

                                    <button
                                        onclick="openDeleteModal(
                                            '{{ route('admin.faculties.destroy', $faculty) }}',
                                            'Hapus fakultas ini?'
                                        )"
                                        class="px-3 py-2 rounded-lg
                                               bg-red-600/20 text-red-400
                                               hover:bg-red-600/30 transition"
                                        title="Hapus">
                                        🗑
                                    </button>

                                @endif
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3"
                            class="px-6 py-12 text-center text-slate-400">
                            Belum ada data fakultas
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

</div>

@endsection
