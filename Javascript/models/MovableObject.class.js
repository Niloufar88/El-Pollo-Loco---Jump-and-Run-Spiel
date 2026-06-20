/**
 * @class MovableObject
 * responsible for all objects that can move and have animations
 * @extends DrawableObjects
 * @property {boolean} isDead - indicates if the object is dead
 * @property {boolean} otherDirection - indicates if the object is facing the other direction
 * @property {number} health - the health of the object
 * @property {string} lastAnimationType - the last animation type played
 */

class MovableObject extends DrawableObjects {
  speedX = 0.15;

  //states
  isDead = false;
  otherDirection = false;
  health;

  //Animation
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
