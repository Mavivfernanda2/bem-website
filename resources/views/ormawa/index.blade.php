@extends('layouts.app')

@section('content')

<!-- HERO -->
<section class="bg-primary text-white py-20">
    <div class="max-w-7xl mx-auto px-6 text-center">

        <span class="inline-block bg-white/10 px-4 py-1 rounded-full text-sm mb-4">
            ORMAWA
        </span>

        <h1 class="text-5xl font-bold mb-4">
            Organisasi Mahasiswa
        </h1>

        <p class="text-gray-200 max-w-2xl mx-auto">
            Wadah organisasi mahasiswa Universitas untuk pengembangan minat,
            bakat, dan kontribusi nyata bagi kampus.
        </p>

    </div>
</section>

<!-- LIST ORMAWA -->
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 space-y-16">

        <!-- 🔥 JUDUL -->
        <div class="text-center">
            <span class="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                Daftar ORMAWA
            </span>

            <h2 class="text-3xl font-bold mt-4">
                Struktur Organisasi Mahasiswa
            </h2>
        </div>


        <!-- 🔥 LEVEL UNIVERSITAS -->
        <div>
            <h3 class="text-xl font-bold mb-6 text-gray-700">
                Organisasi Tingkat Universitas
            </h3>

            <div class="grid md:grid-cols-2 gap-6">

                <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                    <h3 class="text-xl font-semibold mb-2">BEM UNUSIDA</h3>
                    <p class="text-gray-500 text-sm">
                        Badan Eksekutif Mahasiswa Universitas
                    </p>
                </div>

                <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                    <h3 class="text-xl font-semibold mb-2">DPM</h3>
                    <p class="text-gray-500 text-sm">
                        Dewan Perwakilan Mahasiswa
                    </p>
                </div>

            </div>
        </div>


        <!-- 🔥 BEM FAKULTAS -->
        <div>
            <h3 class="text-xl font-bold mb-6 text-gray-700">
                BEM Fakultas
            </h3>

            <div class="grid md:grid-cols-3 gap-6">

                @foreach ($faculties as $faculty)
                    <a href="{{ route('fakultas.show', $faculty->slug) }}"
                       class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition block">

                        <h3 class="text-lg font-semibold mb-2">
                            BEM {{ $faculty->name }}
                        </h3>

                        <p class="text-gray-500 text-sm">
                            Klik untuk melihat detail fakultas
                        </p>

                    </a>
                @endforeach

            </div>
        </div>


        <!-- 🔥 HIMA / ORMAWA -->
        <div>
            <h3 class="text-xl font-bold mb-6 text-gray-700">
                Himpunan & UKM
            </h3>

            <div class="grid md:grid-cols-3 gap-6">

                @foreach ($organizations as $org)
                    <a href="{{ route('fakultas.show', $org->faculty->slug ?? '#') }}"
                       class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition block">

                        <h3 class="text-lg font-semibold mb-2">
                            {{ $org->name }}
                        </h3>

                        <p class="text-gray-500 text-sm">
                            {{ $org->description ?? 'Organisasi mahasiswa' }}
                        </p>

                    </a>
                @endforeach

            </div>
        </div>

    </div>
</section>

@endsection