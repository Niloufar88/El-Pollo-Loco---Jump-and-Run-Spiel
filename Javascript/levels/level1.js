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
);

level1.generatingEnemies(18);
level1.generatingClouds(3);
