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
        document.addEventListener('deviceReady', this.onDeviceReady, false);
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
    $('.nav-arrow').on('touchstart',pictureNav);

    Hammer(document.getElementById('i-1')).on('swiperight swipeleft',pictureSwipe);
    Hammer(document.getElementById('i-2')).on('swiperight swipeleft',pictureSwipe);
    Hammer(document.getElementById('i-3')).on('swiperight swipeleft',pictureSwipe);

    $('.nav-button').on('touchstart',mainNav);

    $('.product-button').on('touchstart',productNav);

    $('body').on('touchstart',sleepCheck);

}
    




var products = {
    CT4003A:{
        photo:'img/CT4003A.jpg',
        title:'CT400 3A Five Axis CNC EDM Hole Drilling Machine',
        images:[
            'img/pictures/CT400/1.jpg',
            'img/pictures/CT400/3.jpg',
            'img/pictures/CT400/4.jpg',
            'img/pictures/CT400/5.jpg',
            'img/pictures/CT400/6.jpg',

            'img/pictures/Shared/2.jpg',
            'img/pictures/Shared/3.jpg',
            'img/pictures/Shared/4.jpg',
            'img/pictures/Shared/5.jpg',
            'img/pictures/Shared/6.jpg',
            'img/pictures/Shared/7.jpg',
            'img/pictures/Shared/9.jpg'
        ]
    },
    CT4005A:{
        photo:'img/CT4005A.jpg',
        title:'CT400 5A Five Axis CNC EDM Hole Drilling Machine',
        images:[
            'img/pictures/CT400/1.jpg',
            'img/pictures/CT400/3.jpg',
            'img/pictures/CT400/4.jpg',
            'img/pictures/CT400/5.jpg',
            'img/pictures/CT400/6.jpg',

            'img/pictures/Shared/2.jpg',
            'img/pictures/Shared/3.jpg',
            'img/pictures/Shared/4.jpg',
            'img/pictures/Shared/5.jpg',
            'img/pictures/Shared/6.jpg',
            'img/pictures/Shared/7.jpg',
            'img/pictures/Shared/9.jpg'
        ]
    },
    CT5005A:{
        photo:'img/CT5005A.jpg',
        title:'CT500 5A Five Axis CNC EDM Hole Drilling Machine',
        images:[
            'img/pictures/CT500/1.jpg',
            'img/pictures/CT500/2.jpg',
            'img/pictures/CT500/4.jpg',
            'img/pictures/CT500/5.jpg',

            'img/pictures/Shared/2.jpg',
            'img/pictures/Shared/3.jpg',
            'img/pictures/Shared/4.jpg',
            'img/pictures/Shared/5.jpg',
            'img/pictures/Shared/6.jpg',
            'img/pictures/Shared/7.jpg',
            'img/pictures/Shared/9.jpg'
        ]
    },
    RT60505A:{
        photo:'img/RT60505A.jpg',
        title:'RT6050 5A Five Axis CNC EDM Hole Drilling Machine',
        images:[
            'img/pictures/RT6050/10.jpg',

            'img/pictures/Shared/2.jpg',
            'img/pictures/Shared/3.jpg',
            'img/pictures/Shared/4.jpg',
            'img/pictures/Shared/5.jpg',
            'img/pictures/Shared/6.jpg',
            'img/pictures/Shared/7.jpg',
            'img/pictures/Shared/9.jpg'
        ]
    },
    Robot:{
        photo:'img/Robot.jpg',
        title:'Robotic Drilling Cell',
        images:[
            'img/pictures/Robot/1.jpg',
            'img/pictures/Robot/2.jpg',

            'img/pictures/Shared/2.jpg',
            'img/pictures/Shared/3.jpg',
            'img/pictures/Shared/4.jpg',
            'img/pictures/Shared/5.jpg',
            'img/pictures/Shared/6.jpg',
            'img/pictures/Shared/7.jpg',
            'img/pictures/Shared/9.jpg'
        ]
    },
};

var IP = [];
var x = 0;
$.each(products, function(k,v){
    $.each(v.images,function(k,i){
        IP[x] = new Image();
        IP[x].src = i;
        x++;
    });
});


var sleeping = false;

var timer = 180000;

var sleepTimer;

var i = [];

var currentImage = 1;


function pictureSwipe(e){

    var dir = (e.type === 'swipeleft')?'left':'right';

    console.log(e.type);
    changePicture(dir);
}

function pictureNav(){
    
    var dir = $(this).attr('id');

    changePicture(dir);

}

function changePicture(dir){
    console.log(dir);
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

    $('.left').delay(400).css({'background-image':'url('+i[leftImage]+')'});
    $('.right').delay(400).css({'background-image':'url('+i[rightImage]+')'});
    

}



function loadSpecs(){
    var html = '';
    for(var i = 0;i<50;i++){
        html += 'Test Line <br> Scroll Test <br>';
    }

    $('#specs .spec-container').html(html);
}

function mainNav(){
    var t = $(this).attr('data-target');

    $(this).addClass('selected');
    var that= this
    setTimeout(function(){$(that).removeClass('selected');},300);

    if(t !== '#videos'){ 
        $('#video').get(0).pause();
        $('#video').get(0).currentTime = 0;
    }

    $('.app').addClass('hidden');

    $(t).removeClass('hidden');
}

function productNav(){
        
    var product = $(this).attr('data-target');

    if(sessionStorage){
        if(! sessionStorage.productType){
            sessionStorage.productType = product;
            $('#sleep-title').text(products[product].title);
            sleepTimer = setInterval(startSleep,timer);    
        } 
    }

    setProductType(product);

    $('.app').addClass('hidden');

    $('#landing-page').removeClass('hidden');

}

function setProductType(product){

    $('#spec-container').html( $('#'+product).html() );

    i = products[product].images;

    currentImage = 0;
    var leftImage = i.length-1;
    var rightImage = (i.length > 1)? 1 : 0;


    $('.left').css({'background-image':'url('+i[leftImage]+')'});
    $('.center').css({'background-image':'url('+i[currentImage]+')'});
    $('.right').css({'background-image':'url('+i[rightImage]+')'});

    $('#landing-image').attr('src',products[product].photo);

    $('#landing-title').text(products[product].title);

    $('.spec-container').html( $('#'+product).html() );

    

}

function sleepCheck(e){

    if(sleeping){


        sleeping = false;

        sleepTimer = setInterval(startSleep,timer);
        
        setProductType(sessionStorage.productType);

        $('.app, #sleep').addClass('hidden');

        $('#landing-page').removeClass('hidden');
    }
    else{
        if(sleepTimer){

            clearInterval(sleepTimer);
            
            sleepTimer = setInterval(startSleep,timer);
        }
    }
}

function startSleep(){
       
    
    clearInterval(sleepTimer);
    
    $('#sleep').removeClass('hidden');

    sleeping = true;
}