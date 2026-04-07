<!-- Sticky Navbar -->
<nav id="navbar"
    class="fixed top-0 left-0 right-0 z-50 bg-primary-dark/95 backdrop-blur-md shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">

            <!-- LEFT: LOGIN / DASHBOARD -->
            <div class="flex-shrink-0">
                @auth
                    @if(auth()->user()->isAdmin())
                        <a href="{{ route('admin.dashboard') }}"
                            class="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg">
                            Dashboard
                        </a>
                    @else
                        <a href="{{ route('admin.login') }}"
                            class="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg">
                            Login
                        </a>
                    @endif
                @else
                    <a href="{{ route('admin.login') }}"
                        class="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg">
                        Login
                    </a>
                @endauth
            </div>

            <!-- CENTER: MENU DESKTOP -->
            <div class="hidden lg:flex items-center space-x-8">
                <a href="{{ route('beranda') }}" class="nav-link text-white">BERANDA</a>
                <a href="{{ route('profil') }}" class="nav-link text-white">PROFIL</a>
                <a href="{{ route('program') }}" class="nav-link text-white">PROGRAM</a>
                <a href="{{ route('berita') }}" class="nav-link text-white">BERITA</a>

                <!-- DROPDOWN FAKULTAS (DB) -->
                <div class="relative group">
                    <button
                        class="flex items-center gap-2 nav-link text-accent font-semibold focus:outline-none">
                        BEM FAKULTAS
                        <svg class="w-4 h-4 transition-transform group-hover:rotate-180"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div
                        class="absolute right-0 top-full mt-2 w-72
                               opacity-0 invisible
                               group-hover:opacity-100 group-hover:visible
                               pointer-events-none group-hover:pointer-events-auto
                               transition duration-200 z-50">

                        <div class="h-2"></div>

                        <div class="bg-white rounded-xl shadow-xl overflow-hidden">
                            @foreach ($navFaculties as $faculty)
                                <a href="{{ route('fakultas.show', $faculty->slug) }}"
                                   class="block px-5 py-3 text-sm text-gray-700 hover:bg-primary/10 transition">
                                    {{ $faculty->name }}
                                </a>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>

            <!-- RIGHT: LOGO + HAMBURGER -->
            <div class="flex items-center gap-4">
                <a href="{{ route('beranda') }}" class="flex items-center gap-2">
                    <img src="{{ asset('images/logo.svg') }}" alt="BEM" class="h-9 w-auto">
                    <span class="hidden sm:block text-white font-bold">ORMAWA</span>
                </a>

                <!-- HAMBURGER -->
                <button id="mobile-menu-btn"
                    class="lg:hidden text-white p-2 focus:outline-none">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- MOBILE MENU -->
    <div id="mobile-menu" class="lg:hidden hidden bg-primary-darkest">
        <div class="px-4 py-4 space-y-2">
            <a href="{{ route('beranda') }}" class="block py-3 px-4 text-white">BERANDA</a>
            <a href="{{ route('profil') }}" class="block py-3 px-4 text-white">PROFIL</a>
            <a href="{{ route('program') }}" class="block py-3 px-4 text-white">PROGRAM</a>
            <a href="{{ route('berita') }}" class="block py-3 px-4 text-white">BERITA</a>

            <!-- MOBILE FAKULTAS -->
            <div class="pt-3 border-t border-white/10">
                <p class="text-accent font-semibold text-sm mb-2">BEM FAKULTAS</p>
                @foreach ($navFaculties as $faculty)
                    <a href="{{ route('fakultas.show', $faculty->slug) }}"
                        class="block py-2 px-4 text-gray-300 hover:text-white text-sm">
                        {{ $faculty->name }}
                    </a>
                @endforeach
            </div>
        </div>
    </div>
</nav>

<!-- Spacer Navbar -->
<div class="h-16 lg:h-20"></div>

<script>
    document.getElementById('mobile-menu-btn')
        ?.addEventListener('click', () => {
            document.getElementById('mobile-menu')
                .classList.toggle('hidden');
        });
</script>
