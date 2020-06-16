<?php
namespace app\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model {
    protected $table = 'employee';
    protected $fillable = ['name', 'birthdate', 'position'];
}