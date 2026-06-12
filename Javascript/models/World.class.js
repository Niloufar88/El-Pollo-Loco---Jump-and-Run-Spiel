class World {
  character = new Character();
  healthBarPepe = new StatusBar();
  bottleBar = new StatusBar();
  coinBar = new StatusBar();
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

    //draw Background Layers on canvas
    this.drawInLoop(this.level.backgroundObjects, 3);

    //draw Clouds on canvas
    this.drawInLoop(this.level.clouds, 3);

    //Character

    this.character.updateCharacter();
    this.character.drawOnCanvas(this.ctx, this.character);

    //Chickens
    this.checkCollisionsWithChickens();
    this.level.enemies.forEach((enemy) => {
      enemy.update();
      enemy.drawOnCanvas(this.ctx, enemy);
    });

    //Bottles
    this.checkCollisionBottles();
    this.level.bottles.forEach((bottle) => {
      bottle.updateBottle();
      if (!bottle.isCollected) bottle.drawOnCanvas(this.ctx, bottle);
    });

    //Coins
    this.checkCollisionsCoins();
    this.level.coins.forEach((coin) => {
      coin.updateCoins();
      if (!coin.isCollected) coin.drawOnCanvas(this.ctx, coin);
    });

    //Endboss
    this.level.endboss.update();
    this.level.endboss.drawOnCanvas(this.ctx, this.level.endboss);

    //camera reset
    this.ctx.restore();

    //======== draw Statusbars ========
    //pepe health bar
    this.drawPepeHealthBarOnCanvas();

    //collected bottles bar
    this.drawBottleBarOnCanvas();

    //collected Coins Bar
    this.drawCoinBarOnCanvas();

    //=================================

    let self = this;
    requestAnimationFrame(() => self.draw());
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.remove);
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
      let pepeFeet =
        this.character.y +
        this.character.offsetY +
        (this.character.collisionHeight || this.character.height);
      let chickenMiddle =
        (enemy.y + enemy.offsetY + (enemy.collisionHeight || enemy.height)) / 2;

      if (!enemy.isDead && this.character.isColliding(enemy)) {
        if (pepeFeet < chickenMiddle) {
          enemy.die();
        } else if (!this.character.isInvincible) {
          this.character.hit();
        }
      }
    });
  }

  checkCollisionBottles() {
    this.level.bottles.forEach((bottle) => {
      if (!bottle.isCollected && this.character.isColliding(bottle)) {
        bottle.collected();
        this.character.bottlesCollected++;
      }
    });
  }

  checkCollisionsCoins() {
    this.level.coins.forEach((coin) => {
      if (!coin.isCollected && this.character.isColliding(coin)) {
        coin.collected();
        this.character.coinsCollected++;
      }
    });
  }

  drawCoinBarOnCanvas() {
    this.coinBar.drawCollectableBar(
      this.ctx,
      this.coinBar.COINS_BAR_IMAGES,
      this.level.coins.length,
      this.character.coinsCollected,
      110,
    );
  }

  drawBottleBarOnCanvas() {
    this.bottleBar.drawCollectableBar(
      this.ctx,
      this.bottleBar.BOTTLES_BAR_IMAGES,
      this.level.bottles.length,
      this.character.bottlesCollected,
      60,
    );
  }

  drawPepeHealthBarOnCanvas() {
    this.healthBarPepe.drawStatusBar(
      this.ctx,
      this.healthBarPepe.PEPE_HEALTH_BAR_IMAGES,
      this.character.health,
      10,
    );
  }
}
