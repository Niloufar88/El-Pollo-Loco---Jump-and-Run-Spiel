class Chicken extends MovableObject {
  constructor() {
    super();

    let isSmall = Math.random() < 0.5;
    this.x = 400 + Math.random() * 200;
    this.y = isSmall ? 375 : 360;
    this.width = isSmall ? 40 : 60;
    this.height = isSmall ? 40 : 60;
    this.speedX = isSmall ? 0.3 : 0.2;

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
    this.update();
  }

  update() {
    if (!this.isDead) {
      this.x -= this.speedX;
    }
  }
}
