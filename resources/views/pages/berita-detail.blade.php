@extends('layouts.app')

@php
    use Illuminate\Support\Str;
@endphp

@section('title', $berita->title)
@section('meta_description', Str::limit(strip_tags($berita->content ?? ''), 150))

@section('content')

    <section class="section-padding">
        <div class="max-w-4xl mx-auto px-4">

            {{-- Judul --}}
            <h1 class="text-4xl font-extrabold text-primary-darkest mb-4 leading-tight">
                {{ $berita->title }}
            </h1>

            {{-- Meta --}}
            <div class="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-3">
                <span>
                    {{ optional($berita->publish_date)->translatedFormat('d F Y') ?? '-' }}
                </span>
                <span>•</span>
                <span>
                    {{ optional($berita->user)->name ?? 'Admin BEM' }}
                </span>
            </div>

            {{-- Gambar --}}
            <div class="mb-10">
                <img src="{{ $berita->image
        ? asset('storage/' . $berita->image)
        : asset('images/default-news.jpg') }}" alt="{{ $berita->title }}"
                    class="w-full h-auto rounded-xl shadow object-cover">
            </div>

            {{-- Konten --}}
            <article class="prose prose-lg max-w-none text-gray-800">
                {!! $berita->content !!}
            </article>
{{-- TOMBOL LINK EKSTERNAL (AUTO ICON) --}}
@if(!empty($berita->external_link))

    @php
        $url = $berita->external_link;

        if (str_contains($url, 'drive.google.com')) {
            $icon = '📁';
            $label = 'Buka Google Drive';
            $color = 'bg-blue-600 hover:bg-blue-700';
        } elseif (str_contains($url, 'youtube.com') || str_contains($url, 'youtu.be')) {
            $icon = '▶️';
            $label = 'Tonton di YouTube';
            $color = 'bg-red-600 hover:bg-red-700';
        } else {
            $icon = '🌐';
            $label = 'Kunjungi Website';
            $color = 'bg-emerald-600 hover:bg-emerald-700';
        }
    @endphp

    <div class="mt-10 flex justify-center">
        <a
            href="{{ $url }}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-7 py-3
                   {{ $color }}
                   text-white font-semibold rounded-full
                   shadow-lg transition-all duration-200
                   hover:scale-105"
        >
            <span class="text-xl">{{ $icon }}</span>
            <span>{{ $label }}</span>

            {{-- panah --}}
            <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 7h5m0 0v5m0-5L10 14"/>
            </svg>
        </a>
    </div>

@endif
        </div>
    </section>

@endsection