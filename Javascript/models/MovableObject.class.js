class MovableObject extends DrawableObjects {
  speedX = 0.15;

  //states
  isDead = false;
  otherDirection = false;
  health;

  //Animation
  lastAnimationType = null;

  //play Animation
  playAnimation(images, speed, oneTime = false) {
    if (this.lastAnimationType !== images) {
      this.currentImage = 0;
      this.lastAnimationType = images;
    }
    let now = Date.now();
    let timeSinceLastFrame = now - this.lastFrameTime;

    if (timeSinceLastFrame >= speed) {
      let index;
      if (oneTime && this.currentImage >= images.length - 1) {
        index = images.length - 1;
      } else {
        index = this.currentImage % images.length;
        this.currentImage++;
      }
      this.img = this.imageCache[images[index]];
      this.lastFrameTime = now;
    }
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  die() {
    this.isDead = true;
  }
}
