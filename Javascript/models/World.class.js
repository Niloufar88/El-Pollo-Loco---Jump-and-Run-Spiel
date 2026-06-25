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

  /**
   * @method setWorldForPepe -  so the world properties can be used in Character class
   */
  setWorldForPepe() {
    this.character.world = this;
  }

  /**
   * @method draw - game loop for managing all the draw and update in each frame. heart of the game.
   */
  draw() {
    if (!this.isGameRunning) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);
    this.drawBgAndCloudsOnCanvas();
    this.characterLogic();
    this.chickenLogic();
    this.bottlesLogic();
    this.throwableBottlesLogic();
    this.coinsLogic();
    this.endbossLogic();
    this.ctx.restore();
    this.drawBarsOnCanvas();
    let self = this;
    requestAnimationFrame(() => self.draw());
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.remove);
  }

  /**
   * @method drawInLoop - draw  Objects in loops on canvas.
   * @param {Array} objects
   * @param {Number} count
   */
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

  /**
   * @method drawBgAndCloudsOnCanvas - draw background objects and clouds on canvas.
   */
  drawBgAndCloudsOnCanvas() {
    this.drawInLoop(this.level.backgroundObjects, 3);
    this.drawInLoop(this.level.clouds, 3);
  }

  /**
   * @method characterLogic - handles the logic for the main character, including updates and drawing on canvas.
   */
  characterLogic() {
    this.character.updateCharacter();
    this.character.drawOnCanvas(this.ctx, this.character);
    this.applyCharacterDeadSound();
    this.pepeInLongIdleMode();
  }

  /**
   * @method chickenLogic - handles all the necessary Logic for Chickens
   */
  chickenLogic() {
    this.checkCollisionsWithChickens();
    this.level.enemies.forEach((enemy) => {
      enemy.update();
      enemy.drawOnCanvas(this.ctx, enemy);
    });
    this.applyWalkingSound();
  }

  /**
   * @method bottlesLogic - handles all the necessary Logic for Bottles
   */
  bottlesLogic() {
    this.checkCollisionBottles();
    this.level.bottles.forEach((bottle) => {
      bottle.updateBottle();
      if (!bottle.isCollected) bottle.drawOnCanvas(this.ctx, bottle);
    });
  }

  /**
   * @method throwableBottlesLogic - handles all the necessary Logic for Throwable Bottles
   */
  throwableBottlesLogic() {
    this.throwableBottles();
    this.level.thrownBottles.forEach((thrownBottle) => {
      thrownBottle.throwUpdate();
      thrownBottle.drawOnCanvas(this.ctx, thrownBottle);
    });
  }

  /**
   * @method coinsLogic - handles all the necessary Logic for Coins
   */
  coinsLogic() {
    this.checkCollisionsCoins();
    this.level.coins.forEach((coin) => {
      coin.updateCoins();
      if (!coin.isCollected) coin.drawOnCanvas(this.ctx, coin);
    });
  }

  /**
   * @method endbossLogic - handles all the necessary Logic for the Endboss
   */
  endbossLogic() {
    this.level.endboss.update(this.character);
    this.level.endboss.drawOnCanvas(this.ctx, this.level.endboss);
    this.checkCollisionWithBoss(this.level.endboss.damage);
    this.filterThrownBottles();
    this.checkPepeCollisionWithBoss();
    this.applyBossSounds();
  }

  /**
   * @method checkCollisionsWithChickens - checks if any collision between chickens and pepe happened.
   */
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

  /**
   * @method checkCollisionBottles - checks if any collision for bottles necessary for collecting.
   */
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

  /**
   * @method checkCollisionsCoins - checks if any collision for coins necessary for collecting.
   */
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

  /**
   * @method checkCollisionWithBoss - checks if any collision between thrown bottles and the endboss happened.
   * @param {Number} damage
   */
  checkCollisionWithBoss(damage) {
    this.level.thrownBottles.forEach((thrownBottle) => {
      if (
        !this.level.endboss.isDead &&
        thrownBottle.isColliding(this.level.endboss)
      ) {
        this.level.endboss.hurt(damage);
        thrownBottle.hasHit = true;
        if (!this.audioManager.isMuted) {
          this.resetBeforePlay(this.audioManager.soundEffects.break);
        }
      }
    });
  }

  /**
   * @method checkPepeCollisionWithBoss - checks if any collision between pepe and the endboss happened.
   */
  checkPepeCollisionWithBoss() {
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

  /**
   * @method drawCoinBarOnCanvas - responsible to draw not collected coins on canvas
   */
  drawCoinBarOnCanvas() {
    this.coinBar.drawCollectableBar(
      this.ctx,
      this.coinBar.COINS_BAR_IMAGES,
      this.level.coins.length,
      this.character.coinsCollected,
      100,
    );
  }

  /**
   * @method drawBottleBarOnCanvas - responsible to draw not collected bottles on canvas
   */
  drawBottleBarOnCanvas() {
    this.bottleBar.drawCollectableBar(
      this.ctx,
      this.bottleBar.BOTTLES_BAR_IMAGES,
      this.level.bottles.length,
      this.character.bottlesCollected,
      50,
    );
  }

  /**
   * @method drawPepeHealthBarOnCanvas - responsible to draw pepe's health bar on canvas
   */
  drawPepeHealthBarOnCanvas() {
    this.healthBarPepe.drawStatusBar(
      this.ctx,
      this.healthBarPepe.PEPE_HEALTH_BAR_IMAGES,
      this.character.health,
      10,
    );
  }

  /**
   * @method drawBossHealthBarOnCanvas - responsible to draw boss's health bar on canvas when pepe is close enough to the boss.
   */
  drawBossHealthBarOnCanvas() {
    let distance = Math.abs(this.level.endboss.x - this.character.x);
    if (distance <= 700) {
      this.bossHealthBar.drawStatusBar(
        this.ctx,
        this.bossHealthBar.BOSS_HEALTH_BAR_IMAGES,
        this.level.endboss.health,
        400,
      );
    }
  }

  /**
   * @method drawBarsOnCanvas - responsible to draw all bars on canvas
   */
  drawBarsOnCanvas() {
    this.drawPepeHealthBarOnCanvas();
    this.drawBottleBarOnCanvas();
    this.drawCoinBarOnCanvas();
    this.drawBossHealthBarOnCanvas();
  }

  /**
   * @method throwableBottles - responsible for creating new thrown bottle objects when the player presses the throw key and has bottles to throw.
   */
  throwableBottles() {
    if (this.keyboard.THROW && this.character.bottlesCollected > 0) {
      if (Date.now() - this.character.lastThrowTime > 1000) {
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

  /**
   * @method resetBeforePlay - resets to the beginning and play.
   * @param {String} soundName
   */
  resetBeforePlay(soundName) {
    soundName.currentTime = 0;
    soundName.play();
  }

  /**
   * @method filterThrownBottles - removes thrown bottles from the array
   */
  filterThrownBottles() {
    this.level.thrownBottles = this.level.thrownBottles.filter(
      (bottle) => !bottle.hasHit && bottle.x > -100 && bottle.y < 420,
    );
  }

  /**
   * @method applyWalkingSound - responsible for playing walking sound when the character is moving.
   */
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

  /**
   * @method applyBossSounds - checks for the state of boss and acoordingly play dead or growl sound.
   */
  applyBossSounds() {
    if (this.level.endboss.isDead && !this.level.endboss.isPlayingDeadSound) {
      this.level.endboss.pepeWon = true;
      this.level.endboss.isPlayingDeadSound = true;
      if (!this.audioManager.isMuted) {
        this.audioManager.soundEffects.bossDead.play();
      }
      setTimeout(() => {
        this.level.endboss.isPlayingDeadSound = false;
        stopGame();
        showWinScreen();
      }, 1000);
      return;
    } else if (this.level.endboss.isAttacking && !this.audioManager.isMuted) {
      if (!this.level.endboss.isPlayingGrowlSound) {
        this.audioManager.soundEffects.bossGrowl.play();
        this.level.endboss.isPlayingGrowlSound = true;
      } else {
        this.level.endboss.isPlayingGrowlSound = false;
      }
    }
  }

  /**
   * @method applyCharacterDeadSound - checks if the character is dead and accordingly play the death sound and show lose screen.
   */
  applyCharacterDeadSound() {
    if (this.character.isDead && !this.character.playingDeathSound) {
      this.character.pepeLost = true;
      this.character.playingDeathSound = true;
      if (!this.audioManager.isMuted) {
        this.audioManager.soundEffects.pepeDead.play();
      }
      setTimeout(() => {
        this.character.playingDeathSound = false;
        stopGame();
        showLoseScreen();
      }, 1000);
      return;
    }
  }

  /**
   * @method pepeInLongIdleMode - checks if the character is in long idle mode and accordingly play snoring sound.
   */
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
}
