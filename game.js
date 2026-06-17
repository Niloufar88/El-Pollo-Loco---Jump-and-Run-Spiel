// Canvas Variables
const canvas = document.getElementById("myCanvas");
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();

//Screens and Buttons Variables
const startGameBtn = document.getElementById("startGame-btn");
const startScreen = document.getElementById("start-screen");
const canvasContainer = document.getElementById("canvas-container");
const howToPlayBtn = document.getElementById("howToPlay-btn");
const contentContainer = document.getElementById("contents");
const controlsBtn = document.getElementById("controls-btn");
const fullscreenBtns = document.querySelectorAll(".fullScreen-btn");
const muteBtns = document.querySelectorAll(".audio-btn");
const muteBtnImgs = document.querySelectorAll(".audio-btn img");

let saveMutedState = localStorage.getItem("audioMuted");
if (saveMutedState === null) audioManager.isMuted = true;
else audioManager.isMuted = saveMutedState === true;

window.addEventListener("DOMContentLoaded", () => {
  audioManager.loadSounds();

  updateAllIcons();
});

function gameInit() {
  world = new World(canvas, keyboard, audioManager);
  world.draw();
}

//start Game handler
function startGame() {
  startScreen.style.display = "none";
  canvasContainer.style.display = "block";
  gameInit();
  manageGameAudio();
}

//side-Screen function
function showRelevantContent(func) {
  audioManager.sounds.click.play();
  contentContainer.innerHTML = "";
  contentContainer.style.visibility = "visible";
  contentContainer.innerHTML = func;
  contentContainer.style.padding = "24px";
}

//fullscreen handler
fullscreenBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
});

//game music manager
function manageGameAudio() {
  audioManager.sounds.menu.pause();
  audioManager.sounds.game.play();
  audioManager.sounds.game.volume = 0.2;
  audioManager.sounds.game.loop = true;
}

//toggle menu Music
muteBtns.forEach((muteBtn) => {
  muteBtn.addEventListener("click", (event) => {
    console.log(event.currentTarget.parentElement.dataset.id);

    muteBtnImgs.forEach((img) => {
      if (img.src.includes("volume-xmark-solid.png")) {
        img.src = "assets/Icons/volume-solid.png";
        if (event.currentTarget.parentElement.dataset.id === "welcome") {
          manageUnmuteAudioWelcomeScreen();
        } else if (event.currentTarget.parentElement.dataset.id === "canvas") {
          manageUnmuteAudioCanvas();
        }
      } else if (img.src.includes("assets/Icons/volume-solid.png")) {
        img.src = "assets/Icons/volume-xmark-solid.png";
        if (event.currentTarget.parentElement.dataset.id === "welcome") {
          manageMuteAudioWelcomeScreen();
        } else if (event.currentTarget.parentElement.dataset.id === "canvas") {
          manageMuteAudioCanvas();
        }
      }
    });
  });
});

function updateAllIcons() {
  muteBtnImgs.forEach((img) => {
    img.src = audioManager.isMuted
      ? "assets/Icons/volume-xmark-solid.png"
      : "assets/Icons/volume-solid.png";
  });
}

function manageUnmuteAudioWelcomeScreen() {
  audioManager.sounds.game.pause();
  audioManager.sounds.game.currentTime = 0;
  audioManager.sounds.menu.play();
  audioManager.sounds.menu.loop = true;
  audioManager.sounds.menu.volume = 0.2;
}

function manageUnmuteAudioCanvas() {
  audioManager.sounds.menu.pause();
  audioManager.sounds.menu.currentTime = 0;
  audioManager.sounds.game.play();
  audioManager.sounds.game.loop = true;
  audioManager.sounds.game.volume = 0.2;
}

function manageMuteAudios() {
  audioManager.pauseGameAudios();
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
