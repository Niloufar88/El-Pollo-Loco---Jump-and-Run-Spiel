class CollectableObjects extends DrawableObjects {
  //state
  isCollected = false;

  constructor() {
    super();
  }

  collected() {
    this.isCollected = true;
  }

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
