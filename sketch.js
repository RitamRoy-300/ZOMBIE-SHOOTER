var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup;
var bullet, bulletGroup;
var heart1, heart1Img, heart2, heart2Img, heart3, heart3Img;
var life = 3;
var score = 0;
var bullets = 50;
var gameState = "fight";


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");

  bgImg = loadImage("assets/bg.jpeg");
  zombieImg = loadImage("assets/zombie.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   //player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   zombieGroup = new Group();
   bulletGroup = new Group();

   //creating Lives sprites
   heart1 = createSprite(1200,40,20,20);
   heart1.addImage("heart1",heart1Img);
   heart1.scale = 0.3;
   heart1.visible = false;
   
   heart2 = createSprite(1250,40,20,20);
   heart2.addImage("heart2",heart2Img);
   heart2.scale = 0.3;
   heart2.visible = false;

   heart3 = createSprite(1300,40,20,20);
   heart3.addImage("heart3",heart3Img);
   heart3.scale = 0.3;
   


}

function draw() {
  background(0);
  
  if(gameState === "fight"){

    if(life === 3){
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
    }
    if(life === 2){
      heart2.visible = true;
      heart3.visible = false;
      heart1.visible = false;
    }
    if(life === 1){
      heart1.visible = true;
      heart2.visible = false;
      heart3.visible = false;
    }
    if(life === 0){
      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = false;
      gameState = "lost";
    }
    if(score === 100){
      gameState="won";
    }

        //moving the player up and down and making the game mobile compatible using touches
    if(keyDown("UP_ARROW")||touches.length>0){
      player.y = player.y-30
    }
    if(keyDown("DOWN_ARROW")||touches.length>0){
    player.y = player.y+30
    }

    //release bullets and change the image of shooter to shooting position when space is pressed
    if(keyWentDown("space")){
    
      player.addImage(shooter_shooting)
      bullet = createSprite(player.x+50, player.y-30, 20, 10);
      bullet.velocityX = 20;
      bulletGroup.add(bullet);
      bullet.lifetime = 800;
      bullets = bullets-1; 
    }

    //player goes back to original standing image once we stop pressing the space bar
    else if(keyWentUp("space")){
      player.addImage(shooterImg)
    }

    if(bullets===0){
      gameState="bulletsOver";

    }

    if(zombieGroup.isTouching(bulletGroup)){
      for(var i =0; i<zombieGroup.length; i++){
        if(zombieGroup[i].isTouching(bulletGroup)){
          bulletGroup.destroyEach();
          zombieGroup[i].destroy();
          score = score+2;
        }
      }
    }

    if(zombieGroup.isTouching(player)){
      for(var i =0; i<zombieGroup.length; i++){
        if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy();
          life = life-1;
        }
      }

    }

    enemy();

  }

  drawSprites();


  textSize(25);
  fill("white");
  text("Bullets- "+bullets,displayWidth-500,30);
  text("Score- "+score,displayWidth-500,50);
  text("Lives- "+life,displayWidth-500,70);

  if(gameState === "lost"){
    textSize(100);
    fill("red");
    text("Game over!",470,400);
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();
  }
  
 else if(gameState === "bulletsOver"){
  textSize(100);
  fill("red");
  text("You ran out of bullets!",470,400);
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();
  }

  else if(gameState === "won"){
    textSize(100);
    fill("yellow");
    text("You won the game . now go home!",470,400);
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();
  }

}

function enemy(){
  if(frameCount%100 === 0){
    zombie = createSprite(1200,500,50,50);
    zombie.y = Math.round(random(400, 800));
    zombie.addImage(zombieImg);
    zombie.velocityX = -2;
    zombie.scale = 0.18;
    zombie.lifetime = 400;
    zombieGroup.add(zombie);
  }
 
}
