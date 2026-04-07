@extends('admin.layouts.app')

@section('title', $faculty->name)
@section('page-title', $faculty->name)
@section('page-description', 'Detail fakultas')

@section('content')
    <div class="space-y-6">
        <!-- Back Link -->
        <a href="{{ route('admin.faculties.index') }}"
            class="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
                </path>
            </svg>
            Kembali ke Daftar Fakultas
        </a>

        <!-- Faculty Info -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-start gap-6">
                @if($faculty->logo)
                    <img src="{{ Storage::url($faculty->logo) }}" alt="{{ $faculty->name }}"
                        class="w-24 h-24 rounded-xl object-cover">
                @else
                    <div class="w-24 h-24 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <span class="text-emerald-600 font-bold text-3xl">{{ substr($faculty->name, 0, 1) }}</span>
                    </div>
                @endif

                <div class="flex-1">
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ $faculty->name }}</h2>
                    <p class="text-gray-500 mb-4">{{ $faculty->description ?? 'Tidak ada deskripsi' }}</p>

                    <div class="flex items-center gap-6 text-sm">
                        <div>
                            <span class="text-gray-500">Program:</span>
                            <span class="font-semibold text-gray-800">{{ $faculty->programs_count }}</span>
                        </div>
                        <div>
                            <span class="text-gray-500">Berita:</span>
                            <span class="font-semibold text-gray-800">{{ $faculty->news_count }}</span>
                        </div>
                    </div>
                </div>

                @can('update', $faculty)
                    <a href="{{ route('admin.faculties.edit', $faculty) }}"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                            </path>
                        </svg>
                        Edit
                    </a>
                @endcan
            </div>
        </div>
    </div>
@endsection