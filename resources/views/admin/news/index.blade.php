@extends('admin.layouts.app')

@section('title', 'Berita')
@section('page-title', 'Berita')
@section('page-description', 'Kelola berita dan artikel')

@section('content')
<div class="space-y-6 w-full">

    <!-- ACTION -->
    <div class="flex justify-end">
        <a href="{{ route('admin.news.create') }}"
           class="inline-flex items-center gap-2 px-5 py-2.5
                  bg-emerald-600 hover:bg-emerald-700
                  text-white rounded-xl font-medium transition">
            ➕ Tambah Berita
        </a>
    </div>

    <!-- TABLE CARD -->
    <div class="w-full overflow-x-auto rounded-2xl
                bg-slate-800/60 border border-slate-700">

        <table class="min-w-full text-sm">
            <thead
                class="bg-slate-800/80 border-b border-slate-700
                       text-slate-300 uppercase tracking-wide text-xs">
                <tr>
                    <th class="px-6 py-4 text-left">Berita</th>

                    @if(auth()->user()->isSuperAdmin())
                        <th class="px-6 py-4 text-left">Fakultas</th>
                    @endif

                    <th class="px-6 py-4 text-left">Status</th>
                    <th class="px-6 py-4 text-left">Tanggal</th>
                    <th class="px-6 py-4 text-right">Aksi</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-slate-800">
            @forelse($news as $item)
                <tr class="hover:bg-slate-800/40 transition">

                    <!-- BERITA -->
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-4">
                            <img
                                src="{{ $item->image ? Storage::url($item->image) : 'https://via.placeholder.com/48' }}"
                                class="w-12 h-12 rounded-lg object-cover">

                            <div>
                                <p class="font-semibold text-slate-100">
                                    {{ Str::limit($item->title, 60) }}
                                </p>
                                <p class="text-xs text-slate-400">
                                    {{ $item->author?->name ?? 'Unknown' }}
                                </p>
                            </div>
                        </div>
                    </td>

                    <!-- FAKULTAS -->
                    @if(auth()->user()->isSuperAdmin())
                        <td class="px-6 py-4 text-slate-300">
                            {{ $item->faculty?->name ?? '-' }}
                        </td>
                    @endif

                    <!-- STATUS -->
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 text-xs rounded-full
                            {{ $item->status === 'published'
                                ? 'bg-emerald-500/15 text-emerald-400'
                                : 'bg-slate-600/20 text-slate-300' }}">
                            {{ $item->status === 'published' ? 'Terbit' : 'Draft' }}
                        </span>
                    </td>

                    <!-- TANGGAL -->
                    <td class="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {{ $item->created_at->format('d M Y') }}
                    </td>

                    <!-- AKSI -->
                    <td class="px-6 py-4">
                        <div class="flex justify-end gap-2">

                            <!-- EDIT -->
                            <a href="{{ route('admin.news.edit', $item) }}"
                               class="p-2 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 transition">
                                ✏️
                            </a>

                            <!-- DELETE (CUSTOM MODAL) -->
                            <button
                                type="button"
                                onclick="openDeleteModal('{{ route('admin.news.destroy', $item) }}')"
                                class="p-2 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 transition">
                                🗑
                            </button>

                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="py-12 text-center text-slate-400">
                        Belum ada berita
                    </td>
                </tr>
            @endforelse
            </tbody>
        </table>
    </div>

    <!-- PAGINATION -->
    <div class="pt-4">
        {{ $news->links() }}
    </div>

</div>

<!-- DELETE MODAL (SAMA DENGAN PROGRAM) -->
<div
    id="deleteModal"
    class="fixed inset-0 z-50 hidden items-center justify-center bg-black/60 backdrop-blur-sm">

    <div
        class="w-full max-w-md rounded-2xl
               bg-slate-900 border border-slate-800
               p-6 text-center shadow-xl">

        <div
            class="mx-auto mb-4 flex h-14 w-14 items-center justify-center
                   rounded-full bg-red-500/10 text-red-400 text-xl">
            ⚠️
        </div>

        <h2 class="text-lg font-semibold text-slate-100 mb-2">
            Hapus berita ini?
        </h2>

        <p class="text-sm text-slate-400 mb-6">
            Berita yang dihapus tidak bisa dipulihkan.
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