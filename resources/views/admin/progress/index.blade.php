@extends('layouts.admin')

@section('content')
<div class="max-w-6xl mx-auto">

    {{-- HEADER --}}
    <div class="mb-6">
        <h1 class="text-2xl font-bold text-white">Struktur Anggota</h1>
        <p class="text-slate-400 text-sm">Kelola struktur organisasi BEM</p>
    </div>

    {{-- CARD --}}
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        {{-- ACTION --}}
        <div class="flex justify-end mb-6">
            <a href="{{ route('admin.members.create') }}"
               class="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-md shadow-emerald-500/20 transition">
                + Tambah Anggota
            </a>
        </div>

        {{-- TABLE --}}
        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-slate-300">

                <thead class="text-xs uppercase text-slate-400 border-b border-slate-800">
                    <tr>
                        <th class="py-3 px-3">Foto</th>
                        <th class="px-3">Nama</th>
                        <th class="px-3">Level</th>
                        <th class="px-3">Jabatan</th>
                        <th class="px-3 text-right">Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    @forelse($members as $member)
                    <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition">

                        {{-- FOTO --}}
                        <td class="py-3 px-3">
                            @if($member->photo)
                                <img src="{{ asset('storage/'.$member->photo) }}"
                                     class="w-10 h-10 rounded-full object-cover border border-slate-700">
                            @else
                                <div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs">
                                    {{ strtoupper(substr($member->name,0,1)) }}
                                </div>
                            @endif
                        </td>

                        {{-- NAMA --}}
                        <td class="px-3 font-medium text-white">
                            {{ $member->name }}
                        </td>

                        {{-- LEVEL --}}
                        <td class="px-3">
                            <span class="px-3 py-1 text-xs rounded-full
                                @if($member->level == 'university') bg-purple-500/20 text-purple-400
                                @elseif($member->level == 'faculty') bg-blue-500/20 text-blue-400
                                @else bg-emerald-500/20 text-emerald-400
                                @endif">
                                {{ ucfirst($member->level) }}
                            </span>
                        </td>

                        {{-- JABATAN --}}
                        <td class="px-3">
                            {{ $member->position }}
                        </td>

                        {{-- AKSI --}}
                        <td class="px-3 text-right">
                            <div class="flex justify-end gap-3">

                                <a href="{{ route('admin.members.edit', $member->id) }}"
                                   class="text-blue-400 hover:text-blue-300 text-sm">
                                    Edit
                                </a>

                                <form action="{{ route('admin.members.destroy', $member->id) }}"
                                      method="POST"
                                      onsubmit="return confirm('Yakin hapus?')">
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