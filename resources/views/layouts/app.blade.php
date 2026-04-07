<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="description"
          content="@yield('meta_description', 'Website Resmi Badan Eksekutif Mahasiswa (BEM) Universitas - Wadah aspirasi dan pelayanan mahasiswa')">
    <meta name="keywords" content="BEM, Badan Eksekutif Mahasiswa, Universitas, Organisasi Mahasiswa">
    <meta name="author" content="BEM Universitas">

    <title>@yield('title', 'BEM Universitas') - Badan Eksekutif Mahasiswa</title>

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="{{ asset('images/Logo.svg') }}">

    <!-- Vite -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    @stack('styles')
</head>

<body class="min-h-screen flex flex-col bg-white">

    <!-- Navbar -->
    @include('components.navbar')

    <!-- Main -->
    <main class="flex-grow">
        @yield('content')
    </main>

    <!-- Footer -->
    @include('components.footer')

    @stack('scripts')

</body>
</html>
