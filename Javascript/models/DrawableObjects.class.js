class DrawableObjects {
  //Position and size
  x;
  y;
  width;
  height;
  img;

  //Image Cache
  imageCache = {};

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

  //draw mehrere Objekte auf Canvas
  drawObjectsOnCanvas(objects) {
    objects.forEach((obj) => {
      this.drawOnCanvas(this.ctx, obj);
    });
  }

  // draw einzelnes Objekt auf Canvas
  drawOnCanvas(ctx, object) {
    if (object.otherDirection) {
      this.flipImage(ctx, object);
    } else {
      ctx.drawImage(
        object.img,
        object.x,
        object.y,
        object.width,
        object.height,
      );
    }
    this.drawCollisionBox(ctx, object);
    this.drawCollisionBoxWithOffset(ctx, object);
  }

  //wenn Character andere Richtung schaut, wird das Bild gespiegelt
  flipImage(ctx, object) {
    ctx.save();
    ctx.translate(object.x + object.width, object.y);
    ctx.scale(-1, 1);
    ctx.drawImage(object.img, 0, 0, object.width, object.height);
    ctx.restore();
  }

  // draw a border for an Object on canvas based on real Postion and size
  drawCollisionBox(ctx, object) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(object.x, object.y, object.width, object.height);
  }

  //draw a border for an Object on canvas based on Collision Box Position and size
  drawCollisionBoxWithOffset(ctx, object) {
    let boxX = object.x + (object.offsetX || 0);
    let boxY = object.y + (object.offsetY || 0);

    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX, boxY, object.collisionWidth, object.collisionHeight);
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
