<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    public function post () {
        $post = ['Facebook','Tiktok','Youtube'];
        return view('post' , ['post' => $post]);
    }
}
