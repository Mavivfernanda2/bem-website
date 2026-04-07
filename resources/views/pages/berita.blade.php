@extends('layouts.app')

@section('title', 'Berita')
@section('meta_description', 'Berita dan informasi terbaru dari Badan Eksekutif Mahasiswa (BEM) Universitas.')

@section('content')
    <!-- Page Header -->
    <section class="relative py-20 lg:py-28 bg-gradient-to-br from-primary-dark via-primary to-primary-dark overflow-hidden">
        <div class="absolute inset-0">
            <div class="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div class="absolute bottom-0 left-0 w-80 h-80 bg-primary-darkest/40 rounded-full blur-3xl"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span class="inline-block bg-white/10 backdrop-blur-sm text-accent text-sm font-semibold px-4 py-2 rounded-full mb-6">
                Berita & Kegiatan
            </span>
            <h1 class="font-heading text-4xl lg:text-5xl font-extrabold text-white mb-6">
                Informasi Terbaru
            </h1>
            <p class="text-xl text-gray-200 max-w-2xl mx-auto">
                Ikuti berita dan informasi terkini seputar kegiatan BEM Universitas dan fakultas.
            </p>
        </div>
    </section>

    <!-- Filter Section -->
    <section class="py-8 bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-wrap justify-center gap-3">
                <button class="px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-sm">
                    Semua
                </button>
                <button class="px-6 py-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary font-semibold text-sm">
                    Kegiatan
                </button>
                <button class="px-6 py-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary font-semibold text-sm">
                    Seminar
                </button>
                <button class="px-6 py-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary font-semibold text-sm">
                    Pengumuman
                </button>
                <button class="px-6 py-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary font-semibold text-sm">
                    Prestasi
                </button>
            </div>
        </div>
    </section>

    <!-- News Grid -->
    <section class="section-padding bg-light-bg-alt">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                @foreach ($news as $item)
                    @include('components.cards.news-card', [
                        'image' => $item->image
                            ? asset('storage/' . $item->image)
                            : asset('images/default-news.jpg'),

                        'title' => $item->title,

                        'excerpt' => $item->excerpt
                            ?? \Illuminate\Support\Str::limit(strip_tags($item->content), 120),

                        'date' => $item->publish_date ?? $item->created_at,

                        {{-- ⭐ INI KUNCI UTAMA --}}
                        'category' => optional($item->organization?->faculty)->name,

                        'link' => route('berita.detail', $item->slug),
                    ])
                @endforeach
            </div>

            <!-- Pagination Laravel -->
            <div class="mt-12">
                {{ $news->links() }}
            </div>

        </div>
    </section>
@endsection
