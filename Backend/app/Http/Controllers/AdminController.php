<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
        public function admin() {
            $admin = ["username", "id", "gender"];
        return view('admin', ['admin' => $admin]);
    }
}
