// Canvas Variables
const canvas = document.getElementById("myCanvas");
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();

//Screens and Buttons Variables
const startGameBtn = document.getElementById("startGame-btn");
const startScreen = document.getElementById("start-screen");
const winLoseScreen = document.getElementById("win-lose-screen");
const winLoseImg = winLoseScreen.querySelector(".win-lose-img");
const canvasContainer = document.getElementById("canvas-container");
const howToPlayBtn = document.getElementById("howToPlay-btn");
const contentContainer = document.getElementById("contents");
const controlsBtn = document.getElementById("controls-btn");
const fullscreenBtns = document.querySelectorAll(".fullScreen-btn");
const muteBtns = document.querySelectorAll(".audio-btn");
const muteBtnImgs = document.querySelectorAll(".audio-btn img");
const backBtn = document.querySelector(".back-btn");
const touchBtns = document.querySelector(".touchBtns");
const orientationOverlay = document.getElementById("orientationOverlay");

let saveMutedState = localStorage.getItem("audioMuted");
if (saveMutedState === null) audioManager.isMuted = true;
else audioManager.isMuted = saveMutedState === "true";

window.addEventListener("DOMContentLoaded", () => {
  orientationCheckOnload();
  audioManager.loadAllSounds();
  winLoseScreen.style.display = "none";
  if (touchBtns) touchBtns.style.display = "none";
  updateAllIcons();
});

//detecting orientation change
window
  .matchMedia("(orientation:landscape)")
  .addEventListener("change", (event) => {
    const landscape = event.matches;

    if (landscape) {
      orientationOverlay.style.display = "none";
    } else {
      orientationOverlay.style.display = "flex";
    }
  });

function orientationCheckOnload() {
  const windowOrientation = window.matchMedia(
    "(orientation:landscape)",
  ).matches;
  if (windowOrientation) orientationOverlay.style.display = "none";
  else orientationOverlay.style.display = "flex";
}

function gameInit() {
  world = new World(canvas, keyboard, audioManager);
  world.draw();
}

//start Game handler
function startGame() {
  managePauseAudios();
  screenToggleBeforePlay();

  if (world) {
    world.stopGame();
    world.resetProperties();
  }
  gameInit();
  if (!audioManager.isMuted) manageGameAudio();
}

function restartGame() {
  managePauseAudios();
  if (world) world.stopGame();

  screenToggleBeforePlay();

  if (world) world.resetProperties();
  gameInit();

  if (!audioManager.isMuted) manageGameAudio();
}

function screenToggleBeforePlay() {
  startScreen.style.display = "none";
  winLoseScreen.style.display = "none";
  canvasContainer.style.display = "block";
  if (window.matchMedia("(max-width:1023px)").matches)
    touchBtns.style.display = "flex";
}

function backToMenu(event) {
  let screenId = event.currentTarget.parentElement.dataset.id;

  if (world) world.stopGame();
  managePauseAudios();

  screenId === "canvas"
    ? (canvasContainer.style.display = "none")
    : screenId === "win-lose-game-btn"
      ? (winLoseScreen.style.display = "none")
      : null;
  if (touchBtns) touchBtns.style.display = "none";
  contentContainer.innerHTML = "";
  contentContainer.style.visibility = "hidden";
  startScreen.style.display = "flex";
  manageUnmuteAudioWelcomeScreen();
}

function showWinScreen() {
  canvasContainer.style.display = "none";
  if (touchBtns) touchBtns.style.display = "none";
  startScreen.style.display = "none";
  managePauseAudios();
  winLoseScreen.style.display = "flex";

  winLoseScreen.insertAdjacentHTML("beforeend", renderWinLoseScreen());
  winLoseImg.src = "assets/img/You won, you lost/You Win A.png";
  // winLoseScreen.classList.remove("lose-background");
  // winLoseScreen.classList.add("win-background");

  if (!audioManager.isMuted) {
    audioManager.winLoseMusic.win.play();
    audioManager.winLoseMusic.win.volume = 0.2;
  }
}

