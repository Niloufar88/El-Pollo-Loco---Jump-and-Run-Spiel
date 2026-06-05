class MovableObject {
  x = 100;
  y = 100;
  width = 80;
  height = 100;
  img;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveLeft() {
    console.log("move left");
  }
}
