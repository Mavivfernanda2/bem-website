<!-- Footer -->
<footer class="bg-primary-darkest text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

            <!-- Column 1: Logo & Description -->
            <div class="lg:col-span-1">
                <a href="{{ route('beranda') }}" class="flex items-center gap-3 mb-4">
                    <img src="{{ asset('images/logo.svg') }}" alt="BEM Universitas" class="h-10">
                    <span class="font-heading font-bold text-xl">
                        BEM Universitas Nahdlatul Ulama Sidoarjo
                    </span>
                </a>
                <p class="text-gray-400 text-sm leading-relaxed">
                    Badan Eksekutif Mahasiswa sebagai wadah aspirasi dan pelayanan mahasiswa
                    untuk menciptakan perubahan positif di lingkungan kampus.
                </p>
            </div>

            <!-- Column 2: Navigation -->
            <div>
                <h4 class="font-heading font-semibold text-lg mb-4 text-accent">Navigasi</h4>
                <ul class="space-y-3 text-sm">
                    <li><a href="{{ route('beranda') }}" class="text-gray-400 hover:text-white">Beranda</a></li>
                    <li><a href="{{ route('profil') }}" class="text-gray-400 hover:text-white">Profil</a></li>
                    <li><a href="{{ route('program') }}" class="text-gray-400 hover:text-white">Program</a></li>
                    <li><a href="{{ route('berita') }}" class="text-gray-400 hover:text-white">Berita</a></li>
                </ul>
            </div>

            <!-- Column 3: BEM Fakultas -->
            <div>
                <h4 class="font-heading font-semibold text-lg mb-4 text-accent">
                    BEM Fakultas
                </h4>

                <ul class="space-y-3 text-sm">
                    <li>
                        <a href="{{ route('fakultas.show', 'fakultas-ilmu-komputer') }}"
                           class="text-gray-400 hover:text-white transition-colors">
                            Fakultas Ilmu Komputer
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('fakultas.show', 'fakultas-ekonomi') }}"
                           class="text-gray-400 hover:text-white transition-colors">
                            Fakultas Ekonomi
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('fakultas.show', 'fakultas-keguruan') }}"
                           class="text-gray-400 hover:text-white transition-colors">
                            Fakultas Keguruan & Ilmu Pendidikan
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('fakultas.show', 'fakultas-teknik') }}"
                           class="text-gray-400 hover:text-white transition-colors">
                            Fakultas Teknik
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('fakultas.show', 'fakultas-agama-islam') }}"
                           class="text-gray-400 hover:text-white transition-colors">
                            Fakultas Agama Islam
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Column 4: Contact & Social -->
            <div>
                <h4 class="font-heading font-semibold text-lg mb-4 text-accent">Hubungi Kami</h4>
                <ul class="space-y-3 mb-6 text-sm text-gray-400">
                    <li class="flex items-start gap-3">
                        <svg class="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>
                            Kampus II: Jl. Lingkar Timur KM 5,5 Rangkah Kidul,
                            Sidoarjo, Jawa Timur 61234
                        </span>
                    </li>
                    <li class="flex items-center gap-3">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>bemunusida.ac.id</span>
                    </li>
                </ul>

                <div class="flex items-center gap-4">
                    <a href="#" class="w-10 h-10 bg-primary/30 hover:bg-accent hover:text-primary-darkest rounded-full flex items-center justify-center transition">
                        IG
                    </a>
                    <a href="#" class="w-10 h-10 bg-primary/30 hover:bg-accent hover:text-primary-darkest rounded-full flex items-center justify-center transition">
                        X
                    </a>
                    <a href="#" class="w-10 h-10 bg-primary/30 hover:bg-accent hover:text-primary-darkest rounded-full flex items-center justify-center transition">
                        YT
                    </a>
                    <a href="#" class="w-10 h-10 bg-primary/30 hover:bg-accent hover:text-primary-darkest rounded-full flex items-center justify-center transition">
                        IN
                    </a>
                </div>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-800 mt-12 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-gray-500 text-sm">
                    &copy; {{ date('Y') }} BEM Universitas Nahdlatul Ulama Sidoarjo.
                    All rights reserved.
                </p>
                <div class="flex items-center gap-6">
                    <a href="#" class="text-gray-500 hover:text-white text-sm">Kebijakan Privasi</a>
                    <a href="#" class="text-gray-500 hover:text-white text-sm">Syarat & Ketentuan</a>
                </div>
            </div>
        </div>
    </div>
</footer>
