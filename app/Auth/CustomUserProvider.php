<?php
/**
 * @Author: bihicheng
 * @Date:   2016-07-01 16:58:28
 * @Last Modified by:   bihicheng
 * @Last Modified time: 2016-07-01 18:38:30
 */
namespace App\Auth;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Contracts\Auth\Authenticatable as UserContract;

class CustomUserProvider extends EloquentUserProvider {
    /**
     * Validate a user against the given credentials.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  array  $credentials
     * @return bool
     */
    public function validateCredentials(UserContract $user, array $credentials)
    {
        $urid = $credentials['urid'];

        return $user->urid == $urid;
    }	
}