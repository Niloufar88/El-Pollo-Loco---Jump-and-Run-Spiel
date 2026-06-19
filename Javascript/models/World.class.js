class World {
  character = new Character();
  healthBarPepe = new StatusBar();
  bottleBar = new StatusBar();
  coinBar = new StatusBar();
  bossHealthBar = new StatusBar();
  audioManager;
  level = level1;
  img;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  worldEndX = this.level.level_end_x;
  isGameRunning = true;

  constructor(canvas, keyboard, audioManager) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.audioManager = audioManager;

    this.setWorldForPepe();
    this.draw();
  }

  setWorldForPepe() {
    this.character.world = this;
  }

  draw() {
    if (!this.isGameRunning) return;
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
    this.applyCharacterDeadSound();
    this.pepeInLongIdleMode();

    //Chickens
    this.checkCollisionsWithChickens();
    this.level.enemies.forEach((enemy) => {
      enemy.update();
      enemy.drawOnCanvas(this.ctx, enemy);
    });
    this.applyWalkingSound();

    //Bottles
    this.checkCollisionBottles();
    this.level.bottles.forEach((bottle) => {
      bottle.updateBottle();
      if (!bottle.isCollected) bottle.drawOnCanvas(this.ctx, bottle);
    });

    //throwable Bottles
    this.throwableBottles();
    this.level.thrownBottles.forEach((thrownBottle) => {
      thrownBottle.throwUpdate();
      thrownBottle.drawOnCanvas(this.ctx, thrownBottle);
    });

    //Coins
    this.checkCollisionsCoins();
    this.level.coins.forEach((coin) => {
      coin.updateCoins();
      if (!coin.isCollected) coin.drawOnCanvas(this.ctx, coin);
    });

    //Endboss
    this.level.endboss.update(this.character);
    this.level.endboss.drawOnCanvas(this.ctx, this.level.endboss);
    this.checkCollisionWithBoss(this.level.endboss.damage);
    this.filterThrownBottles();
    this.CheckPepeCollisionWithBoss();
    this.applyBossSounds();

    //camera reset
    this.ctx.restore();

    //======== draw Statusbars ========
    this.drawBarsOnCanvas();
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
        this.character.collisionHeight;
      let chickenMiddle = enemy.y + enemy.offsetY + enemy.collisionHeight / 2;

      if (this.character.isColliding(enemy)) {
        if (pepeFeet < chickenMiddle && this.character.speedY > 0) {
          enemy.die();
          if (!this.audioManager.isMuted)
            this.audioManager.soundEffects.hit.play();
        } else if (!this.character.isInvincible && !enemy.isDead) {
          this.character.hit();

          if (!this.audioManager.isMuted)
            this.audioManager.soundEffects.hurt.play();
        }
      }
    });
  }

  checkCollisionBottles() {
    this.level.bottles.forEach((bottle) => {
      if (!bottle.isCollected && this.character.isColliding(bottle)) {
        bottle.collected();
        this.character.bottlesCollected++;
        if (!this.audioManager.isMuted)
          this.audioManager.soundEffects.bottles.play();
      }
    });
  }

  checkCollisionsCoins() {
    this.level.coins.forEach((coin) => {
      if (!coin.isCollected && this.character.isColliding(coin)) {
        coin.collected();
        this.character.coinsCollected++;

        if (!this.audioManager.isMuted)
          this.audioManager.soundEffects.coins.play();
      }
    });
  }

  checkCollisionWithBoss(damage) {
    this.level.thrownBottles.forEach((thrownBottle) => {
      if (
        !this.level.endboss.isDead &&
        thrownBottle.isColliding(this.level.endboss)
      ) {
        this.level.endboss.hurt(damage);
        thrownBottle.hasHit = true;

        if (!this.audioManager.isMuted) {
          this.audioManager.soundEffects.break.currentTime = 0;
          this.audioManager.soundEffects.break.play();
        }
      }
    });
  }

  CheckPepeCollisionWithBoss() {
    if (
      this.level.endboss.isColliding(this.character) &&
      !this.character.isDead
    ) {
      if (!this.character.isInvincible) {
        this.character.hit();
        if (!this.audioManager.isMuted)
          this.audioManager.soundEffects.hurt.play();
      }
    }
  }

  drawCoinBarOnCanvas() {
    this.coinBar.drawCollectableBar(
      this.ctx,
      this.coinBar.COINS_BAR_IMAGES,
      this.level.coins.length,
      this.character.coinsCollected,
      100,
    );
  }

  drawBottleBarOnCanvas() {
    this.bottleBar.drawCollectableBar(
      this.ctx,
      this.bottleBar.BOTTLES_BAR_IMAGES,
      this.level.bottles.length,
      this.character.bottlesCollected,
      50,
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

  drawBossHealthBarOnCanvas() {
    let distance = Math.abs(this.level.endboss.x - this.character.x);

    if (distance <= 500) {
      this.bossHealthBar.drawStatusBar(
        this.ctx,
        this.bossHealthBar.BOSS_HEALTH_BAR_IMAGES,
        this.level.endboss.health,
        400,
      );
    }
  }

  drawBarsOnCanvas() {
    //pepe health bar
    this.drawPepeHealthBarOnCanvas();

    //collected bottles bar
    this.drawBottleBarOnCanvas();

    //collected Coins Bar
    this.drawCoinBarOnCanvas();

    //Boss health bar
    this.drawBossHealthBarOnCanvas();
  }

  throwableBottles() {
    if (this.keyboard.THROW && this.character.bottlesCollected > 0) {
      if (Date.now() - this.character.lastThrowTime > 500) {
        let bottleDirection = this.character.otherDirection ? -1 : 1;
        let bottleX = this.character.x + this.character.offsetX + 50;
        let bottleY = this.character.y + this.character.offsetY + 50;

        this.level.thrownBottles.push(
          new ThrowableBottles(bottleX, bottleY, bottleDirection),
        );
        if (!this.audioManager.isMuted) {
          this.resetBeforePlay(this.audioManager.soundEffects.throw);
        }
        this.character.bottlesCollected--;
        this.keyboard.THROW = false;
        this.character.lastThrowTime = Date.now();
      }
    }
  }

  resetBeforePlay(soundName) {
    soundName.currentTime = 0;
    soundName.play();
  }

  filterThrownBottles() {
    this.level.thrownBottles = this.level.thrownBottles.filter(
      (bottle) => !bottle.hasHit && bottle.x > -100 && bottle.y < 420,
    );
  }

  applyWalkingSound() {
    if (!this.audioManager.isMuted) {
      if (
        (this.keyboard.RIGHT || this.keyboard.LEFT) &&
        !this.character.isJumping
      )
        this.audioManager.soundEffects.walk.play();
      else this.audioManager.soundEffects.walk.pause();
    }
  }

  applyBossSounds() {
    if (this.level.endboss.isDead && !this.level.endboss.isPlayingDeadSound) {
      this.level.endboss.pepeWon = true;
      if (!this.audioManager.isMuted) {
        this.audioManager.soundEffects.bossDead.play();
        this.level.endboss.isPlayingDeadSound = true;
        setTimeout(() => {
          this.level.endboss.isPlayingDeadSound = false;
          this.stopGame();
          showWinScreen();
        }, 1000);
        return;
      }
    } else if (this.level.endboss.isAttacking && !this.audioManager.isMuted) {
      if (!this.level.endboss.isPlayingGrowlSound) {
        this.audioManager.soundEffects.bossGrowl.play();
        this.level.endboss.isPlayingGrowlSound = true;
      } else {
        this.level.endboss.isPlayingGrowlSound = false;
      }
    }
  }

  applyCharacterDeadSound() {
    if (this.character.isDead && !this.character.playingDeathSound) {
      this.character.pepeLost = true;
      if (!this.audioManager.isMuted) {
        this.audioManager.soundEffects.pepeDead.play();
        this.character.playingDeathSound = true;
        setTimeout(() => {
          this.character.playingDeathSound = false;
          this.stopGame();
          showLoseScreen();
        }, 1000);
        return;
      }
    }
  }

  pepeInLongIdleMode() {
    if (this.character.longIdleAnimationPlaying && !this.audioManager.isMuted) {
      if (this.audioManager.soundEffects.snoring.paused) {
        this.audioManager.soundEffects.game.pause();
        this.audioManager.soundEffects.snoring.currentTime = 0;
        this.audioManager.soundEffects.snoring.volume = 0.3;
        this.audioManager.soundEffects.snoring.play();
      }
    } else if (!this.character.longIdleAnimationPlaying) {
      if (!this.audioManager.soundEffects.snoring.paused) {
        this.audioManager.soundEffects.snoring.pause();
        this.audioManager.soundEffects.snoring.currentTime = 0;
        this.audioManager.soundEffects.game.play();
      }
    }
  }

  stopGame() {
    this.isGameRunning = false;
  }

  resetProperties() {
    this.character.reset();
    this.level.reset();
  }
}
