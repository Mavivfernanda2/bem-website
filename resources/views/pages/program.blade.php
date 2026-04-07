@extends('layouts.app')

@section('title', 'Program')
@section('meta_description', 'Program kerja Badan Eksekutif Mahasiswa (BEM) Universitas. Berbagai kegiatan dan program untuk pengembangan mahasiswa.')

@section('content')

    <!-- ================= PAGE HEADER ================= -->
    <section
        class="relative py-20 lg:py-28 bg-gradient-to-br from-primary-dark via-primary to-primary-dark overflow-hidden">
        <div class="absolute inset-0">
            <div
                class="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2">
            </div>
            <div class="absolute bottom-0 left-0 w-80 h-80 bg-primary-darkest/40 rounded-full blur-3xl"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span
                class="inline-block bg-white/10 backdrop-blur-sm text-accent text-sm font-semibold px-4 py-2 rounded-full mb-6">
                Program Kerja
            </span>

            <h1 class="font-heading text-4xl lg:text-5xl font-extrabold text-white mb-6">
                Program BEM Universitas
            </h1>

            <p class="text-xl text-gray-200 max-w-2xl mx-auto">
                Komitmen nyata untuk memajukan mahasiswa melalui program-program yang berdampak langsung dan terukur.
            </p>
        </div>
    </section>

    <!-- ================= PROGRAM LIST ================= -->
    <section class="section-padding">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- FILTER -->
            <div class="flex flex-wrap justify-center gap-3 mb-12">
                <button class="px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm">
                    Semua
                </button>
                @foreach (['Pendidikan', 'Sosial', 'Karir', 'Budaya'] as $filter)
                    <button
                        class="px-6 py-3 rounded-full bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary font-semibold text-sm transition-all">
                        {{ $filter }}
                    </button>
                @endforeach
            </div>

            <!-- PROGRAM GRID -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                @forelse ($programs as $program)
                    <div
                        class="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 flex flex-col h-full transition hover:-translate-y-1 hover:shadow-xl">

                        <!-- Category -->
                        <span class="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit">
                            {{ $program->faculty->name ?? 'Umum' }}
                        </span>

                        <!-- Thumbnail -->
                        <div class="w-full h-44 rounded-xl overflow-hidden mb-5 bg-gray-100">
                            @if (!empty($program->image))
                                <img
                                    src="{{ Storage::url($program->image) }}"
                                    alt="{{ $program->title }}"
                                    class="w-full h-full object-cover"
                                    loading="lazy"
                                >
                            @else
                                <div class="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                    Tidak ada gambar
                                </div>
                            @endif
                        </div>

                        <!-- Content -->
                        <h3 class="font-heading font-bold text-xl text-primary-darkest mb-3">
                            {{ $program->title }}
                        </h3>

                        <p class="text-gray-600 text-sm leading-relaxed flex-grow mb-5">
                            {{ $program->description }}
                        </p>

                        <!-- ✅ ACTION (FINAL FIX) -->
                        <a href="{{ route('program.detail', $program) }}"
                           class="inline-flex items-center text-primary font-semibold text-sm hover:text-primary-dark transition group">
                            Selengkapnya
                            <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>

                    </div>
                @empty
                    <div class="col-span-full text-center text-gray-500 py-12">
                        Belum ada program tersedia.
                    </div>
                @endforelse
            </div>

        </div>
    </section>

    <!-- ================= IMPACT SECTION ================= -->
    <section class="section-padding bg-light-bg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-12 items-center">

                <div>
                    <span
                        class="inline-block bg-accent/20 text-primary-darkest text-sm font-semibold px-4 py-2 rounded-full mb-4">
                        Dampak Program
                    </span>

                    <h2 class="font-heading text-3xl lg:text-4xl font-bold text-primary-darkest mb-6">
                        Kontribusi Nyata untuk Mahasiswa
                    </h2>

                    <p class="text-gray-600 text-lg mb-8">
                        Setiap program dirancang untuk memberi manfaat langsung bagi mahasiswa dan masyarakat sekitar.
                    </p>

                    <div class="grid grid-cols-2 gap-6">
                        @foreach ([
                                ['2,500+', 'Peserta Program'],
                                ['50+', 'Kegiatan Terselenggara'],
                                ['15', 'Mitra Kerjasama'],
                                ['5', 'Desa Binaan']
                            ] as [$value, $label])
                            <div class="bg-white rounded-xl p-6 shadow-md">
                                <div class="text-3xl font-heading font-bold text-primary mb-2">{{ $value }}</div>
                                <p class="text-gray-600 text-sm">{{ $label }}</p>
                            </div>
                        @endforeach
                    </div>
                </div>

                <div class="relative">
                    <div class="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800"
                             alt="Dampak Program BEM" class="w-full h-full object-cover">
                    </div>
                    <div class="absolute -bottom-6 -right-6 bg-accent rounded-2xl p-6 shadow-xl">
                        <p class="text-primary-darkest font-heading font-bold text-lg">
                            “Bersama Membawa Perubahan”
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="section-padding bg-primary-darkest">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="font-heading text-3xl lg:text-4xl font-bold text-white mb-6">
                Ingin Berkontribusi?
            </h2>
            <p class="text-xl text-gray-300 mb-8">
                Bergabung sebagai relawan atau mitra untuk menciptakan perubahan positif.
            </p>

            <a href="{{ route('profil') }}"
               class="btn-accent px-8 py-4 rounded-full text-lg font-bold inline-flex items-center gap-2">
                Hubungi Kami
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </a>
        </div>
    </section>

@endsection
