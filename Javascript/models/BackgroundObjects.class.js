class BackgroundObjects extends MovableObject {
  constructor(imagePath) {
    super();
    this.loadImage(imagePath);

    this.x = -202;
    this.y = 0;
    this.width = 720 * 2;
    this.height = 480;
  }
}
