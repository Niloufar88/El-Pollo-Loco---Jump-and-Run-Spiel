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

  isColliding(other) {
    let thisLeft = this.x + (this.offsetX || 0);
    let thisRight = thisLeft + (this.collisionWidth || this.width);
    let thisTop = this.y + (this.offsetY || 0);
    let thisBottom = thisTop + (this.collisionHeight || this.height);

    let otherLeft = other.x + (other.offsetX || 0);
    let otherRight = otherLeft + (other.collisionWidth || other.width);
    let otherTop = other.y + (other.offsetY || 0);
    let otherBottom = otherTop + (other.collisionHeight || other.height);

    return (
      thisLeft < otherRight &&
      thisRight > otherLeft &&
      thisBottom > otherTop &&
      thisTop < otherBottom
    );
  }

  die() {
    this.isDead = true;
  }
}
