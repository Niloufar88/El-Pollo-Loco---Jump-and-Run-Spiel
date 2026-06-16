class Chicken extends MovableObject {
  constructor() {
    super();

    //Position and Size
    let isSmall = Math.random() < 0.5;
    this.x = 400 + Math.random() * 2500;
    this.y = isSmall ? 365 : 345;
    this.width = isSmall ? 50 : 75;
    this.height = isSmall ? 50 : 75;
    this.speedX = isSmall
      ? 0.3 + Math.random() * 0.15
      : 0.2 + Math.random() * 0.15;

    //size of Collision Box
    this.collisionWidth = isSmall ? 40 : 60;
    this.collisionHeight = isSmall ? 40 : 60;
    this.offsetX = (this.width - this.collisionWidth) / 2;
    this.offsetY = (this.height - this.collisionHeight) / 2;

    //Animation
    this.AnimationSpeed = 100;
    this.deadSpeed = 100;

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

    this.CHICKEN_DEAD = isSmall
      ? "assets/img/enemies/chicken small dead/dead.png"
      : "assets/img/enemies/chicken normal dead/dead0.png";

    this.loadImage(this.CHICKEN_WALK[0]);
    this.loadImages(this.CHICKEN_WALK);
    this.loadImages([this.CHICKEN_DEAD]);

    this.moveLeft();
  }

  update() {
    if (this.isDead) this.playAnimation([this.CHICKEN_DEAD], this.deadSpeed);
    if (!this.isDead) {
      this.moveLeft();
      this.playAnimation(this.CHICKEN_WALK, this.AnimationSpeed);
    }
  }

  die() {
    if (this.isDead) return;

    super.die();
    this.speedX = 0;

    setTimeout(() => {
      this.remove = true;
    }, 500);
  }
}
