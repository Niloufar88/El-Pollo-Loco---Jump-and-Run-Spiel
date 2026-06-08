class Character extends MovableObject {
  world;
  constructor() {
    super();

    this.x = 50;
    this.y = 170;
    this.width = 120;
    this.height = 250;

    //speed
    this.speedX = 2;
    this.speedY = 0;

    //Animation Speed
    this.walkSpeed = 100;
    this.idleSpeed = 150;

    //Animation
    this.lastAnimationType = null;

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

    this.loadImage(this.PEPE_IDLE[0]);
    this.loadImages(this.PEPE_IDLE);
    this.loadImages(this.PEPE_WALK);
  }

  updateCharacter() {
    if (this.world.keyboard.RIGHT) {
      this.moveRight();

      this.playAnimation(this.PEPE_WALK, this.walkSpeed);
    } else if (this.world.keyboard.LEFT) {
      this.moveLeft();

      this.playAnimation(this.PEPE_WALK, this.walkSpeed);
    } else {
      this.playAnimation(this.PEPE_IDLE, this.idleSpeed);
    }

    // calculate the camera-x position based on the character's x position
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

  playAnimation(images, speed) {
    if (this.lastAnimationType !== images) {
      this.currentImage = 0;
      this.lastAnimationType = images;
    }
    let now = Date.now();
    let timeSinceLastFrame = now - this.lastFrameTime;

    if (timeSinceLastFrame > speed) {
      let index = this.currentImage % images.length;
      this.img = this.imageCache[images[index]];
      this.currentImage++;
      this.lastFrameTime = now;
    }
  }
}
