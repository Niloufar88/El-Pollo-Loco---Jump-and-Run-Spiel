class ThrowableBottles extends MovableObject {
  //state
  hasThrown = false;

  constructor(x, y, direction) {
    super(x, y);

    this.x = x;
    this.y = y;

    //size
    this.width = 60;
    this.height = 60;

    //Throw Speed
    this.speedX = 20 * direction;
    this.speedY = -30;

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

    this.throw();
  }

  throw() {
    setInterval(() => {
      this.playAnimation(this.THROWABLE_BOTTLE_IMAGES, this.rotationSpeed);
      this.throwPhysic();
    }, 100);
  }

  throwPhysic(direction) {
    setInterval(() => {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += this.gravity;
    }, 1000 / 60);
  }
}
