<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - BEM Admin</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    {{-- CLOUDFLARE TURNSTILE --}}
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</head>

<body class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-200 relative">

<div class="min-h-screen flex items-center justify-center px-4 py-10 relative">

    <!-- BACKGROUND GLOW (AMAN & GA MOTONG) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -left-40 w-[30rem] h-[30rem]
                    bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -right-40 w-[30rem] h-[30rem]
                    bg-sky-500/20 rounded-full blur-3xl"></div>
    </div>

    <!-- CONTENT -->
    <div class="relative z-10 w-full max-w-md">

        <!-- LOGO -->
        <div class="text-center mb-8">
            <div class="mx-auto mb-4
                        w-16 h-16 rounded-2xl
                        bg-emerald-600
                        flex items-center justify-center
                        shadow-xl">
                <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"/>
                </svg>
            </div>

            <h1 class="text-2xl font-bold text-white">BEM Admin Panel</h1>
            <p class="text-sm text-slate-400 mt-1">
                Masuk ke panel administrasi
            </p>
        </div>

        <!-- LOGIN CARD -->
        <div class="bg-slate-900/80 backdrop-blur-xl
                    border border-slate-700/50
                    rounded-2xl shadow-2xl
                    p-6 sm:p-8">

            {{-- ERROR --}}
            @if ($errors->any())
                <div class="mb-5 rounded-xl
                            bg-red-500/10 border border-red-500/30
                            px-4 py-3 text-red-400 text-sm space-y-1">
                    @foreach ($errors->all() as $error)
                        <p>{{ $error }}</p>
                    @endforeach
                </div>
            @endif

            <form method="POST" action="{{ route('admin.login') }}" class="space-y-5">
                @csrf

                <!-- EMAIL -->
                <div>
                    <label class="block text-sm mb-1 text-slate-300">
                        Email
                    </label>
                    <input type="email" name="email"
                           value="{{ old('email') }}"
                           placeholder="admin@bem.ac.id"
                           required autofocus
                           class="w-full px-4 py-3 rounded-xl
                                  bg-slate-800 text-white
                                  border border-slate-700
                                  placeholder-slate-500
                                  focus:ring-2 focus:ring-emerald-500
                                  focus:border-emerald-500">
                </div>

                <!-- PASSWORD -->
                <div>
                    <label class="block text-sm mb-1 text-slate-300">
                        Password
                    </label>
                    <input type="password" name="password"
                           placeholder="••••••••"
                           required
                           class="w-full px-4 py-3 rounded-xl
                                  bg-slate-800 text-white
                                  border border-slate-700
                                  placeholder-slate-500
                                  focus:ring-2 focus:ring-emerald-500
                                  focus:border-emerald-500">
                </div>

                <!-- REMEMBER -->
                <div class="flex items-center gap-2">
                    <input type="checkbox" name="remember"
                           class="w-4 h-4 rounded
                                  bg-slate-800
                                  border-slate-600
                                  text-emerald-600
                                  focus:ring-emerald-500">
                    <span class="text-sm text-slate-400">Ingat saya</span>
                </div>

                <!-- TURNSTILE -->
                <div class="flex justify-center py-2">
                    <div class="cf-turnstile scale-90 sm:scale-100"
                         data-theme="dark"
                         data-sitekey="0x4AAAAAACTasvPlsPjmycvG">
                    </div>
                </div>

                <!-- BUTTON -->
                <button type="submit"
                        class="w-full py-3 rounded-xl
                               bg-emerald-600 hover:bg-emerald-700
                               font-semibold text-white
                               shadow-lg shadow-emerald-600/30
                               transition">
                    Masuk
                </button>
            </form>
        </div>

        <!-- BACK LINK -->
        <div class="text-center mt-6">
            <a href="{{ route('beranda') }}"
               class="text-sm text-slate-400 hover:text-emerald-500 transition">
                ← Kembali ke Website
            </a>
        </div>

    </div>
</div>

</body>
</html>
