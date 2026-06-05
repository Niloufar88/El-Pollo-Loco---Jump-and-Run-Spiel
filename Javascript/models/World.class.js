class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  backgroundObjects = [
    new BackgroundObjects("assets/img/5_background/layers/air.png"),
    new BackgroundObjects(
      "assets/img/5_background/layers/3_third_layer/full.png",
    ),
    new BackgroundObjects(
      "assets/img/5_background/layers/2_second_layer/full.png",
    ),
    new BackgroundObjects(
      "assets/img/5_background/layers/1_first_layer/full.png",
    ),
  ];
  clouds = new Clouds();
  img;
  ctx;
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    //clearing the canvas before drawing the next frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Background Layers
    this.drawObjectsOnCanvas(this.backgroundObjects);

    //Clouds
    this.drawOnCanvas(this.clouds);

    //Character
    this.drawOnCanvas(this.character);

    //Chickens
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
    this.drawObjectsOnCanvas(this.enemies);

    let self = this;
    requestAnimationFrame(() => self.draw());
  }

  drawObjectsOnCanvas(objects) {
    objects.forEach((obj) => {
      this.drawOnCanvas(obj);
    });
  }

  drawOnCanvas(object) {
    this.ctx.drawImage(
      object.img,
      object.x,
      object.y,
      object.width,
      object.height,
    );
  }
}
