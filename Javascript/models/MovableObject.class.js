class MovableObject extends DrawableObjects {
  speedX = 0.15;

  //states
  isDead = false;
  otherDirection = false;

  moveLeft() {
    setInterval(() => {
      this.x -= this.speedX;
    }, 1000 / 60);
  }

  die() {
    this.isDead = true;
  }
}
