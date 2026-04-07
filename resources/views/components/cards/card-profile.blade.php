<div 
class="bg-white rounded-2xl shadow-md p-6 text-center
transition duration-500 transform hover:-translate-y-2 hover:shadow-xl
animate-fadeInUp">

{{-- FOTO --}}
<div class="flex justify-center mb-4">

<img 
src="{{ $foto }}" 
alt="{{ $nama }}"
class="w-28 h-28 rounded-full object-cover border-4 border-green-100 shadow-sm"
/>

</div>

{{-- NAMA --}}
<h3 class="text-lg font-semibold text-gray-800">
{{ $nama }}
</h3>

{{-- JABATAN --}}
<p class="text-gray-500 text-sm mb-3">
{{ $jabatan }}
</p>

{{-- STATUS --}}
<span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

<span class="w-2 h-2 bg-green-500 rounded-full"></span>

{{ ucfirst($status) }}

</span>

</div>