/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        deviceReady();
    }
};

$(document).ready(function(){
    deviceReady();
});

function deviceReady(){
    $('.nav-arrow').on('click',pictureNav);

    Hammer(document.getElementById('i-1')).on('swiperight swipeleft',pictureSwipe);
    Hammer(document.getElementById('i-2')).on('swiperight swipeleft',pictureSwipe);
    Hammer(document.getElementById('i-3')).on('swiperight swipeleft',pictureSwipe);

    $('.nav-button').on('click',function(){
        

        var t = $(this).attr('data-target');

        if(t !== '#videos'){ 
            $('#video').get(0).pause();
            $('#video').get(0).currentTime = 0;
        }

        $('.app').addClass('hidden');

        $(t).removeClass('hidden');

    });

}
    




var i = [
    'img/pictures/1.jpg',
    'img/pictures/2.jpg',
    'img/pictures/3.jpg',
    'img/pictures/4.jpg',
    'img/pictures/5.jpg',
    'img/pictures/6.jpg',
    'img/pictures/7.jpg'
];

var currentImage = 1;


function pictureSwipe(e){
    console.log(e.type);
    var dir = (e.type === 'swipeleft')?'left':'right';
    console.log(dir);
    changePicture(dir);
}

function pictureNav(){
    
    var dir = $(this).attr('id');

    changePicture(dir);

}

function changePicture(dir){

    var left = '#' + $('.left').attr('id');
    var center = '#' + $('.center').attr('id');
    var right = '#' + $('.right').attr('id');

    if(dir == 'right'){
        $(left).css({'z-index':3}).removeClass('left').addClass('center');
        $(center).css({'z-index':2}).removeClass('center').addClass('right');
        $(right).css({'z-index':1}).removeClass('right').addClass('left');
        
        currentImage = (currentImage === 0)? i.length-1 : currentImage-1;
    }
    else if(dir == 'left'){
        $(left).css({'z-index':1}).removeClass('left').addClass('right');
        $(center).css({'z-index':2}).removeClass('center').addClass('left');
        $(right).css({'z-index':3}).removeClass('right').addClass('center');
        
        currentImage = (currentImage < i.length-1 )? currentImage+1 : 0;
        
    }

    var leftImage = currentImage === 0 ? i.length-1 : currentImage-1;
    var rightImage = currentImage === i.length-1 ? 0 : currentImage+1;

    $('.left').delay(500).css({'background-image':'url('+i[leftImage]+')'});
    $('.right').delay(500).css({'background-image':'url('+i[rightImage]+')'});
    

}



function loadSpecs(){
    var html = '';
    for(var i = 0;i<50;i++){
        html += 'Test Line <br> Scroll Test <br>';
    }

    $('#specs .spec-container').html(html);
}