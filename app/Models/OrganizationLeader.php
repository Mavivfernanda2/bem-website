<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrganizationLeader extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'role',
        'name',
        'photo',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}
