<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Description extends Model
{
    public function task() {
    	return $this->belongsTo('App\Task');
    }
}
