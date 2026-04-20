@extends('layouts.admin')

@section('content')
<h2>Edit Anggota</h2>

<form action="{{ route('admin.members.update', $member->id) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')

    <input type="text" name="name" value="{{ $member->name }}" placeholder="Nama"><br>

    <input type="text" name="position" value="{{ $member->position }}" placeholder="Jabatan"><br>

    <select name="level">
        <option value="hima" {{ $member->level == 'hima' ? 'selected' : '' }}>Hima</option>
        <option value="faculty" {{ $member->level == 'faculty' ? 'selected' : '' }}>Faculty</option>
    </select><br>

    <select name="organization_id">
        @foreach($organizations as $org)
            <option value="{{ $org->id }}" {{ $member->organization_id == $org->id ? 'selected' : '' }}>
                {{ $org->name }}
            </option>
        @endforeach
    </select><br>

    <input type="file" name="photo"><br><br>

    <button type="submit">Update</button>
</form>
@endsection