@extends('layouts.app')

@section('title', $faculty->name)
@section('meta_description', $faculty->description)

@section('content')

{{-- ================= HEADER ================= --}}
<section class="relative py-20 lg:py-28 bg-gradient-to-br from-primary-dark via-primary to-primary-dark overflow-hidden">
    <div class="absolute inset-0">
        <img
            src="{{ $faculty->logo
                ? asset('storage/' . $faculty->logo)
                : asset('images/default-faculty.jpg') }}"
            alt="{{ $faculty->name }}"
            class="w-full h-full object-cover opacity-20">
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <span class="inline-block bg-white/10 text-accent text-sm font-semibold px-4 py-2 rounded-full mb-6">
            BEM Fakultas
        </span>

        <h1 class="text-4xl lg:text-5xl font-extrabold text-white mb-6">
            {{ $faculty->name }}
        </h1>

        <p class="text-xl text-gray-200 max-w-2xl mx-auto">
            {{ $faculty->description ?? 'Deskripsi fakultas belum tersedia.' }}
        </p>
    </div>
</section>

{{-- ================= 🔥 STRUKTUR ANGGOTA ================= --}}
<section class="section-padding">
    <div class="max-w-7xl mx-auto px-4">

        <div class="text-center mb-12">
            <span class="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
                Struktur Organisasi
            </span>
            <h2 class="text-3xl font-bold text-primary-darkest">
                Kepengurusan {{ $faculty->name }}
            </h2>
        </div>

        @if($members->count())

            @php
                $pimpinan = $members->filter(fn($m) =>
                    in_array($m->position, ['Ketua', 'Wakil Ketua'])
                );

                $anggota = $members->reject(fn($m) =>
                    in_array($m->position, ['Ketua', 'Wakil Ketua'])
                );
            @endphp

            {{-- 🔥 PIMPINAN (SEJAJAR) --}}
            <div class="flex justify-center gap-10 mb-12 flex-wrap">

                @foreach($pimpinan as $m)
                    <div class="bg-white shadow-xl rounded-xl p-6 text-center w-64">

                        <img src="{{ asset('storage/'.$m->photo) }}"
                             class="w-28 h-28 mx-auto rounded-full object-cover mb-4">

                        <h3 class="font-bold text-lg">{{ $m->name }}</h3>

                        <p class="text-primary font-semibold">
                            {{ $m->position }}
                        </p>

                        <span class="text-green-500 text-sm">● Aktif</span>
                    </div>
                @endforeach

            </div>

            {{-- 🔥 ANGGOTA --}}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                @foreach($anggota as $m)
                    <div class="bg-white shadow rounded-xl p-6 text-center">

                        <img src="{{ asset('storage/'.$m->photo) }}"
                             class="w-24 h-24 mx-auto rounded-full object-cover mb-3">

                        <h3 class="font-bold text-lg">
                            {{ $m->name }}
                        </h3>

                        <p class="text-gray-500">
                            {{ $m->position }}
                        </p>

                        <span class="text-green-500 text-sm">
                            ● Aktif
                        </span>
                    </div>
                @endforeach

            </div>

        @else
            <p class="text-center text-gray-500">
                Belum ada data anggota.
            </p>
        @endif

    </div>
</section>

{{-- ================= PROGRAM BEM ================= --}}
<section class="section-padding">
    <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
            <span class="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
                Program Kerja
            </span>
            <h2 class="text-3xl font-bold text-primary-darkest">
                Program {{ $faculty->name }}
            </h2>
        </div>

        @if ($bem && $bem->programs->count())
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach ($bem->programs as $program)
                    @include('components.cards.program-card', [
                        'icon' => '🏛️',
                        'title' => $program->title,
                        'description' => $program->description,
                        'image' => $program->image
                            ? Storage::url($program->image)
                            : null,
                        'link' => route('program.detail', $program)
                    ])
                @endforeach
            </div>
        @else
            <p class="text-center text-gray-500">
                Belum ada program BEM untuk fakultas ini.
            </p>
        @endif
    </div>
</section>

{{-- ================= PROGRAM HIMA ================= --}}
@if ($himas->count())
<section class="section-padding bg-light-bg-alt">
    <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
            <span class="inline-block bg-accent/20 text-primary-darkest text-sm font-semibold px-4 py-2 rounded-full mb-4">
                Himpunan Mahasiswa
            </span>
            <h2 class="text-3xl font-bold text-primary-darkest">
                Program HIMA
            </h2>
        </div>

        @foreach ($himas as $hima)
            @if ($hima->programs->count())
                <div class="mb-12">
                    <h3 class="text-xl font-bold text-primary mb-4">
                        {{ $hima->name }}
                    </h3>

                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        @foreach ($hima->programs as $program)
                            @include('components.cards.program-card', [
                                'icon' => '🎓',
                                'title' => $program->title,
                                'description' => $program->description,
                                'image' => $program->image
                                    ? Storage::url($program->image)
                                    : null,
                                'link' => route('program.detail', $program)
                            ])
                        @endforeach
                    </div>
                </div>
            @endif
        @endforeach
    </div>
</section>
@endif

{{-- ================= BERITA ================= --}}
<section class="section-padding">
    <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
            <span class="inline-block bg-accent/20 text-primary-darkest text-sm font-semibold px-4 py-2 rounded-full mb-4">
                Berita Fakultas
            </span>
            <h2 class="text-3xl font-bold text-primary-darkest">
                Kegiatan Terbaru
            </h2>
        </div>

        @if ($news->count())
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                @foreach ($news as $item)
                    <x-cards.news-card
                        :title="$item->title"
                        :excerpt="Str::limit(strip_tags($item->content), 100)"
                        :image="$item->image
                            ? asset('storage/' . $item->image)
                            : asset('images/default-news.jpg')"
                        :date="$item->publish_date"
                        :link="route('berita.detail', $item->slug)"
                        category="Berita Fakultas"
                    />
                @endforeach
            </div>
        @else
            <p class="text-center text-gray-500 mt-12">
                Belum ada berita untuk fakultas ini.
            </p>
        @endif
    </div>
</section>

@endsection