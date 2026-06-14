class ThrowableBottles extends MovableObject {
  //state
  hasThrown = false;

  constructor(x, y, direction) {
    super();

    //size
    this.width = 50;
    this.height = 50;

    //Throw Speed
    this.speedX = 0;
    this.speedY = -20;

    //gravity
    this.gravity = 2;

    //Animation Speed
    this.rotationSpeed = 200;

    //state
    // this.hasHit = false;

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

    this.updateThrowableBottles();
  }

  updateThrowableBottles() {
    this.throw();
  }

  throw() {
    // if (!this.hasHit)
    this.playAnimation(this.THROWABLE_BOTTLE_IMAGES, this.rotationSpeed);
    this.throwPhysic();
  }

  throwPhysic(direction) {
    setInterval(() => {
      this.x += this.speedX * direction;
      this.y += this.speedY;
      this.speedY += this.gravity;
    }, 1000 / 60);
  }
}
