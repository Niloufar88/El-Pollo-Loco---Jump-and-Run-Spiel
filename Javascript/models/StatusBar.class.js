class StatusBar extends DrawableObjects {
  constructor() {
    super();

    //Images Array
    this.PEPE_HEALTH_BAR_IMAGES = [
      "assets/img/statusbar/health/0.png",
      "assets/img/statusbar/health/20.png",
      "assets/img/statusbar/health/40.png",
      "assets/img/statusbar/health/60.png",
      "assets/img/statusbar/health/80.png",
      "assets/img/statusbar/health/100.png",
    ];

    //loading Images in ImageCache
    this.loadImage(this.PEPE_HEALTH_BAR_IMAGES[5]);
    this.loadImages(this.PEPE_HEALTH_BAR_IMAGES);
  }

  // can be used for Boss and Character
  resolveImageSrcForHealthBars(images, health) {
    if (health === 100) return (this.img = this.imageCache[images[5]]);
    if (health >= 80) return (this.img = this.imageCache[images[4]]);
    if (health >= 60) return (this.img = this.imageCache[images[3]]);
    if (health >= 40) return (this.img = this.imageCache[images[2]]);
    if (health >= 20) return (this.img = this.imageCache[images[1]]);
    else return (this.img = this.imageCache[images[0]]);
  }

  drawStatusBar(ctx, images, health) {
    // based on Health Percentage of Character/Boss get the img
    let barImg = this.resolveImageSrcForHealthBars(images, health);

    //Position and size of the Statusbar
    let barX = 10;
    let barY = 10;
    let barWidth = 200;
    let barHeight = 50;

    // draw the status bar
    ctx.drawImage(barImg, barX, barY, barWidth, barHeight);
  }
}
