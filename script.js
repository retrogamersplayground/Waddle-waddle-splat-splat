// full tutorial complete daneil shiffman space invaders clone tutorial

// use this template to draw game canvas  

//p5.js code is below this line


/*bugg report: 
*when the egg hits the far right enemy the game freezes. 
*images will not load on some computers and causes canvas to not load.
*when using arrow controls the chicken freezes when two keys are touched at the same time. Also some choppy movement.
*game over message only displays while touching an enemy. 
*/


/*
Features to be added:
*start game button
*restart game button displays when GAME OVER.
* Level complete message when all enemies are shot. then upload level two with start button
* level two with new enemy image and enemy projectiles.
* level three with new enemy image, projectile and increased speed. 
* level three complete message for "CONGRATULATIONS YOU WIN".

*/




// variables
var ship;
var enemy = [];
var drops = [];
var greg = [];
var egg = [];
var chick;
var canvas;
var points = 0;

function preload() {
  greg = loadImage('https://crossorigin.me/https://s5.postimg.org/61to5wqdj/IMG_0345.jpg');
  egg = loadImage('https://crossorigin.me/https://s5.postimg.org/98cbdcex3/IMG_0404.png');
  chick = loadImage('https://crossorigin.me/https://s5.postimg.org/kqk8f937r/IMG_0401.png');
}



// main function
function setup() {
 
  var canvas = createCanvas(640, 480);
     canvas.parent('sketch-holder');

    background(255, 0, 200);
  
  ship = new Ship();
  
  drop =  new Drop();
  
  for (var i = 0; i < 12; i++) {
    enemy[i] = new Enemy(i*50+80, 20);
    
      }
 
  
  
}



//draw function
function draw(){
 
  background(0);
  ship.show();
  ship.move();
 
  textFont("Comic Sans MS");
  textSize(25);
  fill(255, 244, 244);
  text("Points: " + points, 30, 25);
  
  for (var i = 0; i < drops.length; i ++) {
    drops[i].show();
    drops[i].move();
    for (var j = 0; j < enemy.length; j++) {
      if (drops[i].hits(enemy[j])) {
        enemy[j].grow();
        drops[i].evaporate();
        points = points + 10;
      }
    }
  }
  var edge = false;
  for (var i = 0; i < enemy.length; i ++) {
    enemy[i].show();
    enemy[i].move();
    
    if (enemy[i].x + enemy[i].r > width || enemy[i].x - enemy[i].r < 0) {
      edge = true;
    }
  }
  
  if (edge) {
    for (var i = 0; i < enemy.length; i++) {
      enemy[i].shiftDown();
    
  }
} 
  for (var i = drops.length-1 ; i >= 0; i--) {
    if (drops[i].toDelete) {
      drops.splice(i, 1);
     
    }
  }
 for ( var i = enemy.length-1 ; i >= 0; i--) {
   if (enemy[i].toDelete) {
     enemy.splice(i, 1);
   }
   if (ship.collide(enemy[i])) {
     textFont("Comic Sans MS");
     textSize(50);
     fill(255, 244, 244);
     text("GAME OVER", 175, height/2);
   }
 }
}


//controls function

function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}



function keyPressed() {
  
  if (key === ' '){
    var drop = new Drop(ship.x, height);
    drops.push(drop);
  }
  
  if (keyIsDown (RIGHT_ARROW)) {
    ship.setDir(1);
  }else if (keyIsDown (LEFT_ARROW)) {
    ship.setDir(-1);
  }
}





// ship object constructor function
function Ship() {
  
  this.x = width/2; // ships x location is in the center of the screen 
  this.y = height-30;
  this.xdir = 0;
  this.r = 30;
  this.show = function() {
    imageMode(CENTER);
    image(chick, this.x, this.y, 50, 60);
    //rect(this.x, height-20, 20, 60); // sets x, y loction for the ship, tells how big it is. 
  }
  this.collide = function(enemy){
    var d = dist(this.x, this.y, enemy.x, enemy.y);
      if (d < this.r + enemy.r){
        return true;
      }else {
        return false;
      }
    
  }
  this.setDir = function(dir) {
    this.xdir = dir;
  }
  
  this.move = function(dir) {  //move function
   if(ship.x > 20 && ship.x < width-25)
   {
     this.x += this.xdir*5;
     
   }
   if(ship.x <= 20) {
     ship.x += 1;
   }
    if(ship.x >= width-25){
      this.x += -1;
    }
  }
}


//enemy object construtor function

function Enemy(x, y) {
  this.x = x;
  this.y = y;
  this.r = 10;
  
  this.xdir = 1;
  this.toDelete = false;
  
  this.grow = function() {
    this.toDelete = true;
  }
  this.hits = function(drops){
    var d = dist(this.x, this.y, drops.x, drops.y);
    if (d < this.r + drops.r) {
      return true;
     
    }else {
      return false;
    }
  }
  this.collide = function(ship){
    var d = dist (this.x, this.y, ship.x, ship.y);
    if (d < this.r + ship.r) {
      return true;
      
    }else {
      return false;
    }
  }
  this.shiftDown = function() {
    this.xdir *= -1;
    this.y += this.r + 15;
  }
  
  this.move = function() {
    this.x = this.x + this.xdir;
   
  }
  
  this.show = function() {
    imageMode(CENTER);
    image(greg, this.x, this.y, 20, 30);
  }
  
}



// drop object constructor function

function Drop(x, y) {
  this.x = x;
  this.y = y;
  this.r = 3;
  this.toDelete = false;
  var points = 0;
  
  this.show = function() {
    imageMode(CENTER);
    image(egg, this.x, this.y, 6, 6 )
  }
  
  
  this.evaporate = function() {
    this.toDelete = true;
  } 

  this.hits = function(enemy) {
    var d = dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.r + enemy.r) {
     
      return true;
          
    }else {
      return false;
    }
    
  }

  
  this.move = function() {
    this.y = this.y - 5;
  }
}