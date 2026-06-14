class Coin extends CollectableObjects {
  constructor() {
    super();

    //Position and size
    this.x = 350 + Math.random() * 1900;
    this.y = 50 + Math.random() * 250;
    this.width = 100;
    this.height = 100;

    //Offset size
    this.collisionWidth = 40;
    this.collisionHeight = 40;
    this.offsetX = (this.width - this.collisionWidth) / 2;
    this.offsetY = (this.height - this.collisionHeight) / 2;

    //Animation Speed
    this.animationSpeed = 150;

    //state
    this.isCollected = false;

    //Array of images
    this.COIN_IMAGES = [
      "assets/img/coin/coin_1.png",
      "assets/img/coin/coin_2.png",
    ];

    this.loadImage(this.COIN_IMAGES[0]);
    this.loadImages(this.COIN_IMAGES);
  }

  updateCoins() {
    if (!this.isCollected) {
      this.playAnimation(this.COIN_IMAGES, this.animationSpeed);
    }
  }
}
