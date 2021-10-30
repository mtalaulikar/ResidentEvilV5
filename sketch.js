var bg,bgImg;
var player,playerImg; 
var zombie, zombieImg;

//var heart,heartImg;

var zombieGroup;
var bush1,bush1Img;
var bush2, bush3, bush4
var zombieGroup;
var zombies = [];
var score = 0;
var animalCount = 5;
function preload(){
  
  tree1Img = loadImage("assets/tree6.png")
  
  zombieImg = loadImage("assets/zombie.png")

 
  playerImg = loadImage("assets/player.png")

  bush1Img = loadImage("assets/bush1.png");
  stevanImgStandingF = loadAnimation("assets/boy/f1.png");
  stevanImgStandingB = loadAnimation("assets/boy/b1.png");
 
  
  stevanImgFront = loadAnimation("assets/boy/f1.png","assets/boy/f3.png","assets/boy/f4.png",
  "assets/boy/f5.png","assets/boy/f6.png","assets/boy/f7.png","assets/boy/f8.png" )
  stevanImgBack = loadAnimation("assets/boy/b1.png","assets/boy/b2.png","assets/boy/b3.png","assets/boy/b4.png",
  "assets/boy/b5.png","assets/boy/b6.png","assets/boy/b7.png","assets/boy/b8.png" )
  
  stevanImgRight = loadAnimation("assets/boy/s1.png","assets/boy/s2.png","assets/boy/s3.png","assets/boy/s4.png",
  "assets/boy/s5.png","assets/boy/s6.png","assets/boy/s7.png","assets/boy/s8.png", "assets/boy/s9.png",
  "assets/boy/s10.png", "assets/boy/s11.png" )
  stevanImgLeft = loadAnimation("assets/boy/l1.png","assets/boy/l2.png","assets/boy/l3.png","assets/boy/l4.png",
  "assets/boy/l5.png","assets/boy/l6.png","assets/boy/l7.png","assets/boy/l8.png", "assets/boy/l9.png",
  "assets/boy/l10.png", "assets/boy/l11.png" );

  chickenImage = loadAnimation("assets/other/chiken1.png","assets/other/chiken2.png","assets/other/chiken3.png",
  "assets/other/chiken4.png","assets/other/chiken5.png","assets/other/chiken6.png","assets/other/chiken7.png" );

  DeerImage = loadAnimation("assets/other/Deer0.png","assets/other/Deer1.png","assets/other/Deer2.png","assets/other/Deer3.png",
  "assets/other/Deer4.png","assets/other/Deer5.png","assets/other/Deer6.png")

  RabbitImage = loadAnimation("assets/other/Rabbit0.png","assets/other/Rabbit1.png","assets/other/Rabbit2.png","assets/other/Rabbit3.png","assets/other/Rabbit4.png"
  ,"assets/other/Rabbit5.png","assets/other/Rabbit6.png","assets/other/Rabbit7.png");
  bombImage = loadImage("assets/bomb.png");
  //coinImage = loadAnimation()

  bombBurst = loadSound("assets/sounds/bombBurst.wav")

 gameState = "PLAY";
}

function setup() {
  createCanvas(windowWidth,windowHeight);
   //create Player
   stevan = createSprite(800,height/2);
   stevan.addAnimation("StevanF", stevanImgStandingF);
   stevan.addAnimation("StevanB", stevanImgStandingB);

   stevan.addAnimation("StevanFront", stevanImgFront);
   stevan.addAnimation("StevanBack", stevanImgBack);
   stevan.addAnimation("StevanRight", stevanImgRight);
   stevan.addAnimation("StevanLeft", stevanImgLeft);
   stevan.scale = 0.3
   stevan.debug = true;

  //create bushes
  bush1 = new Bush(150,400,0.06);
  barb1 = new Bar(150,bush1.y+40,100,10);
  
  bush2 = new Bush(300,100,0.03);
  barb2 = new Bar(300,bush2.y+20,70,10);

  bush3 = new Bush(770,500,0.09);
  barb3 = new Bar(770,bush3.y+40,150,10);
  
  bush4 = new Bush(1200,80,0.03);
  barb4 = new Bar(1200,bush4.y+12,50,10);

  bush5 = new Bush(1100,500,0.15);
  
  // create Trees
   tree1 = new Tree(100,50,0.3);
   tree2 = new Tree(1000,150,0.4);
   tree3 = new Tree(600,300,0.7);

   chicken1 = createSprite(100,300);
   chicken1.addAnimation("Chicken",chickenImage);
   chicken1.scale = 0.25
   chicken2 = createSprite(374,534);
   chicken2.addAnimation("Chicken",chickenImage);
   chicken2.scale = 0.4

  deer1 = createSprite(324,197);
  deer1.addAnimation("Deer",DeerImage);
  deer1.scale = 0.8;


  deer2 = createSprite(86,525);
  deer2.addAnimation("Deer",DeerImage);
  deer2.scale = 1.4;

  rabbit1 = createSprite(424,363);
  rabbit1.addAnimation("Rabbit",RabbitImage);
  rabbit1.scale = 0.3;


  zombieGroup = new Group();
  bombGroup = new Group();
  
  edges = createEdgeSprites();
  

}

