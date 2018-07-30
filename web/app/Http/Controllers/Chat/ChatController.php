<?php

namespace App\Http\Controllers\Chat;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Events\Chat\MessageCreated;
use App\Message;
use App\User;
use App\Auth;

class ChatController extends Controller
{

    protected $messages;
    protected $users;

    public function __construct()
    {
        $this->middleware('auth'); //fix auth
    }

    public function index()
    {
       return view('chat.index');
    }

    public function get()
    {
        $messages = Message::with(['user'])->get();
        return response()->json(
            $messages, 200
        );
    }

    public function store(StoreChatMessageRequest $request)
    {
        $message = $request->user()->messages()->create([
            'body' => $request->body 
        ]);

        broadcast(new MessageCreated($message))->toOthers();
        return response()->json($message, 200);

    }

}

