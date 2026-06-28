class StatusBar extends DrawableObjects {
  barWidth = 200;
  barHeight = 50;

  constructor() {
    super();

    this.PEPE_HEALTH_BAR_IMAGES = [
      "assets/img/statusbar/health/0.png",
      "assets/img/statusbar/health/20.png",
      "assets/img/statusbar/health/40.png",
      "assets/img/statusbar/health/60.png",
      "assets/img/statusbar/health/80.png",
      "assets/img/statusbar/health/100.png",
    ];

    this.BOTTLES_BAR_IMAGES = [
      "assets/img/statusbar/bottle/0.png",
      "assets/img/statusbar/bottle/20.png",
      "assets/img/statusbar/bottle/40.png",
      "assets/img/statusbar/bottle/60.png",
      "assets/img/statusbar/bottle/80.png",
      "assets/img/statusbar/bottle/100.png",
    ];

    this.COINS_BAR_IMAGES = [
      "assets/img/statusbar/coin/0.png",
      "assets/img/statusbar/coin/20.png",
      "assets/img/statusbar/coin/40.png",
      "assets/img/statusbar/coin/60.png",
      "assets/img/statusbar/coin/80.png",
      "assets/img/statusbar/coin/100.png",
    ];

    this.BOSS_HEALTH_BAR_IMAGES = [
      "assets/img/statusbar/boss/green0.png",
      "assets/img/statusbar/boss/green20.png",
      "assets/img/statusbar/boss/green40.png",
      "assets/img/statusbar/boss/green60.png",
      "assets/img/statusbar/boss/green80.png",
      "assets/img/statusbar/boss/green100.png",
    ];

    this.loadImage(this.PEPE_HEALTH_BAR_IMAGES[5]);
    this.loadImages(this.PEPE_HEALTH_BAR_IMAGES);

    this.loadImage(this.BOTTLES_BAR_IMAGES[0]);
    this.loadImages(this.BOTTLES_BAR_IMAGES);

    this.loadImage(this.COINS_BAR_IMAGES[0]);
    this.loadImages(this.COINS_BAR_IMAGES);

    this.loadImage(this.BOSS_HEALTH_BAR_IMAGES[0]);
    this.loadImages(this.BOSS_HEALTH_BAR_IMAGES);
  }

  /**
   * @method resolveImageIndexForHealthBars
   * based on the health percentage of the character or boss, get the corresponding image from the images array
   * @param {Array} images
   * @param {Number} health
   * @returns {HTMLImageElement} the image corresponding to the health percentage
   */

  resolveImageIndexForHealthBars(images, health) {
    if (health === 100) return (this.img = this.imageCache[images[5]]);
    if (health >= 80) return (this.img = this.imageCache[images[4]]);
    if (health >= 60) return (this.img = this.imageCache[images[3]]);
    if (health >= 40) return (this.img = this.imageCache[images[2]]);
    if (health >= 20) return (this.img = this.imageCache[images[1]]);
    else return (this.img = this.imageCache[images[0]]);
  }

  /**
   * @method drawStatusBar - draws the health bar for the character or boss based on the health percentage
   * @param {CanvasRenderingContext2D} ctx
   * @param {Array} images
   * @param {Number} health
   * @param {Number} barX
   */
  drawStatusBar(ctx, images, health, barX) {
    let barImg = this.resolveImageIndexForHealthBars(images, health);
    let barY = 0;
    ctx.drawImage(barImg, barX, barY, this.barWidth, this.barHeight);
  }

  /**
   * @method resolveImageIndexForCollectables
   * based on the collected number, get the corresponding image from the images array
   * @param {Array} images
   * @param {Number} maxNumber
   * @param {Number} collectable
   * @returns {HTMLImageElement} the image corresponding to the collected number
   */
  resolveImageIndexForCollectables(images, maxNumber, collectable) {
    let barPercentage = (collectable / maxNumber) * 100;
    if (barPercentage === 100) return (this.img = this.imageCache[images[5]]);
    if (barPercentage >= 80) return (this.img = this.imageCache[images[4]]);
    if (barPercentage >= 60) return (this.img = this.imageCache[images[3]]);
    if (barPercentage >= 40) return (this.img = this.imageCache[images[2]]);
    if (barPercentage >= 20) return (this.img = this.imageCache[images[1]]);
    else return (this.img = this.imageCache[images[0]]);
  }

  /**
   * @method drawCollectableBar - draws the collectable bar based on the collected number
   * @param {CanvasRenderingContext2D} ctx
   * @param {Array} images
   * @param {Number} maxNumber
   * @param {Number} collectable
   * @param {Number} barY
   */
  drawCollectableBar(ctx, images, maxNumber, collectable, barY) {
    let barImg = this.resolveImageIndexForCollectables(
      images,
      maxNumber,
      collectable,
    );
    let barX = 10;
    ctx.drawImage(barImg, barX, barY, this.barWidth, this.barHeight);
  }
}