function draw(){
  background(66, 70, 33);
  textSize(20);
  fill("red");
  text(mouseX + ", " + mouseY, 200,100);
 if (gameState === "PLAY"){
    if(keyDown(DOWN_ARROW)){
      stevan.changeAnimation("StevanFront", stevanImgFront);
      stevan.y +=7;
      stevan.scale = stevan.scale + 0.002
    }

    if(keyDown(UP_ARROW)){
      stevan.changeAnimation("StevanBack", stevanImgBack);
      stevan.y -=7;
      stevan.scale = stevan.scale - 0.002
    }

    if(keyDown(RIGHT_ARROW)){
        stevan.changeAnimation("StevanRight", stevanImgRight);
        stevan.x +=7; 
    }

    if(keyDown(LEFT_ARROW)){
      stevan.changeAnimation("StevanLeft", stevanImgLeft);
      stevan.x -=7;
    }
    
    if(keyWentUp(DOWN_ARROW)|| keyWentUp(LEFT_ARROW) || keyWentUp(RIGHT_ARROW)){
      stevan.changeAnimation("StevanF", stevanImgStandingF);
    }
    
    if(keyWentUp(UP_ARROW)){
      stevan.changeAnimation("StevanB", stevanImgStandingB);
    }
    
    if(frameCount % 60 === 0){
      createZombies();
    }
    

    if(keyWentDown("D")){
      shootBomb();
      bomb.velocityX = 14;
    }

    if(keyWentDown("A")){
      shootBomb();
      bomb.velocityX = -14;
    }

  if(keyWentDown("W")){
      shootBomb();
      bomb.velocityY = -14;
    }

    if(keyWentDown("S")){
      shootBomb();
      bomb.velocityY = 14;
    }
    for(var i = 0; i < zombieGroup.length; i++){
      if(zombieGroup.get(i).isTouching(bombGroup)){
        zombieGroup.get(i).destroy();
        bombGroup.destroyEach();
        bombBurst.play();
        score = score+1;
      }
    }
    for(var i = 0; i < zombieGroup.length; i++){
      if(zombieGroup.get(i).isTouching(stevan)){
        gameState = "Over";
        reset();
      }
    }
    for(var i = 0; i < zombieGroup.length; i++){
      if(zombieGroup.get(i).isTouching(chicken1)){
        chicken1.destroy();
        animalCount = animalCount-1;
      }
    }
    for(var i = 0; i < zombieGroup.length; i++){
      if(zombieGroup.get(i).isTouching(chicken2)){
        chicken2.destroy();
        animalCount = animalCount-1;
      }
    }
    for(var i = 0; i < zombieGroup.length; i++){
      if(zombieGroup.get(i).isTouching(deer1)){
        deer1.destroy();
        animalCount = animalCount-1;
      }
    }
     for(var i = 0; i < zombieGroup.length; i++){
      if(zombieGroup.get(i).isTouching(rabbit1)){
        rabbit1.destroy();
        animalCount = animalCount-1;
      }
    }
    if (animalCount === 0){
      
    }

   
 }
  
 

  drawSprites();
}

function reset(){

}

function createZombies(){
    zombie  = createSprite(10,10,10,10);
    zombie.addImage(zombieImg);
    zombie.scale = 0.07;
    zombie.x = width + 10;
    zombie.y = Math.round(random(100, height-100));
    zombie.velocityX = - (5 + score/100);
    zombie.debug = true;
    zombie.setCollider("rectangle", 0,0, 400, 900);
    zombie.lifetime = zombie.velocityX / width;
    zombieGroup.add(zombie);

    
}

function shootBomb(){
  bomb  = createSprite(stevan.x, stevan.y, 5,5);
  bomb.addImage(bombImage);
  bomb.scale = 0.01;
  bombGroup.add(bomb);
  
}
