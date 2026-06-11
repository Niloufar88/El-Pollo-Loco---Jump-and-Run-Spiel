class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  level_end_x = 4000;

  constructor(enemies, clouds, backgroundObjects, endboss, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.endboss = endboss;
    this.bottles = bottles;
  }

  generatingEnemies(count) {
    for (let i = 0; i < count; i++) {
      this.enemies.push(new Chicken());
    }
  }

  generatingClouds(count) {
    for (let i = 0; i < count; i++) {
      this.clouds.push(new Clouds());
    }
  }

  generateBottles(count) {
    for (let i = 0; i < count; i++) {
      this.bottles.push(new Bottle());
    }
  }
}
