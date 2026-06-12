class ThrowableBottles extends MovableObject {
  //state
  hasThrown = false;

  constructor() {
    super();

    //Throw Speed
    this.speedX = 0;
    this.speedY = -20;

    //Animation Speed
    this.rotationSpeed = 200;

    //images Array
    this.THROWABLE_BOTTLE_IMAGES = [
      "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    //load Images into ImageCache
    this.loadImage(this.THROWABLE_BOTTLE_IMAGES[0]);
    this.loadImages(this.THROWABLE_BOTTLE_IMAGES);
  }

  updateThrowableBottles() {
    this.playAnimation(this.THROWABLE_BOTTLE_IMAGES, this.rotationSpeed);
  }

  throw() {
    if (!this.hasThrown) {
    }
  }
}
