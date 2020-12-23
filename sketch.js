var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground,forest,ingro;
var survivalTime = 0;
var oi,ok,start,si,go,goi,change;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  ground = loadImage("backg.png");
  oi = loadImage("ok.png");
  goi = loadImage("over.png");
  change = loadImage("sprite_6.png");
}



function setup() {
  createCanvas(400,400);
  
  forest = createSprite(200,230,400,400);
  forest.addImage("back",ground);
  forest.scale = 1.12;
  forest.velocityX = -3;
  
  monkey = createSprite(80,320,1,1);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("stop",change);
  monkey.scale = 0.2;
  monkey.debug = false;
  monkey.setCollider("rectangle",0,0,400,600);
  
  ingro = createSprite(200,385,400,10);
  ingro.visible = false;
  
  FoodGroup = new Group;
  obstacleGroup = new Group;
  
  ok = createSprite(100,80,1,1);
  ok.addImage("return",oi);
  ok.scale = 1.2;
  
  go = createSprite(380,30,1,1);
  go.addImage("over",goi);
  go.scale = 1.5;
  
}


function draw() {
background(210);
  
  if (gameState === PLAY){
    
      go.visible = false;
      ok.visible = false;
    
     if (forest.x < 80){
      forest.x = forest.width/2;
      }
    
      if (keyDown("space") && monkey.y >= 300){
      monkey.velocityY = -17;
      }  
    
      monkey.velocityY = monkey.velocityY + 0.7;
    
      if (monkey.isTouching(obstacleGroup)){
      gameState = END;
      }
    
      fill("white");
      text("Score :" + score,300,200);
      fill("black");
      survivalTime = Math.ceil(frameCount/frameRate());
    
      food();
      stone();
      console.log(frameCount);
  }

  monkey.collide(ingro);
 
  if (gameState === END)
  {
    monkey.changeAnimation("stop",change);

      go.visible = true;
      ok.visible = true;

      forest.velocityX = 0;
      monkey.velocityY = 0;

      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);

      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
  }
     
        if (mousePressedOver(ok)){
          reset();
        }
  
  drawSprites();  
  fill ("black");
  text("Survival Time :" + survivalTime,200,20);
}

function reset(){
  ok.visible = false;
  go.visible = false;
  gameState = PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  survivalTime = 0;
  monkey.changeAnimation("moving",monkey_running);
   if (forest.x < 80){
      forest.x = forest.width/2;
      }
}

function food(){
    if (frameCount % 80 === 0){
      banana = createSprite(400,Math.round(random(120,200)),1,1);
      banana.addImage("food",bananaImage);
      banana.scale = 0.14;
      banana.velocityX = -3;
      banana.lifetime = 120;
      FoodGroup.add(banana);
    }
}

function stone(){
  if (frameCount % 300 === 0){
    obstacle = createSprite(400,330,1,1);
    obstacle.addImage("stone",obstaceImage);
    obstacle.scale = 0.3;
    obstacle.velocityX = -4;
    obstacleGroup.add(obstacle);
  }
}