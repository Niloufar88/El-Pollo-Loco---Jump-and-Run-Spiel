class World {
  character = new Character();
  enemies = level1.enemies;
  backgroundObjects = level1.backgroundObjects;
  clouds = level1.clouds;
  img;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    //clearing the canvas before drawing the next frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Camera
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);

    //Background Layers
    this.drawInLoop(this.backgroundObjects, 3);

    //Clouds
    this.drawInLoop(this.clouds, 3);

    //Character
    this.character.updateCharacter();
    this.drawOnCanvas(this.character);

    //Chickens
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
    this.drawObjectsOnCanvas(this.enemies);

    //camera reset
    this.ctx.restore();

    let self = this;
    requestAnimationFrame(() => self.draw());
  }

  drawObjectsOnCanvas(objects) {
    objects.forEach((obj) => {
      this.drawOnCanvas(obj);
    });
  }

  drawOnCanvas(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    } else {
      this.ctx.drawImage(
        object.img,
        object.x,
        object.y,
        object.width,
        object.height,
      );
    }
  }

  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.x + object.width, object.y);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(object.img, 0, 0, object.width, object.height);
    this.ctx.restore();
  }

  drawInLoop(objects, count) {
    objects.forEach((object) => {
      for (let i = 0; i < count; i++) {
        this.ctx.drawImage(
          object.img,
          object.x + i * object.width,
          object.y,
          object.width,
          object.height,
        );
      }
    });
  }
}
