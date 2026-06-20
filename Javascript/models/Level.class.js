/**
 * @class Level
 * initialize the level with enemies, clouds, background objects, bottles, coins and thrown bottles.
 */

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

  /**
   * @method generatingEnemies - to generate enemies in the world.
   * @param {Number} count
   */
  generatingEnemies(count) {
    for (let i = 0; i < count; i++) {
      this.enemies.push(new Chicken());
    }
  }

  /**
   * @method generatingClouds - to generate clouds in the world.
   * @param {Number} count
   */
  generatingClouds(count) {
    for (let i = 0; i < count; i++) {
      this.clouds.push(new Clouds());
    }
  }

  /**
   * @method generateBottles - to generate bottles in the world.
   * @param {Number} count
   */
  generateBottles(count) {
    for (let i = 0; i < count; i++) {
      this.bottles.push(new Bottle());
    }
  }

  /**
   * @method generateRandomCoinColumns - to generate columns of coins in the world.
   * @param {Number} baseX - The base X position for the column.
   * @param {Number} startY - The starting Y position for the column.
   * @param {Number} gap - The gap between each coin in the column.
   * @param {Number} count - The number of coins in the column.
   * @returns {Array} - An array of Coin objects.
   */
  generateRandomCoinColumns(baseX, startY, gap, count) {
    let columns = [];

    for (let i = 0; i < count; i++) {
      columns.push(new Coin(baseX, startY - i * gap));
    }

    return columns;
  }

  /**
   * @method generateRandomCoins - to generate random coins in the world.
   */
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

  /**
   * @method initLevel1 - to initialize the first level with enemies, clouds, bottles and coins.
   */
  initLevel1() {
    level1.generatingEnemies(15);
    level1.generatingClouds(3);
    level1.generateBottles(10);
    level1.generateRandomCoins();
  }

  /**
   * @method reset - to reset the level to its initial state.
   */
  reset() {
    this.enemies = [];
    this.bottles = [];
    this.coins = [];
    this.thrownBottles = [];
    this.endboss.reset();
    this.initLevel1();
  }
}
