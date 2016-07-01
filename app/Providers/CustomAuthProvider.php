<?php

/**
 * @Author: bihicheng
 * @Date:   2016-07-01 17:07:50
 * @Last Modified by:   bihicheng
 * @Last Modified time: 2016-07-01 18:23:23
 */

namespace App\Providers;

use App\Auth\CustomUserProvider;
use Illuminate\Support\ServiceProvider;

class CustomAuthProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
    	$this->app['auth']->provider('custom', function(){
    		return new CustomUserProvider($this->app['hash'], 'App\User');
    	});
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
