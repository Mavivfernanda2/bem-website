@extends('admin.layouts.app')

@section('title', 'Struktur Anggota')
@section('page-title', 'Struktur Anggota')
@section('page-description', 'Kelola struktur organisasi')

@section('content')
<div class="w-full space-y-6">

    {{-- HEADER ACTION --}}
    <div class="flex justify-end">
        <a href="{{ route('admin.members.create') }}"
           class="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition">
            + Tambah Anggota
        </a>
    </div>

    {{-- CARD --}}
    <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        {{-- TABLE --}}
        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-slate-300">

                {{-- HEAD --}}
                <thead class="bg-slate-900 border-b border-slate-800 text-xs uppercase text-slate-400">
                    <tr>
                        <th class="px-6 py-4">Foto</th>
                        <th class="px-6">Nama</th>
                        <th class="px-6">Level</th>
                        <th class="px-6">Jabatan</th>
                        <th class="px-6 text-right">Aksi</th>
                    </tr>
                </thead>

                {{-- BODY --}}
                <tbody>
                    @forelse($members as $member)
                    <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition">

                        {{-- FOTO --}}
                        <td class="px-6 py-4">
                            @if($member->photo)
                                <img src="{{ asset('storage/'.$member->photo) }}"
                                     class="w-10 h-10 rounded-full object-cover border border-slate-700">
                            @else
                                <div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">
                                    {{ strtoupper(substr($member->name, 0, 1)) }}
                                </div>
                            @endif
                        </td>

                        {{-- NAMA --}}
                        <td class="px-6 font-medium text-white">
                            {{ $member->name }}
                        </td>

                        {{-- LEVEL --}}
                        <td class="px-6">
                            <span class="px-3 py-1 text-xs rounded-full
                                @if($member->level == 'university') bg-purple-500/20 text-purple-400
                                @elseif($member->level == 'faculty') bg-blue-500/20 text-blue-400
                                @else bg-emerald-500/20 text-emerald-400
                                @endif">
                                {{ ucfirst($member->level) }}
                            </span>
                        </td>

                        {{-- JABATAN --}}
                        <td class="px-6">
                            {{ $member->position }}
                        </td>

                        {{-- AKSI --}}
                        <td class="px-6 text-right">
                            <div class="flex justify-end gap-4">

                                {{-- EDIT --}}
                                <a href="{{ route('admin.members.edit', $member->id) }}"
                                   class="text-blue-400 hover:text-blue-300 text-sm">
                                    Edit
                                </a>

                                {{-- DELETE --}}
                                <form action="{{ route('admin.members.destroy', $member->id) }}"
                                      method="POST"
                                      onsubmit="return confirm('Yakin hapus anggota ini?')">
                                    @csrf
                                    @method('DELETE')

                                    <button class="text-red-400 hover:text-red-300 text-sm">
                                        Hapus
                                    </button>
                                </form>

                            </div>
                        </td>

                    </tr>
                    @empty
                    <tr>
                        <td colspan="5" class="text-center py-10 text-slate-500">
                            Belum ada data anggota
                        </td>
                    </tr>
                    @endforelse
                </tbody>

            </table>
        </div>

    </div>

</div>
@endsection