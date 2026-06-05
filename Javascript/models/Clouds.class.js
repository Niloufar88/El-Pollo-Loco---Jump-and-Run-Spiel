class Clouds extends MovableObject {
  constructor() {
    super();

    this.x = Math.random() * 720;
    this.y = 0;
    this.width = 720 * 2;
    this.height = 480;
    this.speed = 0.15;

    this.loadImage("assets/img/5_background/layers/4_clouds/full.png");
    this.changeXPosition();
  }

  changeXPosition() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
