<aside
    class="fixed inset-y-0 left-0 z-50 w-72
           bg-gradient-to-b from-slate-950 to-slate-900
           border-r border-slate-800
           overflow-hidden">

    <!-- WRAPPER MATI TOTAL -->
    <div class="h-full flex flex-col p-4">

        <!-- LOGO -->
        <div
            class="rounded-2xl p-5 mb-6
                   bg-slate-900/80
                   border border-slate-800
                   shadow-lg shadow-black/40 shrink-0">

            <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3">
                <div
                    class="w-12 h-12 rounded-xl
                           bg-gradient-to-br from-emerald-500 to-emerald-600
                           flex items-center justify-center
                           shadow-md shadow-emerald-500/30 text-white text-lg">
                    🏛
                </div>

                <div>
                    <p class="font-bold text-lg text-white">BEM Admin</p>
                    <p class="text-xs text-slate-400">Panel Kontrol</p>
                </div>
            </a>
        </div>

        <!-- MENU (TIDAK SCROLL) -->
        <nav class="flex-1 space-y-2 overflow-hidden">

            @php
                $itemBase = 'group flex items-center gap-4 p-3 rounded-xl border transition-all';
                $itemInactive = 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80';
                $itemActive = 'bg-emerald-500/10 border-emerald-500/40';
                $iconBase = 'w-9 h-9 rounded-lg flex items-center justify-center';
                $iconInactive = 'bg-slate-800 text-slate-400';
                $iconActive = 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30';
                $label = 'font-medium text-slate-200';
            @endphp

            <a href="{{ route('admin.dashboard') }}"
               class="{{ $itemBase }} {{ request()->routeIs('admin.dashboard') ? $itemActive : $itemInactive }}">
                <div class="{{ $iconBase }} {{ request()->routeIs('admin.dashboard') ? $iconActive : $iconInactive }}">🏠</div>
                <span class="{{ $label }}">Dashboard</span>
            </a>

            <a href="{{ route('admin.faculties.index') }}"
               class="{{ $itemBase }} {{ request()->routeIs('admin.faculties.*') ? $itemActive : $itemInactive }}">
                <div class="{{ $iconBase }} {{ request()->routeIs('admin.faculties.*') ? $iconActive : $iconInactive }}">🏫</div>
                <span class="{{ $label }}">Fakultas</span>
            </a>

            <a href="{{ route('admin.programs.index') }}"
               class="{{ $itemBase }} {{ request()->routeIs('admin.programs.*') ? $itemActive : $itemInactive }}">
                <div class="{{ $iconBase }} {{ request()->routeIs('admin.programs.*') ? $iconActive : $iconInactive }}">📦</div>
                <span class="{{ $label }}">Program</span>
            </a>

            <a href="{{ route('admin.news.index') }}"
               class="{{ $itemBase }} {{ request()->routeIs('admin.news.*') ? $itemActive : $itemInactive }}">
                <div class="{{ $iconBase }} {{ request()->routeIs('admin.news.*') ? $iconActive : $iconInactive }}">📰</div>
                <span class="{{ $label }}">Berita</span>
            </a>

            @if(auth()->user()->isSuperAdmin())
                <div class="pt-3 mt-2 border-t border-slate-800"></div>

                <a href="{{ route('admin.users.index') }}"
                   class="{{ $itemBase }} {{ request()->routeIs('admin.users.*') ? $itemActive : $itemInactive }}">
                    <div class="{{ $iconBase }} {{ request()->routeIs('admin.users.*') ? $iconActive : $iconInactive }}">👥</div>
                    <span class="{{ $label }}">Pengguna</span>
                </a>

                <a href="{{ route('admin.settings.index') }}"
                   class="{{ $itemBase }} {{ request()->routeIs('admin.settings.*') ? $itemActive : $itemInactive }}">
                    <div class="{{ $iconBase }} {{ request()->routeIs('admin.settings.*') ? $iconActive : $iconInactive }}">⚙</div>
                    <span class="{{ $label }}">Pengaturan</span>
                </a>
            @endif

        </nav>

        <!-- USER CARD (BUNTALE) -->
        <div
            class="mt-4 p-4 rounded-2xl
                   bg-slate-900/80
                   border border-slate-800
                   shadow-lg shadow-black/40 shrink-0">
            <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                    {{ mb_substr(auth()->user()->name, 0, 1) }}
                </div>
                <div class="min-w-0">
                    <p class="text-sm font-semibold text-slate-100 truncate">{{ auth()->user()->name }}</p>
                    <p class="text-xs text-slate-400 truncate">
                        {{ auth()->user()->isSuperAdmin() ? 'Super Admin' : 'Admin' }}
                    </p>
                </div>
            </div>
        </div>

    </div>
</aside>