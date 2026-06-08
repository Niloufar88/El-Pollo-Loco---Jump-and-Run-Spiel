class Endboss extends MovableObject {
  constructor(imagePath) {
    super();

    //Position
    this.x = 3200;
    this.y = 40;
    this.width = 400;
    this.height = 400;

    //Animation
    this.lastAnimationType = null;

    //Animation Speed
    this.alertSpeed = 250;
    this.walkSpeed = 100;
    this.attackSpeed = 110;

    //Image Arrays
    this.BOSS_ALERT = [
      "assets/img/enemies/boss chicken/2_alert/G5.png",
      "assets/img/enemies/boss chicken/2_alert/G6.png",
      "assets/img/enemies/boss chicken/2_alert/G7.png",
      "assets/img/enemies/boss chicken/2_alert/G8.png",
      "assets/img/enemies/boss chicken/2_alert/G9.png",
      "assets/img/enemies/boss chicken/2_alert/G10.png",
      "assets/img/enemies/boss chicken/2_alert/G11.png",
      "assets/img/enemies/boss chicken/2_alert/G12.png",
    ];

    this.loadImage(this.BOSS_ALERT[0]);
    this.loadImages(this.BOSS_ALERT);
  }

  update() {
    if (!this.isDead) {
      this.playAnimation(this.BOSS_ALERT, this.alertSpeed);
    }
  }

  playAnimation(images, speed) {
    if (this.lastAnimationType !== images) {
      this.currentImage = 0;
      this.lastAnimationType = images;
    }
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
