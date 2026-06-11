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
    this.speedX = 3;

    //Animation Speed
    this.walkSpeed = 100;
    this.idleSpeed = 150;
    this.jumpSpeed = 60;
    this.deathSpeed = 100;
    this.hurtSpeed = 100;

    //jump
    this.speedY = 0;
    this.gravity = 1;
    this.ground = 170;
    this.isJumping = false;

    //Collision
    this.health = 100;
    this.isHurt = false;
    this.isInvincible = false;
    this.lastHitTime = 0;
    this.invincibilityDuration = 1500;

    //collectables
    this.bottlesCollected = 0;

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

    this.loadImage(this.PEPE_IDLE[0]);
    this.loadImages(this.PEPE_IDLE);
    this.loadImages(this.PEPE_WALK);
    this.loadImages(this.PEPE_JUMP);
    this.loadImages(this.PEPE_DEAD);
    this.loadImages(this.PEPE_HURT);
  }

  updateCharacter() {
    this.applyGravity();

    // check if Pepe is dead
    if (this.isDead) {
      this.playAnimation(this.PEPE_DEAD, this.deathSpeed);
      return;
    }

    if (
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      this.isOnGround()
    ) {
      this.jump();
    }

    // if Pepe is hurt
    if (this.isHurt) {
      this.playAnimation(this.PEPE_HURT, this.hurtSpeed);
    }

    //Jump
    if (this.isJumping) {
      if (!this.isHurt) {
        // this.jumpAnimation(this.PEPE_JUMP, this.jumpSpeed, true);
        this.playAnimation(this.PEPE_JUMP, this.jumpSpeed); // Animation läuft bisschen schneller als beabsichtigt, muss später nochmal angepasst werden
      }
    } else if (this.world.keyboard.RIGHT) {
      this.moveRight();
      this.playAnimation(this.PEPE_WALK, this.walkSpeed);
    } else if (this.world.keyboard.LEFT) {
      this.moveLeft();
      this.playAnimation(this.PEPE_WALK, this.walkSpeed);
    } else {
      this.playAnimation(this.PEPE_IDLE, this.idleSpeed);
    }

    // calculate the camera-x position based on the character's x position
    this.cameraPosition();
  }

  cameraPosition() {
    if (this.x >= this.world.worldEndX - this.world.canvas.width + 100)
      this.world.camera_x = -this.world.worldEndX + this.world.canvas.width;
    else this.world.camera_x = -this.x + 100;
  }

  moveRight() {
    if (this.x + this.width >= this.world.worldEndX) {
      this.x = this.world.worldEndX - this.width;
    }
    this.x += this.speedX;
    this.otherDirection = false;
  }

  moveLeft() {
    if (this.x <= -100) this.x = -100;
    this.x -= this.speedX;
    this.otherDirection = true;
  }

  applyGravity() {
    this.y += this.speedY;
    this.speedY += this.gravity;

    if (this.y >= this.ground) {
      this.speedY = 0;
      this.y = this.ground;
      this.isJumping = false;
    }
  }

  isAboveGround() {
    return this.y < this.ground;
  }

  isOnGround() {
    return this.y >= this.ground;
  }

  jump() {
    if (this.isOnGround()) {
      this.speedY = -20;
      this.isJumping = true;
    }
  }

  hit() {
    if (this.isInvincible) return;
    this.health -= 10;
    this.lastHitTime = Date.now();
    this.isInvincible = true;
    this.isHurt = true;

    if (this.health < 0) {
      this.health = 0;
      this.isDead = true;
    }

    setTimeout(() => {
      this.isHurt = false;
    }, 500);

    setTimeout(() => {
      this.isInvincible = false;
    }, this.invincibilityDuration);
  }
}
