class Bush {
    constructor(x, y, scaleFactor){
        this.x = x;
        this.y = y;
        this.image = loadImage("assets/bush1.png");
        this.bush = createSprite(x, y);
        this.bush.addImage(this.image);
        this.bush.scale = scaleFactor;
        
    }

   
}