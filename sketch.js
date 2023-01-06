var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var gameOverImg, restartImg, gameOver, restart;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
    
    cloudImage = loadImage("cloud.png");
    
      obstacle1 = loadImage("obstacle1.png");
      obstacle2 = loadImage("obstacle2.png");
      obstacle3 = loadImage("obstacle3.png");
      obstacle4 = loadImage("obstacle4.png");
      obstacle5 = loadImage("obstacle5.png");
      obstacle6 = loadImage("obstacle6.png");

        gameOverImg = loadImage("gameOver.png");
        restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
   trex = createSprite(50,180,20,50);
   trex.addAnimation("running", trex_running);
   trex.addAnimation("collided" , trex_collided)
   trex.scale = 0.5;
  
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;

      invisibleGround = createSprite(200,190,400,10);
      invisibleGround.visible = false;

        gameOver = createSprite(200,100);
        gameOver.addImage(gameOverImg);
        gameOver.scale = 0.5;

          restart = createSprite(200,100);
          restart.addImage(restartImg);
          restart.scale = 0.5;
    
  // crie grupos de obstaculos e nuvens 
   obstaclesGroup = new Group();
   cloudsGroup = new Group();
    
   console.log("Olá" + 5);
    
  score = 0;
}

function draw() {
  background(180);
  text("Pontuação: "+ score, 500,50);
  score = score + Math.round(frameCount/60);
  
    if(gameState === PLAY){
    
   //mover o solo
    ground.velocityX = -4;

    //gerar as nuvens
   spawnClouds();
  
   //gerar obstáculos no chão
   spawnObstacles();

   //Tirando a visibilidade
   gameOver.visible = false;
   restart.visible = false;

   if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -13;
  }
  
   trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
   ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  trex.collide(obstaclesGroup);
  
    if (trex.isTouching(obstaclesGroup)){
     gameState = END
   }
  }
 
  else if(gameState === END){
    
    //pare o solo
    ground.velocityX = 0;

    //parando a nuvem
    cloudsGroup.velocityEachX(0);
    
    //Parando os cactos
    obstaclesGroup.velocityEachX(0);

    //Colocando a visibilidade
    gameOver.visible = true;
    restart.visible = true;
  }
  
  drawSprites();
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(400,165,10,40);
    obstacle.velocityX = -6;

   
    // //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //atribua dimensão e tempo de vida aos obstáculos          
    obstaclesGroup.setlifetimeEach(-1)
   
    //adicionando obstáculos ao grupo
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
     cloud.y = Math.round(random(10,60));
     cloud.addImage(cloudImage);
     cloud.scale = 0.5;
     cloud.velocityX = -3;
    
      //atribua tempo de vida à variável
      cloudsGroup.setlifetimeEach(-1)
      
      //ajustar a profundidade
      cloud.depth = trex.depth;
      trex.depth = trex.depth + 1;
      
      //adicionando nuvens ao grupo
    cloudsGroup.add(cloud);
  }
}