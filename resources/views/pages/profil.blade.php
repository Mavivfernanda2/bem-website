@extends('layouts.app')

@section('title', 'Profil BEM')
@section('meta_description', 'Profil Badan Eksekutif Mahasiswa Universitas')

@section('content')

{{-- ================= HEADER ================= --}}
<section class="py-20 bg-gradient-to-r from-primary to-primary-dark text-white text-center">
    <h1 class="text-4xl font-extrabold mb-4">
        Profil Badan Eksekutif Mahasiswa
    </h1>
    <p class="text-lg text-gray-100">
        BEM sebagai wadah aspirasi, kolaborasi, dan penggerak perubahan mahasiswa.
    </p>
</section>


{{-- ================= PROFIL INTI ================= --}}
<section class="py-20 bg-white">
    <div class="max-w-5xl mx-auto px-4 space-y-12">

        {{-- Sejarah --}}
        <div>
            <h2 class="text-2xl font-bold mb-3">Sejarah</h2>
            <p class="text-gray-600">
                Badan Eksekutif Mahasiswa merupakan organisasi kemahasiswaan
                yang berperan aktif dalam memperjuangkan aspirasi mahasiswa
                di lingkungan universitas.
            </p>
        </div>

        {{-- Visi --}}
        <div>
            <h2 class="text-2xl font-bold mb-3">Visi</h2>
            <p class="text-gray-600">
                Mewujudkan BEM yang progresif, responsif, dan berintegritas.
            </p>
        </div>

        {{-- Misi --}}
        <div>
            <h2 class="text-2xl font-bold mb-3">Misi</h2>
            <ul class="list-disc pl-6 text-gray-600 space-y-2">
                <li>Menjadi jembatan aspirasi mahasiswa</li>
                <li>Mengembangkan potensi mahasiswa</li>
                <li>Mewujudkan organisasi transparan dan profesional</li>
                <li>Meningkatkan kepedulian sosial</li>
            </ul>
        </div>

    </div>
</section>


{{-- ================= STRUKTUR KEPENGURUSAN ================= --}}
<section class="py-24 bg-[#fdfbe9]">
<div class="max-w-7xl mx-auto px-6 space-y-32">


{{-- ================= PIMPINAN ORMAWA ================= --}}
<div class="text-center">

<h2 class="text-3xl font-bold mb-14">
Pimpinan ORMAWA <br>
Universitas Nahdlatul Ulama Sidoarjo
</h2>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">

@include('components.cards.card-profile',[
'foto'=>asset('images/profil/presiden.png'),
'nama'=>'Presiden Mahasiswa',
'jabatan'=>'Presiden Mahasiswa',
'status'=>'aktif'
])

@include('components.cards.card-profile',[
'foto'=>asset('images/profil/wakil.png'),
'nama'=>'Wakil Presiden',
'jabatan'=>'Wakil Presiden Mahasiswa',
'status'=>'aktif'
])

@include('components.cards.card-profile',[
'foto'=>asset('images/profil/dpm-ketua.png'),
'nama'=>'Ketua DPM',
'jabatan'=>'Ketua DPM',
'status'=>'aktif'
])

</div>
</div>


{{-- ================= BEM FAKULTAS ================= --}}
@php
$fakultas = [
'Fakultas Ilmu Komputer' => 'filkom',
'Fakultas Teknik' => 'ti',
'Fakultas Keguruan dan Ilmu Pendidikan' => 'fkip',
'Fakultas Agama Islam' => 'fai',
'Fakultas Ekonomi' => 'eko',
];
@endphp

@foreach ($fakultas as $nama => $kode)

<div>

<h3 class="text-2xl font-bold text-center mb-10">
{{ $nama }}
</h3>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">

@include('components.cards.card-profile',[
'foto'=>asset("images/profil/{$kode}-ketua.png"),
'nama'=>'Ketua',
'jabatan'=>'Ketua BEM',
'status'=>'aktif'
])

@include('components.cards.card-profile',[
'foto'=>asset("images/profil/{$kode}-wakil.png"),
'nama'=>'Wakil',
'jabatan'=>'Wakil Ketua BEM',
'status'=>'aktif'
])

</div>

</div>

@endforeach



{{-- ================= HIMA FILKOM ================= --}}
<div>

<h3 class="text-2xl font-bold text-center mb-10">
HIMA Prodi Fakultas Ilmu Komputer
</h3>

<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">

@foreach (['ti','ti','si','si','rpl','rpl'] as $p)

@include('components.cards.card-profile',[
'foto'=>asset("images/profil/hima-{$p}-ketua.png"),
'nama'=>'Ketua / Wakil',
'jabatan'=>'HIMA Prodi',
'status'=>'aktif'
])

@endforeach

</div>
</div>



{{-- ================= HIMA FKIP ================= --}}
<div>

<h3 class="text-2xl font-bold text-center mb-10">
HIMA Prodi Fakultas Keguruan dan Ilmu Pendidikan
</h3>

<div class="grid grid-cols-2 sm:grid-cols-4 gap-6">

@for ($i=0;$i<4;$i++)

@include('components.cards.card-profile',[
'foto'=>asset('images/profil/hima-fkip.png'),
'nama'=>'Ketua / Wakil',
'jabatan'=>'HIMA Prodi',
'status'=>'aktif'
])

@endfor

</div>
</div>



{{-- ================= HIMA FAI ================= --}}
<div>

<h3 class="text-2xl font-bold text-center mb-10">
HIMA Prodi Fakultas Agama Islam
</h3>

<div class="grid grid-cols-2 sm:grid-cols-4 gap-6">

@for ($i=0;$i<4;$i++)

@include('components.cards.card-profile',[
'foto'=>asset('images/profil/hima-fai.png'),
'nama'=>'Ketua / Wakil',
'jabatan'=>'HIMA Prodi',
'status'=>'aktif'
])

@endfor

</div>
</div>



{{-- ================= HIMA TEKNIK ================= --}}
<div>

<h3 class="text-2xl font-bold text-center mb-10">
HIMA Prodi Fakultas Teknik
</h3>

<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">

@for ($i=0;$i<6;$i++)

@include('components.cards.card-profile',[
'foto'=>asset('images/profil/hima-teknik.png'),
'nama'=>'Ketua / Wakil',
'jabatan'=>'HIMA Prodi',
'status'=>'aktif'
])

@endfor

</div>
</div>



{{-- ================= HIMA EKONOMI ================= --}}
<div>

<h3 class="text-2xl font-bold text-center mb-10">
HIMA Prodi Fakultas Ekonomi
</h3>

<div class="grid grid-cols-2 sm:grid-cols-4 gap-6">

@for ($i=0;$i<4;$i++)

@include('components.cards.card-profile',[
'foto'=>asset('images/profil/hima-eko.png'),
'nama'=>'Ketua / Wakil',
'jabatan'=>'HIMA Prodi',
'status'=>'aktif'
])

@endfor

</div>
</div>


</div>
</section>

@endsection