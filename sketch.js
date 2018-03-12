
var Sound = function(fileName) {
    var fileName = fileName;
    var isPlaying = false;
    var sound;

    this.play = function(){
        if(typeof sound === 'undefined') {
            sound = loadSound(fileName, function(data) {
                sound = data;
                sound.play();
            },
            function(err) {
                alert('there was an error loading the sound  file');
            });
        } else {
            sound.play();
        }

        isPlaying = true;
    };

    this.stop = function() {
        if(typeof sound != 'undefined') {
            sound.stop();
            isPlaying = false;
        }
    };

    this.toggle = function() {
        if(isPlaying) {
            this.stop();
        } else {
            this.play();
        }
    };
}

var backgroundSound = new Sound("steam.mp3");

function setup() {
    createCanvas(1432,672);
}

var health=300;
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.yV=0;
    this.color=random(100,255);
    this.speed=random(1,4);
    this.draw = function() {
        fill(this.color,this.color,this.color);
        rect(this.x, this.y, 20, 20);
    };

    this.drop=function(gravity){
        if (this.isOnGround()){
            this.y = 600;
        } else {
            this.yV+=gravity;
            this.y+=this.yV;
        }
    };

    this.move = function(targetX, targetY) {
        if(this.isOnGround()) {
            if(this.x > targetX) {
                this.x -= this.speed;
            } else {
                this.x += this.speed;
            }
        }
    };

    this.isOnGround=function() {
        return this.y >= 600;
    };

    this.isColliding=function(x,y){
        var xdist=Math.abs(x-this.x);
        var ydist=Math.abs(y-this.y);
        return (xdist<10 && ydist<10);
    };

    return this;
};

var Bullet = function(x, y, direction) {
    this.x = x;
    this.y = y
    this.xVelocity = direction * 6;

    this.draw = function() {
        rect(this.x,this.y,20,3);
    };

    this.move=function(){
        this.x += this.xVelocity;
    };




    

};


var pX=20;
var pY=600;
var pG=-0.1;
var pVV=0;
var bX=pX;
var bY=pY;

scene="menu";
var menu = function() {
    background(100);
    fill(255);
    noStroke();
    rect(200,200,200,100,20);
    rect(1000,200,200,100,20);
    fill(0);
    textSize(70);
    text("play",230,270);
    textSize(55);
    text("settings",1000,270);
};

var settings=function(){
    background(100);
    fill(255);
    rect(1300,600,200,200);
    rect(200,200,200,100,20);
    fill(0);
    text("back",1300,650)
    text("music",220,270);
};
  
Background=function(x,y,w,h){
this.x=x;
this.y=y;
this.w=w;
this.h=h;
rect(x,y,w,h)

};


var enemies=[];

var bullets = [];
genEnemy=function(){
    var x = random(10,2000);
    var y = random(-300,-20);
    var enemy = new Enemy(x, y);
    enemies.push(enemy);
};

player=function(x,y){

    this.x=x;
    this.y=y;
   
rect(x,y,20,20);
 };
var game = function(){
    noStroke();
    background(100,100,100);
    fill(255);
    player(pX,pY,20,20);
    fill(50);

    Background(-1,620,2000,2000);
   
 fill(255,0,0);
  rect(20,20,health,20);

    for(var i = bullets.length - 1; i > -1; i--) {
        var bullet = bullets[i];
        bullet.move();
        bullet.draw();
    }

    for(var i = enemies.length - 1; i > -1; i--) {
        var enemy = enemies[i];
        enemy.draw();
        enemy.drop(0.5);
        enemy.move(pX, pY);
        if(enemy.isColliding(pX,pY)){

            health-=1;
        }

        for(var j = bullets.length - 1; j > -1; j--) {
            var bullet = bullets[j];
            if(enemy.isColliding(bullet.x, bullet.y)) {
                enemies.splice(i, 1);
                bullets.splice(j, 1);
                break;
            }
        }
    }
};

var isDead=function(){
textSize(100);
fill(255);
text("you died try again next time",100,150)

};

setInterval(genEnemy,500);

 this.jump=function(){


  if (pY >599){
      pY = 598;
pVV-=3;
    
    } 
 
};



keyPressed = function() {
  if (keyCode===32){
    this.jump();
  }};
mousePressed=function(){
    direction = mouseX > pX ? 1 : -1;
    bullets.push(new Bullet(pX, pY, direction));
if (scene==="menu"&&mouseX>200&&mouseY>200&&mouseY<300&&mouseX<400){

  scene="game";  
}if (scene==="menu"&&mouseX>1000&&mouseY>200&&mouseY<300&&mouseX<1200){

    scene="settings"; 
}if (scene==="settings"&&mouseX>1300&&mouseY>600){

    scene="menu";
}if (scene==="settings"&&mouseX>200&&mouseY>200&&mouseY<300&&mouseX<400){
    backgroundSound.toggle();
  
  
}

};

draw = function(){
if (health<1){

    scene="dead";
}

 



if(scene==="game"){
health+=.1;
if (health>=300){
    health=300;
}
  if (pY >599){
        pY = 600;
        pVV = 0;
    } else {
        pY += pVV;
        pVV -= pG;
    }

    game();
    if (keyIsDown(68)) {
        pX += 5;
      }if (keyIsDown(65)) {
        pX -=5;;
      }
      
    }if (scene==="dead"){
        isDead();

    }if (scene==="menu"){

        menu();
    }if (scene==="settings"){

        settings();
    }
};
