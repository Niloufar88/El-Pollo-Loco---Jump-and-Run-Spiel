class DrawableObjects {
  //Position and size
  x;
  y;
  width;
  height;

  //Image Cache
  imageCache = {};

  constructor() {}

  //a Method to load a single image into the imageCache and set it as the current image
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
    this.imageCache[path] = this.img;
  }

  //a Method to load an Array of images into the imageCache
  loadImages(images) {
    images.forEach((path) => {
      let img = new Image();
      img.onload = () => {};
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  // draw a border for an Object on canvas based on real Postion and size
  drawCollisionBox(object) {
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(object.x, object.y, object.width, object.height);
  }

  //draw a border for an Object on canvas based on Collision Box Position and size
  drawCollisionBoxWithOffset(object) {
    let boxX = object.x + (object.offsetX || 0);
    let boxY = object.y + (object.offsetY || 0);

    this.ctx.strokeStyle = "green";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(
      boxX,
      boxY,
      object.collisionWidth,
      object.collisionHeight,
    );
  }

  //the Method to check if two objects are colliding
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
}
