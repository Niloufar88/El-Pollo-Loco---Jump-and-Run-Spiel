class MovableObject {
  x = 100;
  y = 100;
  width = 80;
  height = 100;
  speedX = 0.15;
  img;

  //Image Cache
  imageCache = {};

  //Animation
  lastAnimationType = null;
  currentImage = 0;
  lastFrameTime = 0;

  //states
  isDead = false;
  otherDirection = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(images) {
    images.forEach((path) => {
      let img = new Image();
      img.onload = () => {};
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speedX;
    }, 1000 / 60);
  }

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
}
