/**
 * @class Character 
 * represents the main character in the game, Pepe.
 * @extends MovableObject
 * @constructor Creates a new instance of the Character class.
 * @property {number} health - The health of the character.
 * @property {number} bottlesCollected - The number of bottles collected by the character.
 * @property {number} coinsCollected - The number of coins collected by the character.
 * @property {boolean} isHurt - Sets true if the character is currently hurt and false when not.
 * @property {boolean} isJumping - Sets true if the @method jump is active and false when not.
 * @property {boolean} isInvincible - Sets true if the character is currently invincible and false when not.
 * @property {boolean} pepeLost - Sets true if the character has lost the game and false when not.
 * @property {boolean} longIdleAnimationPlaying - Sets true if the long idle animation is playing and false when not.
 * @property {number} invincibilityDuration - The duration (in milliseconds) for which the character remains invincible after being hit.
 * @property {number} lastHitTime - The timestamp of the last time the character was hit, used to manage invincibility timing.
 * @property {number} lastThrowTime - The timestamp of the last time the character threw a bottle, used to manage throwing cooldown.
 * @property {boolean} playingDeathSound - Sets true if the death sound is currently playing and false when not.

 */

class Character extends MovableObject {
  world;
  constructor() {
    super();
    //Position and Size
    this.x = 50;
    this.y = 170;
    this.width = 120;
    this.height = 250;

    //Position and Size for Collision Box
    this.collisionWidth = 80;
    this.collisionHeight = 140;
    this.offsetX = (this.width - this.collisionWidth) / 2;
    this.offsetY = 100;

    //speed
    this.speedX = 2;

    //Animation Speed
    this.walkSpeed = 100;
    this.idleSpeed = 150;
    this.jumpSpeed = 60;
    this.deathSpeed = 100;
    this.hurtSpeed = 100;
    this.longIdleSpeed = 150;

    //jump
    this.speedY = 0;
    this.gravity = 0.8;
    this.ground = 170;
    this.isJumping = false;
    this.isPlayingJumpAnimation = false;

    //Collision
    this.health = 50;
    this.isHurt = false;
    this.isInvincible = false;
    this.lastHitTime = 0;
    this.invincibilityDuration = 1500;

    //collectables
    this.bottlesCollected = 0;
    this.coinsCollected = 0;

    //throwing Bottles
    this.lastThrowTime = 0;

    //state
    this.pepeLost = false;
    this.playingDeathSound = false;

    //long Idle
    this.lastMovementTime = Date.now();
    this.longIdleAnimationPlaying = false;

    //Image Array
    this.PEPE_IDLE = [
      "assets/img/pepe-character/idle/I-1.png",
      "assets/img/pepe-character/idle/I-2.png",
      "assets/img/pepe-character/idle/I-3.png",
      "assets/img/pepe-character/idle/I-4.png",
      "assets/img/pepe-character/idle/I-5.png",
      "assets/img/pepe-character/idle/I-6.png",
      "assets/img/pepe-character/idle/I-7.png",
      "assets/img/pepe-character/idle/I-8.png",
      "assets/img/pepe-character/idle/I-9.png",
      "assets/img/pepe-character/idle/I-10.png",
    ];

    this.PEPE_WALK = [
      "assets/img/pepe-character/walk/W-21.png",
      "assets/img/pepe-character/walk/W-22.png",
      "assets/img/pepe-character/walk/W-23.png",
      "assets/img/pepe-character/walk/W-24.png",
      "assets/img/pepe-character/walk/W-25.png",
      "assets/img/pepe-character/walk/W-26.png",
    ];

    this.PEPE_JUMP = [
      "assets/img/pepe-character/jump/J-31.png",
      "assets/img/pepe-character/jump/J-32.png",
      "assets/img/pepe-character/jump/J-33.png",
      "assets/img/pepe-character/jump/J-34.png",
      "assets/img/pepe-character/jump/J-35.png",
      "assets/img/pepe-character/jump/J-36.png",
      "assets/img/pepe-character/jump/J-37.png",
      "assets/img/pepe-character/jump/J-38.png",
      "assets/img/pepe-character/jump/J-39.png",
    ];

    this.PEPE_DEAD = [
      "assets/img/pepe-character/dead/D-51.png",
      "assets/img/pepe-character/dead/D-52.png",
      "assets/img/pepe-character/dead/D-53.png",
      "assets/img/pepe-character/dead/D-54.png",
      "assets/img/pepe-character/dead/D-55.png",
      "assets/img/pepe-character/dead/D-56.png",
      "assets/img/pepe-character/dead/D-57.png",
    ];

    this.PEPE_HURT = [
      "assets/img/pepe-character/hurt/H-41.png",
      "assets/img/pepe-character/hurt/H-42.png",
    ];

    this.PEPE_LONGIDLE = [
      "assets/img/pepe-character/long_idle/I-11.png",
      "assets/img/pepe-character/long_idle/I-12.png",
      "assets/img/pepe-character/long_idle/I-13.png",
      "assets/img/pepe-character/long_idle/I-14.png",
      "assets/img/pepe-character/long_idle/I-15.png",
      "assets/img/pepe-character/long_idle/I-16.png",
      "assets/img/pepe-character/long_idle/I-17.png",
      "assets/img/pepe-character/long_idle/I-18.png",
      "assets/img/pepe-character/long_idle/I-19.png",
      "assets/img/pepe-character/long_idle/I-20.png",
    ];

    /**
     * @method loadImages - Loads the images to imageCache Object for the character's animations using the loadImages method inherited from MovableObject.
     */
    this.loadImage(this.PEPE_IDLE[0]);
    this.loadImages(this.PEPE_IDLE);
    this.loadImages(this.PEPE_WALK);
    this.loadImages(this.PEPE_JUMP);
    this.loadImages(this.PEPE_DEAD);
    this.loadImages(this.PEPE_HURT);
    this.loadImages(this.PEPE_LONGIDLE);
  }

