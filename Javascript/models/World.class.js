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
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    //clearing the canvas before drawing the next frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Camera
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);

    //Background Layers
    this.drawObjectsOnCanvas(this.backgroundObjects);

    //Clouds
    this.drawOnCanvas(this.clouds);

    //Character
    this.character.updateCharacter();
    this.drawOnCanvas(this.character);

    //Chickens
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
    this.drawObjectsOnCanvas(this.enemies);

    //camera reset
    this.ctx.restore();

    let self = this;
    requestAnimationFrame(() => self.draw());
  }

  drawObjectsOnCanvas(objects) {
    objects.forEach((obj) => {
      this.drawOnCanvas(obj);
    });
  }

  drawOnCanvas(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    } else {
      this.ctx.drawImage(
        object.img,
        object.x,
        object.y,
        object.width,
        object.height,
      );
    }
  }

  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.x + object.width, object.y);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(object.img, 0, 0, object.width, object.height);
    this.ctx.restore();
  }
}
