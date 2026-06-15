// Canvas Variables
const canvas = document.getElementById("myCanvas");
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();

function gameInit() {
  world = new World(canvas, keyboard, audioManager);
  world.draw();
}

//Screens and Buttons Variables
const startGameBtn = document.getElementById("startGame-btn");
const startScreen = document.getElementById("start-screen");
const howToPlayBtn = document.getElementById("howToPlay-btn");
const contentContainer = document.getElementById("contents");
const controlsBtn = document.getElementById("controls-btn");
const fullscreenBtn = document.querySelector(".fullScreen-btn");
const muteBtn = document.querySelector(".mute-btn");

//start Game handler
startGameBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  gameInit();
  manageGameAudio();
});

//side-Screen function
function showRelevantContent(func) {
  audioManager.CLICK.play();
  contentContainer.innerHTML = "";
  contentContainer.style.visibility = "visible";
  contentContainer.innerHTML = func;
  contentContainer.style.padding = "24px";
}

//fullscreen handler
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

function manageGameAudio() {
  audioManager.GAME.play();
  audioManager.GAME.volume = 0.2;
  audioManager.GAME.loop = true;
}

//keyboard Events
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") keyboard.LEFT = true;
  if (event.key === "ArrowRight") keyboard.RIGHT = true;
  if (event.key === "ArrowUp") keyboard.UP = true;
  if (event.key === " ") keyboard.SPACE = true;
  if (event.key === "d") keyboard.THROW = true;
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") keyboard.LEFT = false;
  if (event.key === "ArrowRight") keyboard.RIGHT = false;
  if (event.key === "ArrowUp") keyboard.UP = false;
  if (event.key === " ") keyboard.SPACE = false;
  if (event.key === "d") keyboard.THROW = false;
});

//
