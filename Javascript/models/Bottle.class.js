class Bottle extends CollectableObjects {
  constructor() {
    super();

    //Position and Size
    this.y = 350;
    this.width = 60;
    this.height = 80;

    //Offset size
    this.collisionWidth = 35;
    this.collisionHeight = 55;
    this.offsetX = (this.width - this.collisionWidth) / 2;
    this.offsetY = (this.height - this.collisionHeight) / 2;

    //random X-Position
    this.x = 400 + Math.random() * 2200;

    //Animation Speed
    this.rotationSpeed = 300;

    //Images Array
    this.BOTTLE_IMAGES = [
      "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
      "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];

    this.loadImage(this.BOTTLE_IMAGES[0]);
    this.loadImages(this.BOTTLE_IMAGES);
    this.updateBottle();
  }

  updateBottle() {
    this.playAnimation(this.BOTTLE_IMAGES, this.rotationSpeed);
  }

  collected() {
    this.isCollected = true;
  }
}
