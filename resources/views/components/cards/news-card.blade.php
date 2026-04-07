@props([
    'image' => null,
    'title' => null,
    'excerpt' => null,
    'date' => null,
    'link' => '#',
    'category' => null,
])

@php
    use Carbon\Carbon;

    $safeTitle = $title ?? 'Judul belum tersedia';

    // image SUDAH berupa URL dari parent
    $imageUrl = $image ?: asset('images/default-news.jpg');

    $formattedDate = $date
        ? Carbon::parse($date)->format('d M Y')
        : null;
@endphp

<article class="card-hover bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col">

    <!-- Thumbnail -->
    <div class="relative h-48 overflow-hidden bg-gray-100">
        <img
            src="{{ $imageUrl }}"
            alt="{{ $safeTitle }}"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">

        @if($category)
            <span
                class="absolute top-4 left-4 bg-accent text-primary-darkest text-xs font-bold px-3 py-1 rounded-full">
                {{ $category }}
            </span>
        @endif
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col flex-grow">

        @if($formattedDate)
            <div class="flex items-center gap-2 text-gray-400 text-xs mb-3">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time datetime="{{ $date }}">{{ $formattedDate }}</time>
            </div>
        @endif

        <h3 class="font-heading font-bold text-lg text-primary-darkest mb-3 line-clamp-2 hover:text-primary transition-colors">
            <a href="{{ $link }}">{{ $safeTitle }}</a>
        </h3>

        @if($excerpt)
            <p class="text-gray-600 text-sm leading-relaxed flex-grow line-clamp-3 mb-4">
                {{ $excerpt }}
            </p>
        @endif

        <a
            href="{{ $link }}"
            class="inline-flex items-center text-primary font-semibold text-sm hover:text-primary-dark transition-colors group mt-auto">
            Baca Selengkapnya
            <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </a>

    </div>
</article>
