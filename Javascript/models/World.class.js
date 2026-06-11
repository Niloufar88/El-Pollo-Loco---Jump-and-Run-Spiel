class World {
  character = new Character();
  level = level1;
  img;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  worldEndX = this.level.level_end_x;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorldForPepe();
    this.draw();
  }

  setWorldForPepe() {
    this.character.world = this;
  }

  draw() {
    //clearing the canvas before drawing the next frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Camera
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);

    //Background Layers
    this.drawInLoop(this.level.backgroundObjects, 3);

    //Clouds
    this.drawInLoop(this.level.clouds, 3);

    //Character
    this.character.updateCharacter();
    this.drawOnCanvas(this.character);
    this.checkCollisionsWithChickens();

    //Chickens
    this.jumpOnChickens();
    this.level.enemies.forEach((enemy) => {
      enemy.update();
    });
    this.drawObjectsOnCanvas(this.level.enemies);

    //Endboss
    this.level.endboss.update();
    this.drawOnCanvas(this.level.endboss);

    //camera reset
    this.ctx.restore();

    let self = this;
    requestAnimationFrame(() => self.draw());
  }

  //draw mehrere Objekte auf Canvas
  drawObjectsOnCanvas(objects) {
    objects.forEach((obj) => {
      this.drawOnCanvas(obj);
    });
  }

  // draw einzelnes Objekt auf Canvas
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
    this.drawCollisionBox(object);
    this.drawCollisionBoxWithOffset(object);
  }

  //wenn Character andere Richtung schaut, wird das Bild gespiegelt
  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.x + object.width, object.y);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(object.img, 0, 0, object.width, object.height);
    this.ctx.restore();
  }

  // um Background Layers und clouds mehrmals hintereinander zeichnen
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

  // draw Kollionboxen für die Methode isColliding
  drawCollisionBox(object) {
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(object.x, object.y, object.width, object.height);
  }

  //draw CollisionBox with Offsets
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

  checkCollisionsWithChickens() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (!this.character.isInvincible) {
          this.character.health -= 10;
          this.character.hit();
        }
      }
    });
  }

  jumpOnChickens() {
    this.level.enemies.forEach((enemy) => {
      let pepeFeet =
        this.character.y +
        this.character.offsetY +
        (this.character.collisionHeight || this.character.height);
      let chickenMiddle =
        (enemy.y + enemy.offsetY + (enemy.collisionHeight || enemy.height)) / 2;

      if (this.character.isColliding(enemy)) {
        if (pepeFeet < chickenMiddle) {
          enemy.die();
          console.log(`${enemy} is dead.`);
        } else {
          this.character.hit();
          console.log(`${this.character} is dead.`);
        }
      }
    });
  }
}
