var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;

var banana ,bananaImage;
var bananaGroup;

var obstacle, obstacleImage;
var obstacleGroup;

var ground;

var survivalTime;

var score;

function preload(){
  
monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  //creating the ground and adding velocity to it
  ground = createSprite(400,350,900,10);
  ground.velocityX = 5;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  //giving X velocity to the ground so that it keeps moving
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  //creating the monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  survivalTime = 0;

  score = 0;
  
}


function draw() {
  background(0);
  
  //displaying the survival time
  stroke("red");
  textSize(20);
  fill("red");
  survivalTime = survivalTime + Math.round(frameRate()/60);
  text("Survival Time:" + survivalTime, 100, 50);
  
  if(gameState === PLAY){
    
    //creating the ground
    ground = createSprite(400,350,900,10);
    ground.velocityX = 5;
    ground.x = ground.width/2;
    
    ground.velocityX = -(5 + 5*survivalTime/100);
    
    //making the monkey jump
  if(keyDown("space")&& monkey.y >= 200) {
     monkey.velocityY = -12;
    
  if(obstacleGroup.isTouching(monkey)){
  
    gameState = END;
  }
     }
    
    if(gameState === END){
      
    }
    
  //adding gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnbananas();
    
    spawnObstacles();
    
  }
     
  monkey.collide(ground);
  
  
  drawSprites();

  
}

//function for spawning bananas
function spawnbananas() {
  
  if(frameCount % 80 === 0) {
    banana = createSprite(400,200,10,10);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananaImage);
    
    banana.scale = 0.1;
    
    banana.velocityX = -5;
    
    //giving lifetime to all the banana sprites to prevent memory leakage
    banana.lifetime = 400;
    
    //adding each banana sprite to a group
    bananaGroup.add(banana);
    
  }
}

function spawnObstacles() {
  
  if(frameCount % 200 === 0) {
    obstacle = createSprite(400,300,10,10);
    obstacle.x = Math.round(random(400,400));
    obstacle.y = 310;
    obstacle.addImage(obstacleImage);
    
    obstacle.scale = 0.2;
    
    obstacle.velocityX = -5;
    
//giving lifetime to all the obstacle sprites to prevent memory leakage
    obstacle.lifetime = 400;
    
     //adding each obstacle sprite to a group
    obstacleGroup.add(obstacle);
    
  }
}




