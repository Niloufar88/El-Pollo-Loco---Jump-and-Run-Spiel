class Character extends MovableObject {
  constructor() {
    super();

    this.x = 50;
    this.y = 220;
    this.width = 100;
    this.height = 200;

    this.loadImage("assets/img/pepe-character/idle/I-1.png");
  }
}
