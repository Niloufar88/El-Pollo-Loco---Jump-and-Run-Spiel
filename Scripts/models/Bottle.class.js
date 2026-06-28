class Bottle extends CollectableObjects {
  constructor() {
    super();

    this.y = 350;
    this.width = 60;
    this.height = 80;

    this.collisionWidth = 35;
    this.collisionHeight = 55;
    this.offsetX = (this.width - this.collisionWidth) / 2;
    this.offsetY = (this.height - this.collisionHeight) / 2;

    this.x = 400 + Math.random() * 2200;

    this.rotationSpeed = 300;

    this.isCollected = false;

    this.BOTTLE_IMAGES = [
      "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
      "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];

    this.loadImage(this.BOTTLE_IMAGES[0]);
    this.loadImages(this.BOTTLE_IMAGES);
    this.updateBottle();
  }

  /**
   * @method updateBottle
   * Updates the bottle's animation based on the @property {boolean} isCollected.
   */
  updateBottle() {
    if (!this.isCollected)
      this.playAnimation(this.BOTTLE_IMAGES, this.rotationSpeed);
  }
}
