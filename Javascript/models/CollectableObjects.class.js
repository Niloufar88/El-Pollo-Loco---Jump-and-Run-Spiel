/**
 * @class CollectableObjects
 * @extends DrawableObjects
 * @constructor - Initializes the collectable object's state and provides methods for collection and animation.
 */
class CollectableObjects extends DrawableObjects {
  //state
  isCollected = false;

  constructor() {
    super();
  }

  /**
   * @method collected - Sets the collectable object's state to collected, which can be used to trigger accordingly for playing animation and remove from an array.
   */
  collected() {
    this.isCollected = true;
  }

  /**
   * @method playAnimation - Plays the animation for the collectable object.
   * @param {Array} images - An array of image paths for the animation frames.
   * @param {number} speed - The speed at which the animation frames should change.
   */
  playAnimation(images, speed) {
    let now = Date.now();
    let timeSinceLastFrame = now - this.lastFrameTime;

    if (timeSinceLastFrame >= speed) {
      let index = this.currentImage % images.length;
      this.img = this.imageCache[images[index]];
      this.currentImage++;
      this.lastFrameTime = now;
    }
  }
}
