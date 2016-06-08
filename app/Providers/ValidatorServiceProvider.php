<?php
/**
 * @Author: bihicheng
 * @Date:   2016-06-08 10:10:55
 * @Last Modified by:   bihicheng
 * @Last Modified time: 2016-06-08 10:39:11
 */

namespace App\Providers;

use Validator;
use Illuminate\Support\ServiceProvider;

class ValidatorServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('status', 'CustomValidator@statusValidate', 
                                        'invalidate status.');
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
