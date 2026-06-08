class Chicken extends MovableObject {
  constructor() {
    super();

    let isSmall = Math.random() < 0.5;
    this.x = 400 + Math.random() * 2500;
    this.y = isSmall ? 365 : 345;
    this.width = isSmall ? 50 : 75;
    this.height = isSmall ? 50 : 75;
    this.speedX = isSmall
      ? 0.3 + Math.random() * 0.15
      : 0.2 + Math.random() * 0.15;

    //Animation
    this.AnimationSpeed = 100;

    //Image Array
    this.CHICKEN_WALK = isSmall
      ? [
          "assets/img/enemies/chicken small walk/1_w.png",
          "assets/img/enemies/chicken small walk/2_w.png",
          "assets/img/enemies/chicken small walk/3_w.png",
        ]
      : [
          "assets/img/enemies/chicken normal walk/1_w.png",
          "assets/img/enemies/chicken normal walk/2_w.png",
          "assets/img/enemies/chicken normal walk/3_w.png",
        ];

    this.loadImage(this.CHICKEN_WALK[0]);
    this.loadImages(this.CHICKEN_WALK);
  }

  update() {
    if (!this.isDead) {
      this.moveLeft();
      this.playAnimation(this.CHICKEN_WALK, this.AnimationSpeed);
    }
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  playAnimation(images, speed) {
    let now = Date.now();
    let timeSinceLastFrame = now - this.lastFrameTime;

    if (timeSinceLastFrame > speed) {
      let index = this.currentImage % images.length;
      this.img = this.imageCache[images[index]];
      this.currentImage++;
      this.lastFrameTime = now;
    }
  }
}
