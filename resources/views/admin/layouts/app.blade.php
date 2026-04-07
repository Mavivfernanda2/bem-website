<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Admin Panel') - BEM Admin</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    {{-- SweetAlert2 --}}
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body class="h-screen overflow-hidden bg-slate-900 text-slate-200">

<div class="flex h-full w-full">

    {{-- ================= SIDEBAR (FIXED) ================= --}}
    <aside class="fixed inset-y-0 left-0 z-50 w-64">
        <div class="h-full overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800">
            @include('admin.components.sidebar')
        </div>
    </aside>

    {{-- ============== MAIN WRAPPER ================= --}}
    <div class="ml-72 flex h-full w-full flex-col">

        {{-- ================= HEADER (FIXED) ================= --}}
        <header id="admin-header"
                class="sticky top-0 z-40 bg-slate-900/90 backdrop-blur
                       border-b border-slate-800 transition-shadow">
            <div class="px-8 py-4">
                @include('admin.components.header')
            </div>
        </header>

        {{-- ================= CONTENT (SCROLL AREA) ================= --}}
    <main id="admin-main"
      class="flex-1 overflow-y-auto hide-scrollbar px-12 py-10 space-y-10">
            @yield('content')
        </main>

        {{-- ================= FOOTER (STICKY) ================= --}}
        <footer class="sticky bottom-0 z-30
                       bg-slate-900/90 backdrop-blur
                       border-t border-slate-800
                       py-3 text-center text-xs text-slate-400">
            © {{ date('Y') }} BEM Admin Panel. All rights reserved.
        </footer>

    </div>
</div>

{{-- ================= TOAST ================= --}}
<script>
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Swal === 'undefined') return

    window.Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        background: '#020617',
        color: '#e5e7eb',
        iconColor: '#22c55e',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })

    @if (session('success'))
        Toast.fire({ icon: 'success', title: @json(session('success')) })
    @endif

    @if (session('error'))
        Toast.fire({ icon: 'error', title: @json(session('error')) })
    @endif

    @if ($errors->any())
        Toast.fire({ icon: 'error', title: @json($errors->first()) })
    @endif
})
</script>

{{-- ================= HEADER SHADOW ON SCROLL ================= --}}
<script>
const header = document.getElementById('admin-header')
const main   = document.getElementById('admin-main')

main.addEventListener('scroll', () => {
    header.classList.toggle('shadow-lg', main.scrollTop > 8)
})
</script>

@stack('scripts')
</body>
</html>