class MovableObject extends DrawableObjects {
  speedX = 0.15;

  //Animation
  lastAnimationType = null;
  currentImage = 0;
  lastFrameTime = 0;

  //states
  isDead = false;
  otherDirection = false;

  moveLeft() {
    setInterval(() => {
      this.x -= this.speedX;
    }, 1000 / 60);
  }

  playAnimation(images, speed) {
    if (this.lastAnimationType !== images) {
      this.currentImage = 0;
      this.lastAnimationType = images;
    }
    let now = Date.now();
    let timeSinceLastFrame = now - this.lastFrameTime;

    if (timeSinceLastFrame >= speed) {
      let index = this.currentImage % images.length;
      this.img = this.imageCache[images[index]];
      this.currentImage++;
      this.lastFrameTime = now;
    }
  }

  die() {
    this.isDead = true;
  }
}
