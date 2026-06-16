class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  thrownBottles;
  level_end_x = 4000;

  constructor(
    enemies,
    clouds,
    backgroundObjects,
    endboss,
    bottles,
    coins,
    thrownBottles,
  ) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.endboss = endboss;
    this.bottles = bottles;
    this.coins = coins;
    this.thrownBottles = thrownBottles;
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

  generateRandomCoinColumns(baseX, startY, gap, count) {
    let columns = [];

    for (let i = 0; i < count; i++) {
      columns.push(new Coin(baseX, startY - i * gap));
    }

    return columns;
  }

  generateRandomCoins() {
    let segCount = 8;
    let segWidth = 3200 / segCount;

    for (let i = 1; i < segCount; i++) {
      let startX = segWidth;
      let baseX = startX + segWidth * i;
      let startY = Math.random() * (360 - 150) + 150;
      let count = Math.floor(Math.random() * 4) + 1; // 1 to 4 coins per column

      this.coins.push(
        ...this.generateRandomCoinColumns(baseX, startY, 50, count),
      );
    }
  }
}
