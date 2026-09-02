<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function user () {
        $user = ['lsok','Heang','dara'];
        return view('user' , ['user' => $user]);
    }
}
