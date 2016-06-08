<?php
/**
 * @Author: bihicheng
 * @Date:   2016-06-06 13:38:12
 * @Last Modified by:   bihicheng
 * @Last Modified time: 2016-06-08 10:17:19
 */
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class HelperServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        foreach (glob(app_path().'/Helpers/*.php') as $filename){
            require_once($filename);
        }
        require_once app_path() . '/constants.php';
    }
}
