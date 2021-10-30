class Zombies {
    constructor(x,y,zombieImg){
        this.zombie = createSprite(x,y);
        this.zombie.addImage(zombieImg);
        this.zombie.scale = 0.07;
        this.xVel = Math.round(random(-4,4));
        this.yVel = Math.round(random(-4,4));
        if (this.xVel !== 0 && this.yVel !== 0){
            this.zombie.velocityX = this.xVel
            this.zombie.velocityY = this.yVel
        }
        else {
            this.zombie.velocityX = 1
            this.zombie.velocityY = 1
        }
        
        this.zombie.lifetime = 200;
    }

}