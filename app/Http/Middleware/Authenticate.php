<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\User;


class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        $sess_urid = $request->session()->get('mugeda_user_ref_id');
        $sess_username = $request->session()->get('mugeda_user');
        if(!empty($sess_urid) && !empty($sess_username)) {
            $user = User::where('urid', $sess_urid)->first();
            if(!empty($user)) {
                Auth::attempt(['urid'=>$sess_urid]);
            } else {
                $user = User::create(['urid'=>$sess_urid]);
                Auth::guard($guard)->login($user);
            }
        } else {
            return redirect()->away(MUGEDA_SITE_LOGIN);
        }
        return $next($request);
    }
}
