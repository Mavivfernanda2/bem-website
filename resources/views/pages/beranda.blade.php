@extends('layouts.app')

@section('title', 'Beranda')
@section('meta_description', 'Selamat datang di website resmi Badan Eksekutif Mahasiswa (BEM) Universitas. Wadah aspirasi dan pelayanan mahasiswa.')

@section('content')

    <!-- ================= HERO SECTION ================= -->
    @include('components.hero', [
        'title' => 'Bersama Membangun Kampus yang Lebih Baik',
        'subtitle' => 'Wadah aspirasi dan pelayanan mahasiswa untuk menciptakan perubahan positif di lingkungan kampus dan masyarakat.',
        'ctaText' => 'Lihat Program Kami',
        'ctaLink' => route('program'),
    ])

    <!-- ================= STATS SECTION ================= -->
    <section class="py-12 -mt-10 relative z-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="text-center">
                    <div class="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">10+</div>
                    <p class="text-gray-600 text-sm">Hima Prodi</p>
                </div>
                <div class="text-center">
                    <div class="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">50+</div>
                    <p class="text-gray-600 text-sm">Program Kerja</p>
                </div>
                <div class="text-center">
                    <div class="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">500+</div>
                    <p class="text-gray-600 text-sm">Mahasiswa Terlibat</p>
                </div>
                <div class="text-center">
                    <div class="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">5</div>
                    <p class="text-gray-600 text-sm">BEM Fakultas</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ================= PROGRAM HIGHLIGHT ================= -->
    <section class="section-padding bg-light-bg-alt">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto mb-12">
                <span class="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
                    Program Unggulan
                </span>
                <h2 class="font-heading text-3xl lg:text-4xl font-bold text-primary-darkest mb-4">
                    ORMAWA Universitas Nahdlatul Ulama Sidoarjo
                </h2>
                <p class="text-gray-600 text-lg">
                    Komitmen nyata untuk memajukan mahasiswa melalui program-program yang berdampak langsung.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                @foreach($programs as $program)
                    @include('components.cards.program-card', [
                        'icon' => $program['icon'],
                        'title' => $program['title'],
                        'description' => $program['description'],
                        'link' => route('program'),
                    ])
                @endforeach
            </div>

            <div class="text-center mt-12">
                <a href="{{ route('program') }}"
                   class="btn-primary px-8 py-4 rounded-full inline-flex items-center gap-2 text-lg">
                    Lihat Semua Program
                </a>
            </div>
        </div>
    </section>
    
  <!-- ================= LOGO SEMUA ORMAWA ================= -->
<section class="py-16 bg-[#fdfbe9]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 class="text-2xl font-bold text-center text-slate-900 mb-10">
            Organisasi Mahasiswa
        </h2>

        <!-- Wrapper khusus animasi (anti kepotong) -->
        <div class="relative w-full overflow-hidden">
            <div class="flex items-center gap-14 animate-ormawa-scroll">

                {{-- ================= HIMA ================= --}}
                <img src="{{ asset('images/ormawa/HIMA AKUN.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="HIMA Akuntansi">

                <img src="{{ asset('images/ormawa/HIMA DKV.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="HIMA DKV">

                <img src="{{ asset('images/ormawa/HIMA MNG.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="HIMA Manajemen">

                <img src="{{ asset('images/ormawa/HIMA PBI.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="HIMA PBI">

                <img src="{{ asset('images/ormawa/HIMA PGSD.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="HIMA PGSD">

                <img src="{{ asset('images/ormawa/HIMA SI.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="HIMA Sistem Informasi">

                <img src="{{ asset('images/ormawa/HIMA TIF.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="HIMA Teknik Informatika">

                <img src="{{ asset('images/ormawa/HIMA TK.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="HIMA Teknik">

                {{-- ================= UKM ================= --}}
                <img src="{{ asset('images/ormawa/UKM ENGLISH.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="UKM English">

                <img src="{{ asset('images/ormawa/UKM FUTSAL.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="UKM Futsal">

                <img src="{{ asset('images/ormawa/UKM MU.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="UKM MU">

                <img src="{{ asset('images/ormawa/UKM NS.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="UKM NS">

                <img src="{{ asset('images/ormawa/UKM PADUS.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="UKM Paduan Suara">

                <img src="{{ asset('images/ormawa/UKM PN.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="UKM PN">

                <img src="{{ asset('images/ormawa/UKM PRAMUKA.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="UKM Pramuka">

                <img src="{{ asset('images/ormawa/UKM RSIT.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="UKM RSIT">

                <img src="{{ asset('images/ormawa/UKM TARI.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="UKM Tari">

                <img src="{{ asset('images/ormawa/UKM TEATER.png') }}"
                     class="h-24 px-4 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
                     alt="UKM Teater">

                {{-- ================= DUPLIKAT (UNTUK LOOP HALUS) ================= --}}
                <img src="{{ asset('images/ormawa/HIMA AKUN.png') }}" class="h-24 px-4 opacity-80" alt="">
                <img src="{{ asset('images/ormawa/HIMA DKV.png') }}" class="h-24 px-4 opacity-80" alt="">
                <img src="{{ asset('images/ormawa/UKM ENGLISH.png') }}" class="h-24 px-4 opacity-80" alt="">
                <img src="{{ asset('images/ormawa/UKM FUTSAL.png') }}" class="h-24 px-4 opacity-80" alt="">

            </div>
        </div>

    </div>
</section>


    <!-- ================= LATEST NEWS ================= -->
    <section class="section-padding">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
                <div>
                    <span class="inline-block bg-accent/20 text-primary-darkest text-sm font-semibold px-4 py-2 rounded-full mb-4">
                        Berita Terbaru
                    </span>
                    <h2 class="font-heading text-3xl lg:text-4xl font-bold text-primary-darkest">
                        Informasi & Kegiatan
                    </h2>
                </div>
                <a href="{{ route('berita') }}" class="text-primary font-semibold hover:text-primary-dark">
                    Lihat Semua Berita →
                </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                @forelse($news as $item)
                    @include('components.cards.news-card', [
                        'image' => $item->image
                            ? asset('storage/' . $item->image)
                            : asset('images/default-news.jpg'),
                        'title' => $item->title,
                        'excerpt' => $item->excerpt,
                        'date' => $item->publish_date,
                        'category' => optional($item->organization?->faculty)->name,
                        'link' => route('berita.detail', $item->slug),
                    ])
                @empty
                    <p class="text-gray-500 col-span-3 text-center">Belum ada berita.</p>
                @endforelse
            </div>

        </div>
    </section>

    <!-- ================= CTA SECTION ================= -->
    <section class="section-padding bg-gradient-to-br from-primary-dark via-primary to-primary-dark text-white text-center">
        <h2 class="text-3xl font-bold mb-4">Bergabunglah dengan Gerakan Perubahan</h2>
        <p class="max-w-2xl mx-auto mb-6">
            Mari bersama-sama membangun kampus yang lebih baik dan berdaya saing.
        </p>
        <a href="{{ route('profil') }}" class="btn-accent px-8 py-4 rounded-full">
            Tentang ORMAWA
        </a>
    </section>

@endsection
