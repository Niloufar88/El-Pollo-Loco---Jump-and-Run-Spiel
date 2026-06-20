/**
 * @class DrawableObjects
 * responsible for all the drawable objects in the game.
 */

class DrawableObjects {
  //Position and size
  x;
  y;
  width;
  height;
  img;

  //Image Cache
  imageCache = {};

  //Animation
  currentImage = 0;
  lastFrameTime = 0;

  /**
   * @method loadImage - to load a single image into the imageCache and set it as the current image
   * @param {String} path
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
    this.imageCache[path] = this.img;
  }

  /**
   * @method loadImages - a Method to load an Array of images into the imageCache
   * @param {Array} images
   */
  loadImages(images) {
    images.forEach((path) => {
      let img = new Image();
      img.onload = () => {};
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * @method drawObjectsOnCanvas - Draws multiple objects on the canvas
   * @param {Array} objects
   */
  drawObjectsOnCanvas(objects) {
    objects.forEach((obj) => {
      this.drawOnCanvas(this.ctx, obj);
    });
  }

  /**
   * @method drawOnCanvas - Draws a single object on the canvas
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} object
   */
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

  /**
   * @method flipImage - flips the image when character is facing the other direction
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} object
   */
  flipImage(ctx, object) {
    ctx.save();
    ctx.translate(object.x + object.width, object.y);
    ctx.scale(-1, 1);
    ctx.drawImage(object.img, 0, 0, object.width, object.height);
    ctx.restore();
  }

  /**
   * @method drawCollisionBox - Draws a border for an object on the canvas based on its real position and size
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} object
   */
  drawCollisionBox(ctx, object) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(object.x, object.y, object.width, object.height);
  }

  /**
   * @method drawCollisionBoxWithOffset - Draws a border for an object on the canvas based on its collision box position and size
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} object
   */
  drawCollisionBoxWithOffset(ctx, object) {
    let boxX = object.x + (object.offsetX || 0);
    let boxY = object.y + (object.offsetY || 0);

    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX, boxY, object.collisionWidth, object.collisionHeight);
  }

  /**
   * @method isColliding - Checks if this object is colliding with another object
   * @param {Object} other
   * @returns {boolean} - True if the objects are colliding, false otherwise
   */
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
