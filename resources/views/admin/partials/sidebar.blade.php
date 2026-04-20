<aside class="fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 flex flex-col">

    <!-- HEADER -->
    <div class="px-6 py-6 border-b border-slate-800 flex items-center gap-3">
        <div class="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-lg">
            🏛
        </div>
        <div>
            <h1 class="text-white font-bold text-lg">BEM Admin</h1>
            <p class="text-xs text-slate-400">Panel Kontrol</p>
        </div>
    </div>

    <!-- MENU -->
    <nav class="flex-1 px-4 py-6 space-y-1">

        <a href="{{ route('admin.dashboard') }}" class="sidebar-item">
            🏠 <span>Dashboard</span>
        </a>

        <a href="{{ route('admin.faculties.index') }}" class="sidebar-item">
            🏫 <span>Fakultas</span>
        </a>

        <a href="{{ route('admin.programs.index') }}" class="sidebar-item">
            📦 <span>Program</span>
        </a>

        <a href="{{ route('admin.news.index') }}" class="sidebar-item">
            📰 <span>Berita</span>
        </a>

        {{-- 🔥 SUPER ADMIN ONLY --}}
        @if(auth()->user()->isSuperAdmin())
        <a href="{{ route('admin.users.index') }}" class="sidebar-item">
            👥 <span>Pengguna</span>
        </a>
        @endif

        {{-- 🔥 SEMUA ADMIN (INI YANG FIX) --}}
        @if(auth()->check())
        <a href="{{ route('admin.members.index') }}" class="sidebar-item">
            🧩 <span>Struktur Anggota</span>
        </a>
        @endif

    </nav>

    <!-- FOOTER -->
    <div class="px-4 py-4 border-t border-slate-800 space-y-1">

        @if(auth()->user()->isSuperAdmin())
        <a href="{{ route('admin.settings.index') }}" class="sidebar-item">
            ⚙ <span>Pengaturan</span>
        </a>
        @endif

        <form action="{{ route('admin.logout') }}" method="POST">
            @csrf
            <button class="sidebar-logout w-full text-left">
                ⏻ <span>Keluar</span>
            </button>
        </form>

    </div>

</aside>