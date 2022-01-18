var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bunny, bunny_running, bunny_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var carrotsGroup, carrot1, carrot2, carrot3, carrot4, carrot5, carrot6;

var score=0;

var gameOver, restart;
function preload(){
    trex_running =   loadAnimation("bunny.png","bunny_running.png","bunny_jump.png");
    trex_collided = loadAnimation("bunny_collided.png");
    
    groundImage = loadImage("ground.png");
    
    cloudImage = loadImage("cloud.png");
    
    carrot1 = loadImage("carrot_1.png");
    carrot2 = loadImage("carrot_2.png");
    carrot3 = loadImage("carrot_3.png");
    carrot4 = loadImage("carrot_4.png");
    carrot5 = loadImage("carrot_5.png");
    carrot6 = loadImage("carrot_6.png");
    
    gameOverImg = loadImage("gameover.png");
    restartImg = loadImage("restart.png");
}

function setup() {
    createCanvas(600, 200);
  
    bunny = createSprite(50,180,20,50);
    bunny.addAnimation("running", bunny_running);
    bunny.addAnimation("collided", bunny_collided);
    bunny.scale = 0.5;
    
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -(6 + 3*score/100);
    
    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(300,140);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.5;
  
    gameOver.visible = false;
    restart.visible = false;
    
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
    
    cloudsGroup = new Group();
    obstaclesGroup = new Group();
    
    score = 0;
}

function draw() {
    background(255);
    text("Score: "+ score, 500,50);
    
    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
      
    if(keyDown("space") && bunny.y >= 159) {
        bunny.velocityY = -14;
      }
    
      bunny.velocityY = bunny.velocityY + 0.8
    
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
    
      bunny.collide(invisibleGround);
      spawnClouds();
      spawnCarrots();
      
      if (score>0 && score%100 === 0){
      }
    
      if(carrotsGroup.isTouching(trex)){
        gameState = END;
          
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      //set velcity of each game object to 0
      ground.velocityX = 0;
      bunny.velocityY = 0;
      carrotsGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
      
      //change the trex animation
      bunny.changeAnimation("collided",bunny_collided);
      
      //set lifetime of the game objects so that they are never destroyed
      carrotsGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
      
      if(mousePressedOver(restart)) {
        reset();
      }
    }
    drawSprites();
  }
  
  function spawnClouds() {
    if (frameCount % 60 === 0) {
      var cloud = createSprite(600,120,40,10);
      cloud.y = Math.round(random(80,120));
      cloud.addImage(cloudImage);
      cloud.scale = 0.5;
      cloud.velocityX = -3;
      cloud.lifetime = 200;
      cloud.depth = bunny.depth;
      bunny.depth = bunny.depth + 1;
      cloudsGroup.add(cloud);
    }
    
  }
  
  function spawnCarrots() {
    if(frameCount % 60 === 0) {
      var carrot = createSprite(600,165,10,40);
      carrot.velocityX = -(6 + 3*score/100);
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: carrot.addImage(carrot1);
                break;
        case 2: carrot.addImage(carrot2);
                break;
        case 3: carrot.addImage(carrot3);
                break;
        case 4: carrot.addImage(carrot4);
                break;
        case 5: carrot.addImage(carrot5);
                break;
        case 6: carrot.addImage(carrot6);
                break;
        default: break;
      }           
      carrot.scale = 0.5;
      carrot.lifetime = 300;
      carrotsGroup.add(carrot);
    }
  }
  
  function reset(){
    gameState = PLAY;
    ground.velocityX = -(6 + 3*score/100);
    gameOver.visible = false;
    restart.visible = false;
    
    carrotsGroup.destroyEach();
    cloudsGroup.destroyEach();
    
    bunny.changeAnimation("running",bunny_running);
    
    score = 0;
    
  }  
