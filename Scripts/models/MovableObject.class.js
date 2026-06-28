class MovableObject extends DrawableObjects {
  speedX = 0.15;

  isDead = false;
  otherDirection = false;
  health;

  lastAnimationType = null;

  /**
   * @method playAnimation
   * plays the animation based on the provided images and speed
   * @param {Array} images
   * @param {Number} speed
   * @param {Boolean} oneTime
   */

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

  /**
   * @method moveLeft
   * moves the object to the left
   */
  moveLeft() {
    this.x -= this.speedX;
  }

  /**
   * @method die - sets the property to true , if the Object is dead.
   */
  die() {
    this.isDead = true;
  }
}
