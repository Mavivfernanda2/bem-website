@extends('admin.layouts.app')

@section('title', 'Program')
@section('page-title', 'Program')
@section('page-description', 'Kelola program kegiatan')

@section('content')
<div class="w-full space-y-6">

    <!-- HEADER ACTION -->
    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-lg font-semibold text-slate-200">
                Daftar Program
            </h2>
            <p class="text-sm text-slate-400">
                Manajemen program kegiatan BEM
            </p>
        </div>

        <a href="{{ route('admin.programs.create') }}"
           class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-emerald-600 hover:bg-emerald-700
                  text-white font-medium transition">
            ➕ Tambah Program
        </a>
    </div>

    <!-- TABLE CARD -->
    <div
        class="rounded-2xl bg-slate-800/60 border border-slate-700
               shadow-lg overflow-hidden">

        <table class="w-full text-sm">
            <thead
                class="bg-slate-800/80 border-b border-slate-700
                       text-slate-300 uppercase tracking-wide text-xs">
                <tr>
                    <th class="px-6 py-4 text-left">Program</th>
                    <th class="px-6 py-4 text-left">Fakultas</th>
                    <th class="px-6 py-4 text-left">Status</th>
                    <th class="px-6 py-4 text-left">Tanggal</th>
                    <th class="px-6 py-4 text-right">Aksi</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-slate-800">
            @forelse($programs as $program)
                <tr class="hover:bg-slate-800/40 transition">

                    <!-- PROGRAM -->
                    <td class="px-6 py-4">
                        <p class="font-semibold text-slate-100">
                            {{ $program->title }}
                        </p>
                        <p class="text-xs text-slate-400 mt-1">
                            {{ $program->description ?: 'Tidak ada keterangan' }}
                        </p>
                    </td>

                    <!-- FAKULTAS -->
                    <td class="px-6 py-4 text-slate-300">
                        {{ $program->organization?->faculty?->name ?? 'Umum' }}
                    </td>

                    <!-- STATUS -->
                    <td class="px-6 py-4">
                        <span
                            class="px-3 py-1 text-xs rounded-full
                            {{ $program->status === 'active' ? 'bg-emerald-500/15 text-emerald-400' : '' }}
                            {{ $program->status === 'draft' ? 'bg-slate-600/20 text-slate-300' : '' }}
                            {{ $program->status === 'completed' ? 'bg-blue-500/15 text-blue-400' : '' }}">
                            {{ ucfirst($program->status) }}
                        </span>
                    </td>

                    <!-- TANGGAL -->
                    <td class="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {{ optional($program->start_date)->format('d M Y') ?? '-' }}
                    </td>

                    <!-- AKSI -->
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-2 justify-end">

                            <a href="{{ route('admin.programs.edit', $program) }}"
                               class="p-2 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25">
                                ✏️
                            </a>

                            <button
                                type="button"
                                onclick="openDeleteModal('{{ route('admin.programs.destroy', $program) }}')"
                                class="p-2 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25">
                                🗑
                            </button>

                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="py-12 text-center text-slate-400">
                        Belum ada program
                    </td>
                </tr>
            @endforelse
            </tbody>

        </table>
    </div>

    <!-- PAGINATION -->
    <div>
        {{ $programs->links() }}
    </div>

</div>

<!-- DELETE MODAL -->
<div
    id="deleteModal"
    class="fixed inset-0 z-50 hidden items-center justify-center bg-black/60">

    <div class="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 text-center">
        <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center
                    rounded-full bg-red-500/10 text-red-400 text-xl">
            ⚠️
        </div>

        <h2 class="text-lg font-semibold text-slate-100 mb-2">
            Hapus program ini?
        </h2>

        <p class="text-sm text-slate-400 mb-6">
            Program yang dihapus tidak bisa dipulihkan.
        </p>

        <form id="deleteForm" method="POST">
            @csrf
            @method('DELETE')

            <div class="flex justify-center gap-3">
                <button
                    type="button"
                    onclick="closeDeleteModal()"
                    class="px-5 py-2.5 rounded-xl bg-slate-700 text-slate-200
                           hover:bg-slate-600 transition">
                    Batal
                </button>

                <button
                    type="submit"
                    class="px-5 py-2.5 rounded-xl bg-red-600 text-white
                           hover:bg-red-700 transition">
                    Hapus
                </button>
            </div>
        </form>
    </div>
</div>
@endsection

@push('scripts')
<script>
    const modal = document.getElementById('deleteModal')
    const deleteForm = document.getElementById('deleteForm')

    function openDeleteModal(action) {
        deleteForm.action = action
        modal.classList.remove('hidden')
        modal.classList.add('flex')
    }

    function closeDeleteModal() {
        modal.classList.add('hidden')
        modal.classList.remove('flex')
        deleteForm.action = ''
    }
</script>
@endpush