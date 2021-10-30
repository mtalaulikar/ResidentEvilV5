class Tree {
    constructor(x, y, scaleFactor){
        this.x = x;
        this.y = y;
        this.image = loadImage("assets/tree6.png");
        this.tree = createSprite(x, y);
        this.tree.addImage(this.image);
        this.tree.scale = scaleFactor;
    }

   
}