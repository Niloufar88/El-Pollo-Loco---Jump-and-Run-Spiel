const canvas = document.getElementById("myCanvas");
let world;

function gameInit() {
  world = new World(canvas);
  world.draw();
}

gameInit();
