<header class="w-full flex items-center justify-between">

    {{-- LEFT: PAGE TITLE --}}
    <div>
        @if(trim($__env->yieldContent('page-title')))
            <h1 class="text-2xl font-bold text-white">
                @yield('page-title')
            </h1>
            <p class="text-sm text-slate-400">
                @yield('page-description')
            </p>
        @endif
    </div>

    {{-- RIGHT: ACTIONS --}}
    <div class="flex items-center gap-4">

        <a href="{{ route('beranda') }}" target="_blank"
           class="w-10 h-10 rounded-lg flex items-center justify-center
                  text-slate-400 hover:text-emerald-400
                  hover:bg-emerald-500/10 transition">
            ↗
        </a>

        <form action="{{ route('admin.logout') }}" method="POST">
            @csrf
            <button type="submit"
                class="px-4 py-2 rounded-lg text-sm font-medium
                       text-red-400 hover:bg-red-500/10 transition">
                Keluar
            </button>
        </form>

    </div>
</header>
