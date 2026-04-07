@extends('layouts.app')

@section('title', $program->title)
@section('meta_description', Str::limit(strip_tags($program->description), 150))

@section('content')

<!-- ================= HERO ================= -->
<section class="relative py-20 bg-gradient-to-br from-primary-dark via-primary to-primary-dark">
    <div class="max-w-5xl mx-auto px-4 text-center text-white">

        <span class="inline-block bg-white/10 backdrop-blur text-accent text-sm font-semibold px-4 py-2 rounded-full mb-5">
            {{ $program->faculty->name ?? 'Program Umum' }}
        </span>

        <h1 class="font-heading text-4xl lg:text-5xl font-extrabold mb-3">
            {{ $program->title }}
        </h1>

        @if($program->start_date)
            <p class="text-gray-200 text-base">
                {{ $program->start_date->format('d M Y') }}
                @if($program->end_date)
                    – {{ $program->end_date->format('d M Y') }}
                @endif
            </p>
        @endif

    </div>
</section>

<!-- ================= CONTENT ================= -->
<section class="section-padding">
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- MAIN CONTENT -->
        <div class="lg:col-span-2 space-y-6">

            {{-- Thumbnail --}}
            @if($program->image)
                <div class="rounded-2xl overflow-hidden shadow-sm">
                    <img
                        src="{{ Storage::url($program->image) }}"
                        alt="{{ $program->title }}"
                        class="w-full h-[360px] object-cover"
                        loading="lazy"
                    >
                </div>
            @endif

            {{-- Description --}}
            <div class="bg-white rounded-2xl p-6 shadow-sm border">
                <h2 class="font-heading text-xl font-bold mb-3">
                    Tentang Program
                </h2>

                <p class="text-gray-700 leading-relaxed whitespace-pre-line">
                    {{ $program->description }}
                </p>

                {{-- LINK PROGRAM --}}
                @if($program->link)
                    <div class="mt-6 pt-4 border-t">
                        <a href="{{ $program->link }}"
                           target="_blank"
                           rel="noopener"
                           class="inline-flex items-center gap-2
                                  px-5 py-3 rounded-lg
                                  bg-emerald-600 hover:bg-emerald-700
                                  text-white font-semibold transition">

                            🔗 Kunjungi Link Program

                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M14 3h7v7m0-7L10 14" />
                            </svg>
                        </a>
                    </div>
                @endif
            </div>

        </div>

        <!-- SIDEBAR -->
        <aside class="space-y-5">

            {{-- Info Card --}}
            <div class="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 class="font-heading text-lg font-bold mb-4">
                    Informasi Program
                </h3>

                <div class="space-y-4 text-sm text-gray-700">

                    <div>
                        <p class="text-gray-500">Organisasi</p>
                        <p class="font-medium">
                            {{ $program->organization->name ?? '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-gray-500">Fakultas</p>
                        <p class="font-medium">
                            {{ $program->faculty->name ?? 'Umum' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-gray-500">Status</p>
                        <span class="inline-block mt-1 px-3 py-1 text-xs rounded-full
                            {{ $program->status === 'active' ? 'bg-emerald-100 text-emerald-700' : '' }}
                            {{ $program->status === 'completed' ? 'bg-blue-100 text-blue-700' : '' }}
                            {{ $program->status === 'draft' ? 'bg-gray-100 text-gray-600' : '' }}">
                            {{ ucfirst($program->status) }}
                        </span>
                    </div>

                </div>
            </div>

            {{-- Action Buttons --}}
            <div class="space-y-3">
                <a href="{{ route('program') }}"
                   class="block w-full text-center
                          bg-primary text-white py-3 rounded-xl
                          font-semibold hover:bg-primary-dark transition">
                    ← Kembali ke Program
                </a>

                <a href="{{ route('profil') }}"
                   class="block w-full text-center
                          border border-primary text-primary py-3 rounded-xl
                          font-semibold hover:bg-primary/5 transition">
                    Hubungi BEM
                </a>
            </div>

        </aside>

    </div>
</section>

@endsection
