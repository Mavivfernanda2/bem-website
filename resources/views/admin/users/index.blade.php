@extends('admin.layouts.app')

@section('title', 'Pengguna')
@section('page-title', 'Pengguna')
@section('page-description', 'Kelola akun pengguna admin')

@section('content')
<div class="w-full space-y-6">

    <!-- HEADER SECTION (DISAMAKAN) -->
    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-lg font-semibold text-slate-200">
                Daftar Pengguna
            </h2>
            <p class="text-sm text-slate-400">
                Manajemen akun admin dan super admin
            </p>
        </div>

        <a href="{{ route('admin.users.create') }}"
           class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-emerald-600 hover:bg-emerald-700
                  text-white font-medium transition">
            ➕ Tambah Pengguna
        </a>
    </div>

    <!-- TABLE CARD -->
    <div
        class="rounded-2xl
               bg-slate-800/60
               border border-slate-700
               shadow-lg
               overflow-hidden">

        <table class="w-full text-sm">
            <thead
                class="bg-slate-800/80
                       border-b border-slate-700
                       text-slate-300
                       uppercase tracking-wide text-xs">
                <tr>
                    <th class="px-6 py-4 text-left">Pengguna</th>
                    <th class="px-6 py-4 text-left">Role</th>
                    <th class="px-6 py-4 text-left">Fakultas</th>
                    <th class="px-6 py-4 text-right">Aksi</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-slate-800">
            @forelse($users as $user)
                <tr class="hover:bg-slate-800/40 transition">

                    <!-- USER -->
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-lg
                                       bg-emerald-500/20 text-emerald-400
                                       flex items-center justify-center
                                       font-bold">
                                {{ strtoupper(substr($user->name, 0, 1)) }}
                            </div>
                            <div>
                                <p class="font-semibold text-slate-100">
                                    {{ $user->name }}
                                </p>
                                <p class="text-xs text-slate-400">
                                    {{ $user->email }}
                                </p>
                            </div>
                        </div>
                    </td>

                    <!-- ROLE -->
                    <td class="px-6 py-4">
                        <span
                            class="px-3 py-1 text-xs rounded-full
                            {{ $user->isSuperAdmin()
                                ? 'bg-purple-500/20 text-purple-400'
                                : 'bg-blue-500/20 text-blue-400' }}">
                            {{ $user->isSuperAdmin() ? 'Super Admin' : 'Admin Fakultas' }}
                        </span>
                    </td>

                    <!-- FAKULTAS -->
                    <td class="px-6 py-4 text-slate-300">
                        {{ $user->isSuperAdmin()
                            ? 'Semua Fakultas'
                            : ($user->faculty?->name ?? '-') }}
                    </td>

                    <!-- AKSI -->
                    <td class="px-6 py-4">
                        <div class="flex justify-end gap-2">
                            <a href="{{ route('admin.users.edit', $user) }}"
                               class="p-2 rounded-lg bg-blue-500/15
                                      text-blue-400 hover:bg-blue-500/25">
                                ✏️
                            </a>

                            @if(!$user->isSuperAdmin())
                                <form id="delete-form-{{ $user->id }}"
                                      action="{{ route('admin.users.destroy', $user) }}"
                                      method="POST">
                                    @csrf
                                    @method('DELETE')

                                    <button type="button"
                                        onclick="confirmDelete({{ $user->id }})"
                                        class="p-2 rounded-lg bg-red-500/15
                                               text-red-400 hover:bg-red-500/25">
                                        🗑
                                    </button>
                                </form>
                            @endif
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="4"
                        class="text-center py-12 text-slate-400">
                        Belum ada pengguna
                    </td>
                </tr>
            @endforelse
            </tbody>
        </table>
    </div>

    <!-- PAGINATION -->
    <div>
        {{ $users->links() }}
    </div>

</div>
@endsection