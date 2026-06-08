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
