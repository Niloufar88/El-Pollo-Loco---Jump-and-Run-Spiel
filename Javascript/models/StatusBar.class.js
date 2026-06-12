class StatusBar extends DrawableObjects {
  barWidth = 200;
  barHeight = 50;

  constructor() {
    super();

    //Images Array for Pepe Health bar
    this.PEPE_HEALTH_BAR_IMAGES = [
      "assets/img/statusbar/health/0.png",
      "assets/img/statusbar/health/20.png",
      "assets/img/statusbar/health/40.png",
      "assets/img/statusbar/health/60.png",
      "assets/img/statusbar/health/80.png",
      "assets/img/statusbar/health/100.png",
    ];

    //Images Array for collecting Bottles
    this.BOTTLES_BAR_IMAGES = [
      "assets/img/statusbar/bottle/0.png",
      "assets/img/statusbar/bottle/20.png",
      "assets/img/statusbar/bottle/40.png",
      "assets/img/statusbar/bottle/60.png",
      "assets/img/statusbar/bottle/80.png",
      "assets/img/statusbar/bottle/100.png",
    ];

    //Images Array for collecting Coins
    this.COINS_BAR_IMAGES = [
      "assets/img/statusbar/coin/0.png",
      "assets/img/statusbar/coin/20.png",
      "assets/img/statusbar/coin/40.png",
      "assets/img/statusbar/coin/60.png",
      "assets/img/statusbar/coin/80.png",
      "assets/img/statusbar/coin/100.png",
    ];

    //loading pepe health bar Images in ImageCache
    this.loadImage(this.PEPE_HEALTH_BAR_IMAGES[5]);
    this.loadImages(this.PEPE_HEALTH_BAR_IMAGES);

    //loading bottles bar images in ImageCache
    this.loadImage(this.BOTTLES_BAR_IMAGES[0]);
    this.loadImages(this.BOTTLES_BAR_IMAGES);

    //loading coins bar images in ImageCache
    this.loadImage(this.COINS_BAR_IMAGES[0]);
    this.loadImages(this.COINS_BAR_IMAGES);
  }

  // can be used for Boss and Character
  resolveImageIndexForHealthBars(images, health) {
    if (health === 100) return (this.img = this.imageCache[images[5]]);
    if (health >= 80) return (this.img = this.imageCache[images[4]]);
    if (health >= 60) return (this.img = this.imageCache[images[3]]);
    if (health >= 40) return (this.img = this.imageCache[images[2]]);
    if (health >= 20) return (this.img = this.imageCache[images[1]]);
    else return (this.img = this.imageCache[images[0]]);
  }

  //draw health Bar for Character
  drawStatusBar(ctx, images, health, barX) {
    // based on Health Percentage of Character/Boss get the img
    let barImg = this.resolveImageIndexForHealthBars(images, health);

    //Position and size of the Statusbar

    let barY = 10;

    // draw the status bar
    ctx.drawImage(barImg, barX, barY, this.barWidth, this.barHeight);
  }

  resolveImageIndexForCollectables(images, maxNumber, collectable) {
    let barPercentage = (collectable / maxNumber) * 100;

    if (barPercentage === 100) return (this.img = this.imageCache[images[5]]);
    if (barPercentage >= 80) return (this.img = this.imageCache[images[4]]);
    if (barPercentage >= 60) return (this.img = this.imageCache[images[3]]);
    if (barPercentage >= 40) return (this.img = this.imageCache[images[2]]);
    if (barPercentage >= 20) return (this.img = this.imageCache[images[1]]);
    else return (this.img = this.imageCache[images[0]]);
  }

  drawCollectableBar(ctx, images, maxNumber, collectable, barY) {
    //based on collected number get the img
    let barImg = this.resolveImageIndexForCollectables(
      images,
      maxNumber,
      collectable,
    );

    //Position the status bar
    let barX = 10;

    //draw the status bar
    ctx.drawImage(barImg, barX, barY, this.barWidth, this.barHeight);
  }
}
