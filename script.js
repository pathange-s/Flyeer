var block = document.getElementById("block");
var hole = document.getElementById("hole");
var polo = document.getElementById("polo");
var character = document.getElementById("character");
var jumping = 0;
var counter = 1;

var holetop = 0;
var holebottom = 0;

var ctop = 0;
var cbottom = 0;

var pholetop = 228;
var pholebottom = 389;

var incheight = 10;
var check = 1;

//audio files
var flysound = new Audio('fly.mp3');
var scoresound = new Audio('score.mp3');
var bgmusic = new Audio("bgm.mp3");
var gameover = new Audio("gameover.mp3");


function getColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function hitOrNot() {
    if (check == 0) return false;
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    //top and bottom
    ctop = characterTop;
    cbottom = characterTop + 60;

    if (!(ctop > pholetop && cbottom < pholebottom)) {
        // character hits the block ; end game
        //alert(pholetop+ "    "+ pholebottom + "    character : " + ctop +"    "+cbottom);
        gameoverfunc();
        //console.log("GGGGGGGGGGGAAAAAAAAAAAAMMMMMMMMMMMEEEEEEEEEEEEEOOOOOOOVVVVVVEEEEEERRRRRRRRRRR")
    }







    document.getElementById("score").innerHTML = "Flyeer ! Fly as far as you can ! Score : " + counter;
    counter++;
    scoresound.play();

}


var speed = 10;

var positionHole = parseInt(window.getComputedStyle(hole).getPropertyValue("left"));


var moveblock = setInterval(moveblockfn, 30);

function moveblockfn() {

    positionHole -= speed;
    document.getElementById("hole").style.left = positionHole + "px";
    document.getElementById("block").style.left = positionHole + "px";

    if (positionHole <= 100) {
        //check if character hits the block        
        hitOrNot();
        Levelup();
    }

}


function Levelup() {


    if (check == 0) return false;

    positionHole = 1220;

    time = (30 - counter);
    if (speed < 25) speed += 1.5;
    else speed += 1;

    if (incheight < 70) incheight += 10;

    document.getElementById("hole").style.left = positionHole + "px";
    document.getElementById("block").style.left = positionHole + "px";
    document.getElementById("block").style.backgroundColor = getColor();
    document.getElementById("score").style.color = getColor();



    random = 23 + Math.random() * 307;
    hole.style.top = random + "px";

    //generating random height of hole ---> increases difficulty
    random2 = 100 + Math.random() * 90 + incheight;
    hole.style.height = random2 + "px";

    //hole top && hole bottom = hole top + hole height
    holetop = random;
    if (random + random2 < 560)
        holebottom = random + random2;
    else holebottom = 560;
    // console.log(holetop-holebottom);
    pholetop = holetop;
    pholebottom = holebottom;

}



var gravity = setInterval(gravityfunc, 10);

function gravityfunc() {

    bgmusic.play();
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if (jumping == 0) {
        character.style.top = (characterTop + 2.5) + "px";
    }
    if (characterTop > 510) {
        // character touches ground --> game over
        gameoverfunc();
    }

    if (characterTop < 20) {
        character.style.top = 25 + "px";
    }

}



function jump() {

    if (check == 0) return false;

    jumping = 1;
    let jumpCount = 0;

    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var jumpInterval = setInterval(function () {


        if ((characterTop > 6) && (jumpCount < 15)) {
            flysound.play();
            character.style.top = (characterTop - 3.5) + "px";
            characterTop -= 2.5;
        }

        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }

        jumpCount++;

    }, 10);
}



function reset() {
    //called when character hits block
    check = 1;
    gameover.pause();
    gameover.currentTime = 0;
    character.style.top = 230 + "px";

    jumping = 0;
    counter = 1;

    holetop = 0;
    holebottom = 0;

    ctop = 0;
    cbottom = 0;

    pholetop = 228;
    pholebottom = 389;

    incheight = 10;

    speed = 10;
    positionHole = 1220;
    gravity = setInterval(gravityfunc, 10);
    moveblock = setInterval(moveblockfn, 30);
    document.getElementById("hole").style.left = positionHole + "px";
    document.getElementById("block").style.left = positionHole + "px";
    document.getElementById("score").innerHTML = "Flyeer ! Fly as far as you can ! Score : " + (counter - 1);

}


function gameoverfunc() {

    on();
    bgmusic.pause();
    check = 0;
    clearInterval(gravity);
    clearInterval(moveblock);

    // alert("Game over. Score = "+ counter);
}


function on() {
    gameover.play();
    document.getElementById("overlay").style.display = "block";
}

function off() {


    document.getElementById("overlay").style.display = "none";
    reset();



}