  /**
   * @method updateCharacter - Updates the character's state based on the properties of the character if they are true or false and accordingly executes animations.
   */
  updateCharacter() {
    this.applyGravity();
    if (this.isDead) {
      this.playAnimation(this.PEPE_DEAD, this.deathSpeed, true);
      return;
    }
    this.movements();
    if (this.isHurt) {
      this.playAnimation(this.PEPE_HURT, this.hurtSpeed);
      this.longIdleAnimationPlaying = false;
    } else if (this.isPlayingJumpAnimation) {
      if (!this.isHurt) {
        this.playAnimation(this.PEPE_JUMP, this.jumpSpeed, true);
        this.longIdleAnimationPlaying = false;
        if (
          this.currentImage >= this.PEPE_JUMP.length - 1 &&
          this.isOnGround()
        ) {
          this.isPlayingJumpAnimation = false;
        }
      }
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.PEPE_WALK, this.walkSpeed);
      this.lastMovementTime = Date.now();
      this.longIdleAnimationPlaying = false;
    } else if (Date.now() - this.lastMovementTime >= 10000) {
      this.playAnimation(this.PEPE_LONGIDLE, this.longIdleSpeed);
      this.longIdleAnimationPlaying = true;
    } else {
      this.playAnimation(this.PEPE_IDLE, this.idleSpeed);

      this.longIdleAnimationPlaying = false;
    }
    this.cameraPosition();
  }

  /**
   * @method movements - checks for the keyboard inputs and accordingly let the movement to be executed.
   */
  movements() {
    if (
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      this.isOnGround()
    )
      this.jump();
    if (this.world.keyboard.RIGHT) {
      this.moveRight();
    }
    if (this.world.keyboard.LEFT) {
      this.moveLeft();
    }
  }

  /**
   * @method cameraPosition - calculates the camera-x position based on the character's x position and updates the world.camera_x property.
   */
  cameraPosition() {
    if (this.x >= this.world.worldEndX - this.world.canvas.width + 100)
      this.world.camera_x = -this.world.worldEndX + this.world.canvas.width;
    else this.world.camera_x = -this.x + 100;
  }

  /**
   * @method moveRight - Moves the character to the right and updates the otherDirection property.
   */
  moveRight() {
    if (this.x + this.width >= this.world.worldEndX) {
      this.x = this.world.worldEndX - this.width;
    }
    this.x += this.speedX;
    this.otherDirection = false;
  }

  /**
   * @method moveLeft - Moves the character to the left and updates the otherDirection property.
   */
  moveLeft() {
    if (this.x <= -100) this.x = -100;
    this.x -= this.speedX;
    this.otherDirection = true;
  }

  /**
   * @method applyGravity - by applying @property {number} speedY and @property {number} gravity to the character's y position, simulates the effect of gravity on the character.
   */
  applyGravity() {
    this.y += this.speedY;
    this.speedY += this.gravity;

    if (this.y >= this.ground) {
      this.y = this.ground;
      this.speedY = 0;
      this.isJumping = false;
    }
  }

  /**
   * @method isAboveGround - Checks if the character is above the ground level and returns a {boolean} value.
   */
  isAboveGround() {
    return this.y < this.ground;
  }

  /**
   * @method isOnGround - Checks if the character is on the ground level and returns a {boolean} value.
   */
  isOnGround() {
    return this.y >= this.ground;
  }

  /**
   * @method jump - setting accordingly related to jump animation properties to true so the animation can be startet.
   */
  jump() {
    if (this.isOnGround()) {
      this.speedY = -20;
      this.isJumping = true;
      this.isPlayingJumpAnimation = true;
      this.currentImage = 0;
      this.lastMovementTime = Date.now();
      this.longIdleAnimationPlaying = false;
    }
  }

  /**
   * * @method hit - checks for some health, lastHitTime and isInvincible to execute accordingly if the character should lose health or not.
   */
  hit() {
    if (this.isInvincible) return;
    this.health -= 10;
    this.lastHitTime = Date.now();
    this.isInvincible = true;
    this.isHurt = true;
    if (this.health < 0) {
      this.health = 0;
      this.die();
    } else {
      setTimeout(() => {
        this.isHurt = false;
      }, 500);
      setTimeout(() => {
        this.isInvincible = false;
      }, this.invincibilityDuration);
    }
  }

  /**
   * @method die - Sets the character's state to dead and updates the pepeLost property.
   */
  die() {
    super.die();
    this.pepeLost = true;
  }

  /**
   * @method reset - Resets the character's properties to their initial values, so the game can start in a clean state.
   */
  reset() {
    this.x = 50;
    this.y = 170;
    this.isInvincible = false;
    this.isHurt = false;
    this.health = 100;
    this.bottlesCollected = 0;
    this.coinsCollected = 0;
    this.pepeLost = false;
    this.isDead = false;
    this.lastMovementTime = Date.now();
    this.longIdleAnimationPlaying = false;
    this.playingDeathSound = false;
  }
}
