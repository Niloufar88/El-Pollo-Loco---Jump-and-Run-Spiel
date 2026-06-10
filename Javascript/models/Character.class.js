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

    //jump
    this.speedY = 0;
    this.gravity = 1.5;
    this.ground = 170;
    this.isJumping = false;

    //Collision
    this.health = 100;
    this.isHurt = false;
    this.isInvincible = false;
    this.invincibilityDuration = 1500;

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

    this.loadImage(this.PEPE_IDLE[0]);
    this.loadImages(this.PEPE_IDLE);
    this.loadImages(this.PEPE_WALK);
    this.loadImages(this.PEPE_JUMP);
  }

  updateCharacter() {
    this.applyGravity();

    if (
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      this.isOnGround()
    ) {
      this.jump();
    }

    if (this.isJumping) {
      this.playAnimation(this.PEPE_JUMP, this.jumpSpeed); // Animation läuft bisschen schneller als beabsichtigt, muss später nochmal angepasst werden
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
      this.speedY = -25;
      this.isJumping = true;
    }
  }
}
