class Coin extends CollectableObjects {
  constructor() {
    super();

    this.x = 350 + Math.random() * 1900;
    this.y = 50 + Math.random() * 250;
    this.width = 100;
    this.height = 100;

    this.collisionWidth = 40;
    this.collisionHeight = 40;
    this.offsetX = (this.width - this.collisionWidth) / 2;
    this.offsetY = (this.height - this.collisionHeight) / 2;

    this.animationSpeed = 150;

    this.isCollected = false;

    this.COIN_IMAGES = [
      "assets/img/coin/coin_1.png",
      "assets/img/coin/coin_2.png",
    ];

    this.loadImage(this.COIN_IMAGES[0]);
    this.loadImages(this.COIN_IMAGES);
  }

  /**
   * @method updateCoins - Updates the coin's animation based on the state of @property {boolean}  isCollected.
   */
  updateCoins() {
    if (!this.isCollected) {
      this.playAnimation(this.COIN_IMAGES, this.animationSpeed);
    }
  }
}
