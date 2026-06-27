class ThrowableBottles extends MovableObject {
  constructor(x, y, direction) {
    super(x, y);

    this.x = x;
    this.y = y;

    this.width = 60;
    this.height = 60;

    this.speedX = 3 * direction;
    this.speedY = -10;

    this.gravity = 0.2;

    this.animationTimer = 0;
    this.currentImageIndex = 0;

    this.THROWABLE_BOTTLE_IMAGES = [
      "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    this.loadImage(this.THROWABLE_BOTTLE_IMAGES[0]);
    this.loadImages(this.THROWABLE_BOTTLE_IMAGES);
  }

  /**
   * @method throwUpdate - plays the animation based on x and y postion and gravity.
   */
  throwUpdate() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.animationTimer++;
    if (this.animationTimer >= 12) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.THROWABLE_BOTTLE_IMAGES.length;
      this.img.src = this.THROWABLE_BOTTLE_IMAGES[this.currentImageIndex];
      this.animationTimer = 0;
    }
  }
}
