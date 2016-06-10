<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
	use SoftDeletes;
	protected $dates = ['deleted_at'];

	public function description() {
		return $this->hasOne('App\Description');
	}

	public function attachments() {
		return $this->hasMany('App\Attachment');		
	}
}
