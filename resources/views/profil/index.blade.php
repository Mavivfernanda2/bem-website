@extends('layouts.app')

@section('content')
    <h1>Halaman Profil BEM</h1>

    <h2>Sejarah</h2>
    <p>{{ $profil->sejarah ?? 'Sejarah belum tersedia' }}</p>

    <h2>Visi</h2>
    <p>{{ $profil->visi ?? 'Visi belum tersedia' }}</p>

    <h2>Misi</h2>
    <ul>
        @foreach ($profil->misi ?? [] as $misi)
            <li>{{ $misi }}</li>
        @endforeach
    </ul>
@endsection