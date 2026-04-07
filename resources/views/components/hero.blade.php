@props(['title', 'subtitle' => null, 'ctaText' => null, 'ctaLink' => null])

<section class="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">

    <!-- ================= BACKGROUND ROTATOR (DIV) ================= -->
    <div class="absolute inset-0 z-0 hero-bg-wrap">

        <div class="hero-bg-slide"
             style="background-image:url('{{ asset('images/hero/hero1.jpg') }}')"></div>

        <div class="hero-bg-slide"
             style="background-image:url('{{ asset('images/hero/hero2.jpg') }}')"></div>

        <div class="hero-bg-slide"
             style="background-image:url('{{ asset('images/hero/hero3.jpg') }}')"></div>

        <div class="hero-bg-slide"
             style="background-image:url('{{ asset('images/hero/hero4.jpg') }}')"></div>
    </div>

    <!-- GREEN BRAND OVERLAY -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-darkest/80 via-primary-dark/75 to-primary/70 z-0"></div>

    <!-- DARK OVERLAY -->
    <div class="absolute inset-0 bg-primary-darkest/40 z-0"></div>

    <!-- ================= CONTENT ================= -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="max-w-3xl">

            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span class="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                <span class="text-accent text-sm font-medium">Badan Eksekutif Mahasiswa</span>
            </div>

            <h1 class="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                {{ $title }}
            </h1>

            @if($subtitle)
                <p class="text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl">
                    {{ $subtitle }}
                </p>
            @endif

            @if($ctaText && $ctaLink)
                <div class="flex flex-col sm:flex-row gap-4 sm:items-center">
    <a href="{{ $ctaLink }}"
       class="btn-accent w-full sm:w-auto text-center px-8 py-4 rounded-full text-base sm:text-lg font-bold">
        {{ $ctaText }} →
    </a>

    <a href="{{ route('profil') }}"
       class="bg-white/10 w-full sm:w-auto text-center text-white px-8 py-4 rounded-full text-base sm:text-lg font-semibold border border-white/20">
        Tentang Kami
    </a>
</div>
            @endif
        </div>
    </div>

</section>