function showLoseScreen() {
  canvasContainer.style.display = "none";
  if (touchBtns) touchBtns.style.display = "none";
  startScreen.style.display = "none";
  managePauseAudios();
  winLoseScreen.style.display = "flex";

  winLoseScreen.insertAdjacentHTML("beforeend", renderWinLoseScreen());
  winLoseImg.src = "assets/img/You won, you lost/Game Over.png";
  // winLoseScreen.classList.remove("win-background");
  // winLoseScreen.classList.add("lose-background");

  if (!audioManager.isMuted) {
    audioManager.winLoseMusic.gameOver.play();
    audioManager.winLoseMusic.gameOver.volume = 0.2;
  }
}

//side-Screen function
function showRelevantContent(func) {
  if (!audioManager.isMuted) {
    audioManager.menuMusik.click.currentTime = 0;
    audioManager.menuMusik.click.play();
  }
  contentContainer.innerHTML = "";
  contentContainer.style.visibility = "visible";
  contentContainer.innerHTML = func;
  contentContainer.style.padding = "24px";
}

//fullscreen handler

document.addEventListener("click", (event) => {
  if (event.target.closest(".fullScreen-btn")) {
    if (!document.fullscreenElement)
      document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  }
});
// fullscreenBtns.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//     } else {
//       document.exitFullscreen();
//     }
//   });
// });

//game music manager
function manageGameAudio() {
  // managePauseAudios();
  if (!audioManager.isMuted) {
    audioManager.soundEffects.game.play();
    audioManager.soundEffects.game.volume = 0.2;
    audioManager.soundEffects.game.loop = true;
  }
}

//toggle mute/unmute state
document.addEventListener("click", (event) => {
  if (event.target.closest(".audio-btn")) {
    audioManager.isMuted = !audioManager.isMuted;

    localStorage.setItem("audioMuted", audioManager.isMuted);
    updateAllIcons();

    if (audioManager.isMuted) managePauseAudios();
    else {
      let screenId = event.currentTarget.parentElement.dataset.id;

      if (screenId === "welcome") manageUnmuteAudioWelcomeScreen();
      else if (screenId === "canvas") manageUnmuteAudioCanvas();
      else if (screenId === "win-lose-config-btn") manageUnmuteAudioWinLose();
    }
  }
});
// muteBtns.forEach((muteBtn) => {
//   muteBtn.addEventListener("click", (event) => {
//     console.log(event.currentTarget.parentElement.dataset.id);
//   });
// });

function updateAllIcons() {
  muteBtnImgs.forEach((img) => {
    img.src = audioManager.isMuted
      ? "assets/Icons/volume-xmark-solid.png"
      : "assets/Icons/volume-solid.png";
  });
}

function manageUnmuteAudioWelcomeScreen() {
  // managePauseAudios();
  if (!audioManager.isMuted) {
    audioManager.menuMusik.menu.play();
    audioManager.menuMusik.menu.loop = true;
    audioManager.menuMusik.menu.volume = 0.2;
  }
}

function manageUnmuteAudioCanvas() {
  // managePauseAudios();
  if (!audioManager.isMuted) {
    audioManager.soundEffects.game.play();
    audioManager.soundEffects.game.loop = true;
    audioManager.soundEffects.game.volume = 0.2;
  }
}

function manageUnmuteAudioWinLose() {
  if (!audioManager.isMuted) {
    if (winloseScreen.classList.contains("win-background")) {
      audioManager.winLoseMusic.win.play();
      audioManager.winLoseMusic.win.volume = 0.2;
    } else if (winloseScreen.classList.contains("lose-background")) {
      audioManager.winLoseMusic.lose.play();
      audioManager.winLoseMusic.lose.volume = 0.2;
    }
  }
}

function managePauseAudios() {
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

//keyboardEvents for touch buttons
document.addEventListener("touchstart", (event) => {
  if (event.target.id === "left-button") keyboard.LEFT = true;
  if (event.target.id === "right-button") keyboard.RIGHT = true;
  if (event.target.id === "up-button") keyboard.UP = true;
  if (event.target.id === "throw-button") keyboard.THROW = true;
});

document.addEventListener("touchend", (event) => {
  if (event.target.id === "left-button") keyboard.LEFT = false;
  if (event.target.id === "right-button") keyboard.RIGHT = false;
  if (event.target.id === "up-button") keyboard.UP = false;
  if (event.target.id === "throw-button") keyboard.THROW = false;
});
