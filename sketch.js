var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var survivalTime=0;
var ground, invisibleGround, groundImage;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 200);
monkey=createSprite(50,145,20,50);
monkey.addAnimation("moving", monkey_running);
monkey.scale=0.1;  


  
  ground = createSprite(200,190,900,10);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);

  obstacle = createSprite(400,170,50,40)
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-2

banana = createSprite(200,145,20, 50)  
banana.addImage(bananaImage);  
banana.scale=0.1;  
banana.velocityX=-2
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100,50);
  
invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = true;
  
FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}


function draw() {
background(255);

  text("Score: "+ score, 500,50);
  
  if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
   }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
 if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(invisibleGround);
  monkey.collide(obstacle);
 monkey.collide(banana);
   
  
  if(obstacleGroup.isTouching(monkey)){
        gameState = END;
}
  
  else if (gameState === END) {
  
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
  }
  obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    drawSprites(); 
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(cloudImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacle() {
  if(frameCount % 60 === 0) {var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));}
    
} 