// Canvas Variables
const canvas = document.getElementById("myCanvas");
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();

//Screens and Buttons Variables
const startGameBtn = document.getElementById("startGame-btn");
const startScreen = document.getElementById("start-screen");
const winLoseScreen = document.getElementById("win-lose-screen");
const canvasContainer = document.getElementById("canvas-container");
const howToPlayBtn = document.getElementById("howToPlay-btn");
const contentContainer = document.getElementById("contents");
const controlsBtn = document.getElementById("controls-btn");
const fullscreenBtns = document.querySelectorAll(".fullScreen-btn");
const muteBtns = document.querySelectorAll(".audio-btn");
const muteBtnImgs = document.querySelectorAll(".audio-btn img");
const backBtn = document.querySelector(".back-btn");

let saveMutedState = localStorage.getItem("audioMuted");
if (saveMutedState === null) audioManager.isMuted = true;
else audioManager.isMuted = saveMutedState === "true";

window.addEventListener("DOMContentLoaded", () => {
  audioManager.loadAllSounds();
  winLoseScreen.style.display = "none";
  updateAllIcons();
});

function gameInit() {
  world = new World(canvas, keyboard, audioManager);
  world.draw();
}

//start Game handler
function startGame() {
  startScreen.style.display = "none";
  winLoseScreen.style.display = "none";
  canvasContainer.style.display = "block";
  gameInit();
  if (!audioManager.isMuted) manageGameAudio();
}

function backToMenu(event) {
  console.log(event.currentTarget.parentElement.dataset.id);
  let screenId = event.currentTarget.parentElement.dataset.id;

  if (screenId === "canvas") {
    manageMuteAudios(
      audioManager.soundEffects,
      audioManager.menuMusik,
      audioManager.winLoseMusic,
    );
    canvasContainer.style.display = "none";
    startScreen.style.display = "flex";
    manageUnmuteAudioWelcomeScreen();
  }
}

//side-Screen function
function showRelevantContent(func) {
  if (!audioManager.isMuted) audioManager.menuMusik.click.play();
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
  manageMuteAudios();
  if (!audioManager.isMuted) {
    audioManager.soundEffects.game.play();
    audioManager.soundEffects.game.volume = 0.2;
    audioManager.soundEffects.game.loop = true;
  }
}

//toggle mute/unmute state
muteBtns.forEach((muteBtn) => {
  muteBtn.addEventListener("click", (event) => {
    console.log(event.currentTarget.parentElement.dataset.id);

    audioManager.isMuted = !audioManager.isMuted;

    localStorage.setItem("audioMuted", audioManager.isMuted);
    updateAllIcons();

    if (audioManager.isMuted) manageMuteAudios();
    else {
      let screenId = event.currentTarget.parentElement.dataset.id;

      if (screenId === "welcome") manageUnmuteAudioWelcomeScreen();
      else if (screenId === "canvas") manageUnmuteAudioCanvas();
    }
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
  manageMuteAudios();
  if (!audioManager.isMuted) {
    audioManager.menuMusik.menu.play();
    audioManager.menuMusik.menu.loop = true;
    audioManager.menuMusik.menu.volume = 0.2;
  }
}

function manageUnmuteAudioCanvas() {
  manageMuteAudios();
  if (!audioManager.isMuted) {
    audioManager.soundEffects.game.play();
    audioManager.soundEffects.game.loop = true;
    audioManager.soundEffects.game.volume = 0.2;
  }
}

function manageMuteAudios() {
  audioManager.pauseGameAudios(audioManager.soundEffects);
  audioManager.pauseGameAudios(audioManager.menuMusik);
  audioManager.pauseGameAudios(audioManager.winLoseMusic);
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
