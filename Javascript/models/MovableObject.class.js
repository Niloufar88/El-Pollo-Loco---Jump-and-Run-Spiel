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
}
