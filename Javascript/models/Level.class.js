class Level {
  enemies;
  clouds;
  backgroundObjects;
  level_end_x = 4000;

  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
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
}
