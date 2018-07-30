@extends('layouts.app')

@section('content')
<chat :user="user"  inline-template>
    <div id="chat">

        <div class="flex chat__info">
            <h3>Kinderly</h3>
            <h6>Chat Application</h6>
            <p>Proof of concept chat application built for Kinderly to demonstrate Pusher realtime functionality.</p>
        </div>

        <div class="flex chat__area">
            <div class="chat__title">
                <h1><fa icon="comments" /></fa> Kinderly Chat</h1>
            </div>
            <div class="chat__window">
                <messages></messages>
            </div>
            <form class="chat__form">
                <textarea
                    v-model="body"
                    @keyup.enter="handleInput"
                    class="chat__message"
                    placeholder="What's on your mind?"
                ></textarea>
                <emoji :body="body"></emoji>
            </form>
        </div>

        <div class="flex users__online-wrap">
            <users></users>
        </div> 

        <notifications group="foo" /></notifications>
        
    </div>

</chat>

@endsection
