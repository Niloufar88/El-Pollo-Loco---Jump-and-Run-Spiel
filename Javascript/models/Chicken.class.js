class Chicken extends MovableObject {
  constructor() {
    super();

    this.x = 400 + Math.random() * 200;
    this.y = 340;
    this.width = 80;
    this.height = 80;

    this.loadImage("assets/img/enemies/chicken normal walk/1_w.png");
  }
}
