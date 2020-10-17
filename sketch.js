var trex, trex_running,ground,ground_img,invisibleground;
var cloudImg;
var cloudGroup;
var obstacleGroup;
var ob1;
var ob2;
var ob3;
var ob4;
var ob5;
var ob6;
var PLAY,END,gamestate;
var restart;
var restartImg;
var gameoverImg,gameover;
var score;
var jump,die,checkpoint;

function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_img=loadImage("ground2.png");
  cloudImg=loadImage("cloud.png");
  ob1= loadImage("obstacle1.png");
  ob2= loadImage("obstacle2.png");
  ob3= loadImage("obstacle3.png");
  ob4= loadImage("obstacle4.png");
  ob5= loadImage("obstacle5.png");
  ob6= loadImage("obstacle6.png");
  restartImg= loadImage("restart.png");
  gameoverImg= loadImage("gameOver.png");
  jump= loadSound("jump.mp3");
  die= loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
}

function setup(){
  
  createCanvas(600,200);
  trex=createSprite(50,150,20,20);
  trex.addAnimation("running",trex_running);
  
  trex.scale=0.5;
  
  ground=createSprite(300,180,600,20);
  ground.addImage(ground_img);
  ground.x= ground.width/2;
  
  invisibleground=createSprite(300,190,600,5);
  invisibleground.visible=false;
  
  cloudGroup=new Group();
  obstacleGroup= new Group();
  
  PLAY=1;
  END=0;
  gamestate=PLAY;
  
  trex.setCollider ("circle",0,0,40);
  
  score=0;
  
  gameover= createSprite(300,120,20,20);
  restart = createSprite(300,150,20,20);
  restart.addImage(restartImg);
  gameover.addImage(gameoverImg);
  gameover.scale=0.5;
  restart.scale=0.5;
  gameover.visible= false;
  restart.visible= false;
}




function draw(){
  background (180);
  
  text("SCORE:"+score,400,50);   
  
  if(gamestate===PLAY){
     if(keyDown("space")&&trex.y>=164){
      trex.velocityY=-10;
       jump.play();
    } 
    trex.velocityY=trex.velocityY+0.8;
    ground.velocityX=-5;
    if(ground.x<0){
    ground.x= ground.width/2;
  }
    spawnClouds();
  spawnObstacles();
    if(trex.isTouching(obstacleGroup)){
      gamestate=END;
      die.play();
    }
    
    score=score+Math.round(getFrameRate()/60);
    if(score%100===0&&score>0){
      checkpoint.play();
    }
  }
  
  else if(gamestate===END){
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameover.visible= true;
    restart.visible=true; 
    trex.velocityY=0;  
    
    
  }
  
  if(mousePressedOver(restart)){
    reset();
  }
  
  
  
  trex.collide(invisibleground);
    
  
  
  
  drawSprites();
  
}

function reset(){
  gamestate=PLAY;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  gameover.visible= false;
  restart.visible= false;
  score=0;
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(90,120));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,160,10,40);
    //obstacle.velocityX = - (6 + 3*count/100);
    obstacle.velocityX= -6
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
   // obstacle.addAnimation("obstacle" + rand);
    switch(rand){
      case 1:obstacle.addImage(ob1);
             break;
       case 2:obstacle.addImage(ob2);
             break; 
       case 3:obstacle.addImage(ob3);
             break;
       case 4:obstacle.addImage(ob4);
             break;
      case 5:obstacle.addImage(ob5);
             break;
      case 6:obstacle.addImage(ob6);
             break;
      default:break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}


 
   
    
  
  
  


