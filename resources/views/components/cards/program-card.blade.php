@props([
    'icon' => null,
    'image' => null,
    'title',
    'description',
    'link' => null
])

<div class="group bg-white rounded-2xl p-6 shadow-md border border-gray-100
            h-full flex flex-col transition
            hover:-translate-y-1 hover:shadow-xl">

    {{-- ================= THUMBNAIL / ICON ================= --}}
    @if($image)
        <div class="w-full h-40 rounded-xl overflow-hidden mb-5 bg-gray-100">
            <img
                src="{{ $image }}"
                alt="{{ $title }}"
                class="w-full h-full object-cover transition group-hover:scale-105"
                loading="lazy"
            >
        </div>
    @elseif($icon)
        <div class="w-14 h-14 bg-light-bg rounded-xl flex items-center justify-center mb-5">
            <span class="text-3xl">{{ $icon }}</span>
        </div>
    @else
        <div
            class="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark
                   rounded-xl flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6v6l4 2" />
            </svg>
        </div>
    @endif

    {{-- ================= CONTENT ================= --}}
    <h3 class="font-heading font-bold text-xl text-primary-darkest mb-3 leading-snug">
        {{ $title }}
    </h3>

    <p class="text-gray-600 text-sm leading-relaxed flex-grow mb-4">
        {{ Str::limit($description, 120) }}
    </p>

    {{-- ================= LINK ================= --}}
    @if($link)
        <a href="{{ $link }}"
           class="inline-flex items-center text-primary font-semibold text-sm
                  hover:text-primary-dark transition group">
            Selengkapnya
            <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </a>
    @endif
</div>
