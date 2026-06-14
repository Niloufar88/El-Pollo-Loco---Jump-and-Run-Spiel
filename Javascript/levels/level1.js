const level1 = new Level(
  [],
  [],
  [
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
  ],
  new Endboss("assets/img/4_enemie_boss/1_alert/1.png"),
  [],
  [],
  [],
);

level1.generatingEnemies(15);
level1.generatingClouds(3);
level1.generateBottles(10);
level1.generateRandomCoins();
