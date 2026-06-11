class World {
  character = new Character();
  healthBarPepe = new StatusBar();
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
    this.character.drawOnCanvas(this.ctx, this.character);
    this.checkCollisionsWithChickens();

    //Chickens
    this.jumpOnChickens();
    this.level.enemies.forEach((enemy) => {
      enemy.update();
    });
    this.level.enemies.forEach((enemy) => {
      enemy.drawOnCanvas(this.ctx, enemy);
    });

    //Endboss
    this.level.endboss.update();
    this.level.endboss.drawOnCanvas(this.ctx, this.level.endboss);

    //camera reset
    this.ctx.restore();

    //draw Statusbar
    this.healthBarPepe.drawStatusBar(
      this.ctx,
      this.healthBarPepe.PEPE_HEALTH_BAR_IMAGES,
      this.character.health,
    );

    let self = this;
    requestAnimationFrame(() => self.draw());
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
        } else {
          this.character.hit();
        }
      }
    });
  }
}
