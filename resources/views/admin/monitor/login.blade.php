@extends('admin.layouts.app')

@section('title', 'Monitoring Login')

@section('content')
<div class="max-w-7xl mx-auto px-6 py-10">

    <h1 class="text-2xl font-bold mb-6">Monitoring Login Admin</h1>

    <div class="overflow-x-auto bg-white rounded-xl shadow">
        <table class="w-full text-sm">
            <thead class="bg-slate-100">
                <tr>
                    <th class="px-4 py-3 text-left">Nama</th>
                    <th class="px-4 py-3 text-left">Email</th>
                    <th class="px-4 py-3 text-left">Fakultas</th>
                    <th class="px-4 py-3 text-left">Status</th>
                    <th class="px-4 py-3 text-left">Login Terakhir</th>
                </tr>
            </thead>

            <tbody>
                @foreach($users as $user)
                <tr class="border-t">
                    <td class="px-4 py-3">{{ $user->name }}</td>
                    <td class="px-4 py-3">{{ $user->email }}</td>
                    <td class="px-4 py-3">
                        {{ $user->faculty->name ?? 'Superadmin' }}
                    </td>
                    <td class="px-4 py-3">
                        @if($user->isOnline())
                            <span class="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
                                ● Online
                            </span>
                        @else
                            <span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-600">
                                ● Offline
                            </span>
                        @endif
                    </td>
                    <td class="px-4 py-3">
                        {{ $user->last_login_at?->diffForHumans() ?? '-' }}
                    </td>
                </tr>
                @endforeach
            </tbody>

        </table>
    </div>

</div>
@endsection
