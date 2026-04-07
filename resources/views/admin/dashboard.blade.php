@extends('admin.layouts.app')

@section('title', 'Dashboard')
@section('page-title', 'Dashboard')
@section('page-description', 'Ringkasan aktivitas sistem')

@section('content')
<div class="w-full space-y-10">

    {{-- ===================== STATISTIK ===================== --}}
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {{-- FAKULTAS --}}
        @if(auth()->user()->isSuperAdmin())
        <div class="group relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-6
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div class="absolute top-4 right-4 text-indigo-400/20 transition-transform duration-500
                        group-hover:rotate-12 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                          d="M3 10h18M5 6h14M6 14h12M8 18h8"/>
                </svg>
            </div>

            <p class="text-3xl font-bold text-white stat-number"
               data-target="{{ $stats['faculties'] ?? 0 }}">0</p>
            <p class="text-sm text-slate-400 mt-1">Fakultas</p>
        </div>
        @endif

        {{-- PROGRAM --}}
        <div class="group relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-6
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div class="absolute top-4 right-4 text-emerald-400/20 transition-transform duration-500
                        group-hover:rotate-12 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                          d="M12 14l9-5-9-5-9 5 9 5z"/>
                </svg>
            </div>

            <p class="text-3xl font-bold text-white stat-number"
               data-target="{{ $stats['programs'] ?? 0 }}">0</p>
            <p class="text-sm text-slate-400 mt-1">Program</p>
        </div>

        {{-- BERITA --}}
        <div class="group relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-6
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div class="absolute top-4 right-4 text-yellow-400/20 transition-transform duration-500
                        group-hover:rotate-12 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                          d="M4 4h16v16H4z"/>
                </svg>
            </div>

            <p class="text-3xl font-bold text-white stat-number"
               data-target="{{ $stats['news'] ?? 0 }}">0</p>
            <p class="text-sm text-slate-400 mt-1">Berita</p>
        </div>

        {{-- USERS --}}
        @if(auth()->user()->isSuperAdmin())
        <div class="group relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-6
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div class="absolute top-4 right-4 text-rose-400/20 transition-transform duration-500
                        group-hover:rotate-12 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                          d="M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5z"/>
                </svg>
            </div>

            <p class="text-3xl font-bold text-white stat-number"
               data-target="{{ $stats['users'] ?? 0 }}">0</p>
            <p class="text-sm text-slate-400 mt-1">Pengguna</p>
        </div>
        @endif

    </div>

    {{-- ===================== LIST TERBARU ===================== --}}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {{-- BERITA TERBARU --}}
        <div class="bg-slate-900 rounded-2xl border border-slate-800">
            <div class="flex justify-between px-6 py-4 border-b border-slate-800">
                <div>
                    <h3 class="font-semibold text-white">Berita Terbaru</h3>
                    <p class="text-xs text-slate-400">Update berita terkini</p>
                </div>
                <a href="{{ route('admin.news.index') }}"
                   class="text-sm text-emerald-400 hover:text-emerald-300">Lihat Semua →</a>
            </div>

            <div class="p-6 space-y-4">
                @forelse($recentNews as $news)
                    <div>
                        <p class="font-medium text-slate-100">{{ $news->title }}</p>
                        <p class="text-xs text-slate-400">{{ $news->created_at->diffForHumans() }}</p>
                    </div>
                @empty
                    <p class="text-sm text-slate-400">Belum ada berita</p>
                @endforelse
            </div>
        </div>

        {{-- PROGRAM TERBARU --}}
        <div class="bg-slate-900 rounded-2xl border border-slate-800">
            <div class="flex justify-between px-6 py-4 border-b border-slate-800">
                <div>
                    <h3 class="font-semibold text-white">Program Terbaru</h3>
                    <p class="text-xs text-slate-400">Program yang baru ditambahkan</p>
                </div>
                <a href="{{ route('admin.programs.index') }}"
                   class="text-sm text-emerald-400 hover:text-emerald-300">Lihat Semua →</a>
            </div>

            <div class="p-6 space-y-4">
                @forelse($recentPrograms as $program)
                    <div>
                        <p class="font-medium text-slate-100">{{ $program->title }}</p>
                        <p class="text-xs text-slate-400">{{ $program->created_at->diffForHumans() }}</p>
                    </div>
                @empty
                    <p class="text-sm text-slate-400">Belum ada program</p>
                @endforelse
            </div>
        </div>

    </div>

    {{-- ===================== STATUS LOGIN ===================== --}}
    <div class="bg-slate-900 rounded-2xl border border-slate-800 p-6">
        <h3 class="text-lg font-semibold text-white mb-1">Status Login Admin</h3>
        <p class="text-sm text-slate-400 mb-4">Aktivitas admin terbaru</p>

        <div class="space-y-3">
            @forelse ($admins as $admin)
                <div class="flex justify-between bg-slate-800 rounded-xl px-4 py-3">
                    <div>
                        <p class="text-white font-medium">{{ $admin->name }}</p>
                        <p class="text-xs text-slate-400">{{ $admin->faculty->name ?? 'Universitas' }}</p>
                    </div>

                    <div class="text-right">
                        @if ($admin->isOnline())
                            <span class="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                                <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Online
                            </span>
                        @else
                            <span class="inline-flex items-center gap-2 text-slate-400 text-xs font-semibold">
                                <span class="w-2 h-2 bg-slate-400 rounded-full"></span> Offline
                            </span>
                        @endif
                        <p class="text-[11px] text-slate-400">
                            terakhir aktif {{ $admin->lastActiveLabel() }}
                        </p>
                    </div>
                </div>
            @empty
                <p class="text-sm text-slate-400">Belum ada data admin</p>
            @endforelse
        </div>
    </div>

</div>
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = Number(el.dataset.target)
        let current = 0
        if (target === 0) return

        const step = Math.ceil(target / 50)
        const update = () => {
            current += step
            if (current >= target) {
                el.textContent = target.toLocaleString('id-ID')
            } else {
                el.textContent = current.toLocaleString('id-ID')
                requestAnimationFrame(update)
            }
        }
        update()
    })
})
</script>
@endpush