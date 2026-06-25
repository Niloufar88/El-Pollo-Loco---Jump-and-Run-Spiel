const canvas = document.getElementById("myCanvas");
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();

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
const contentModal = document.querySelector(".modal-content");

let saveMutedState = localStorage.getItem("audioMuted");

/**
 * @addEventListener for DOMContentLoaded to initialize the game and set the initial state of the screens,audio and update the mute button icons
 */
window.addEventListener("DOMContentLoaded", () => {
  orientationCheckOnload();
  audioManager.loadAllSounds();
  winLoseScreen.style.display = "none";
  if (touchBtns) touchBtns.style.display = "none";
  updateAllIcons();
  manageLocalstorage();
  keyboard.setupTouchControls();
  checkInnerWidth();
});

/**
 * @function manageLocalstorage to check the localStorage for the audioMuted state and set the audioManager.isMuted accordingly.
 */
function manageLocalstorage() {
  if (saveMutedState === null) audioManager.isMuted = true;
  else audioManager.isMuted = saveMutedState === "true";
}

/**
 * @matchMedia and @addEventListener for orientation change detection to accordingly display the overlay or hide it.
 */
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

/**
 * @addEventListener to run the function on resize.
 */
window.addEventListener("resize", () => {
  checkInnerWidth();
});

/**
 * @function checkInnerWidth to check the inner width of the window to hide or show the controls button accordingly.
 */
function checkInnerWidth() {
  const screenWidth = window.innerWidth;
  let isMobile = screenWidth <= 1023;

  if (isMobile) controlsBtn.style.display = "none";
  else controlsBtn.style.display = "block";
}

/**
 * @addEventListener for closing the modal by clicking outside of the content area.
 */
contentModal.addEventListener("click", (event) => {
  if (event.target === contentModal) {
    contentModal.style.display = "none";
    contentContainer.innerHTML = "";
  }
});

/**
 * @function orientationCheckOnload to check the orientation of the device on page load and display or hide the overlay accordingly.
 */
function orientationCheckOnload() {
  const windowOrientation = window.matchMedia(
    "(orientation:landscape)",
  ).matches;
  if (windowOrientation) orientationOverlay.style.display = "none";
  else orientationOverlay.style.display = "flex";
}

/**
 * @function gameInit to initialize the world object and start the game loop by calling the draw method.
 */
function gameInit() {
  world = new World(canvas, keyboard, audioManager);
  world.draw();
  keyboard.setupTouchControls();
}

/**
 * @function startGame to manage AudioPause, toggle the screens acoordingly, check the screen size to display touch buttons or not, if the game has entruppted calls the @method stopGame and @method resetProperties, then calls @function gameInit and manage game audio if not muted.
 */
function startGame() {
  managePauseAudios();
  screenToggleBeforePlay();
  if (window.matchMedia("(max-width:1023px)").matches)
    touchBtns.style.display = "flex";
  if (world) {
    stopGame();
    resetProperties();
  }
  gameInit();
  if (!audioManager.isMuted) manageGameAudio();
}

/**
 * @function restartGame responsible to restart the game by making sure all audios are paused, calls the @method stopGame and @method resetProperties if the game is already running, toggle the screens acoordingly, check the screen size to display touch buttons or not, then calls @function gameInit and manage game audio if not muted.
 */
function restartGame() {
  managePauseAudios();
  if (world) {
    stopGame();
    resetProperties();
  }
  screenToggleBeforePlay();
  if (window.matchMedia("(max-width:1023px)").matches)
    touchBtns.style.display = "flex";
  gameInit();
  if (!audioManager.isMuted) manageGameAudio();
}

/**
 * @function resetProperties - reset game properties to their initial state.
 */
function resetProperties() {
  world.character.reset();
  world.level.reset();
  world.isGameRunning = true;
}

/**
 * @function stopGame - sets game loop flag to false to stop the game loop.
 */
function stopGame() {
  world.isGameRunning = false;
}

/**
 * @function screenToggleBeforePlay responsible for toggling the screens before starting or restarting the game, it hides the start screen and win/lose screen and shows the canvas container.
 */
function screenToggleBeforePlay() {
  startScreen.style.display = "none";
  winLoseScreen.style.display = "none";
  canvasContainer.style.display = "block";
}

/**
 * @function backToMenu executes when back button clicked, checks the parent element's data-id to determine which screen is currently active, to toggles the screens accordingly, and  if the game is running it calls the @method stopGame, and pause all audios by calling @function managePauseAudios and @function manageUnmuteAudioWelcomeScreen to unmute the welcome screen music if not muted.
 * @param {Event} event
 */
function backToMenu(event) {
  let screenId = event.currentTarget.parentElement.dataset.id;
  if (world) stopGame();
  managePauseAudios();
  screenId === "canvas"
    ? (canvasContainer.style.display = "none")
    : screenId === "win-lose-game-btn"
      ? (winLoseScreen.style.display = "none")
      : null;
  if (touchBtns) touchBtns.style.display = "none";
  contentContainer.innerHTML = "";
  contentModal.style.display = "none";
  startScreen.style.display = "flex";
  // hideControlsButton();
  manageUnmuteAudioWelcomeScreen();
}

/**
 * @function hideControlsButton responsible for hiding the controls button on smaller screens by checking the screen width using matchMedia.
 */
function hideControlsButton() {
  if (window.matchMedia("(max-width:1023px)").matches)
    controlsBtn.style.display = "none";
  else controlsBtn.style.display = "block";
}

/**
 * @function showWinScreen  responsible for toggling the screens accordingly when the game ends, it hides the canvas container and start screen, shows the win/lose screen with the relevant image, and manages the audios by calling @function managePauseAudios to pause all audios and play the relevant win or lose music if not muted.
 */
function showWinScreen() {
  canvasContainer.style.display = "none";
  if (touchBtns) touchBtns.style.display = "none";
  startScreen.style.display = "none";
  managePauseAudios();
  winLoseScreen.style.display = "flex";
  winLoseImg.src = "assets/img/You won A.png";
  winLoseImg.alt = "win";
  if (!audioManager.isMuted) {
    audioManager.winLoseMusic.win.play();
    audioManager.winLoseMusic.win.volume = 0.2;
  }
}

/**
 * @function showLoseScreen responsible for toggling the screens accordingly when the game ends, it hides the canvas container and start screen, shows the win/lose screen with the relevant image, and manages the audios by calling @function managePauseAudios to pause all audios and play the relevant win or lose music if not muted.
 */
function showLoseScreen() {
  canvasContainer.style.display = "none";
  if (touchBtns) touchBtns.style.display = "none";
  startScreen.style.display = "none";
  managePauseAudios();
  winLoseScreen.style.display = "flex";
  winLoseImg.src = "assets/img/Game over A.png";
  winLoseImg.alt = "lose";
  if (!audioManager.isMuted) {
    audioManager.winLoseMusic.gameOver.play();
    audioManager.winLoseMusic.gameOver.volume = 0.2;
  }
}

/**
 * @function  showRelevantContent to show the relevant content of the clicked button.
 * @param {Function} func - The function to execute and display its content accordingly and manage the audio by playing the click sound effect if not muted.
 */

function showRelevantContent(func) {
  if (!audioManager.isMuted) {
    audioManager.menuMusik.click.currentTime = 0;
    audioManager.menuMusik.click.play();
  }
  contentContainer.innerHTML = "";
  contentModal.style.display = "flex";
  contentContainer.innerHTML = func;
  contentContainer.style.padding = "20px";
}

/**
 * @addEventListener for the fullscreen buttons to toggle the fullscreen mode on and off when clicked.
 */
fullscreenBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let screenId = event.currentTarget.parentElement.dataset.id;
    if (screenId === "welcome" && !document.fullscreenElement) {
      startScreen.requestFullscreen();
    } else if (screenId === "canvas" && !document.fullscreenElement) {
      canvasContainer.requestFullscreen();
    } else if (
      screenId === "win-lose-config-btn" &&
      !document.fullscreenElement
    ) {
      winLoseScreen.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
});

/**
 * @function manageGameAudio responsible for managing the game audio by playing the game music and setting its volume and loop properties if not muted.
 */
function manageGameAudio() {
  if (!audioManager.isMuted) {
    audioManager.soundEffects.game.play();
    audioManager.soundEffects.game.volume = 0.2;
    audioManager.soundEffects.game.loop = true;
  }
}

/**
 * @addEventListener for the mute buttons to toggle the mute/unmute state of the game audio when clicked, and save the current state into localStorage and then updating the mute icons and by detecting data set id of the parent element of the clicked button manage to play relevant audios.
 */
muteBtns.forEach((muteBtn) => {
  muteBtn.addEventListener("click", (event) => {
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
  });
});

/**
 * @function updateAllIcons responsible for updating the mute button icons based on the current mute state which has been stored in localstorage.
 */
function updateAllIcons() {
  muteBtnImgs.forEach((img) => {
    img.src = audioManager.isMuted
      ? "assets/Icons/volume-xmark-solid.png"
      : "assets/Icons/volume-solid.png";
  });
}

/**
 * @function manageUnmuteAudioWelcomeScreen responsible for managing to play the audio when is not muted and set the loop to true and volume.
 */
function manageUnmuteAudioWelcomeScreen() {
  if (!audioManager.isMuted) {
    audioManager.menuMusik.menu.play();
    audioManager.menuMusik.menu.loop = true;
    audioManager.menuMusik.menu.volume = 0.2;
  }
}

/**
 * @function manageUnmuteAudioCanvas responsible for managing to play the audio when is not muted and set the loop to true and volume.
 */
function manageUnmuteAudioCanvas() {
  if (!audioManager.isMuted) {
    audioManager.soundEffects.game.play();
    audioManager.soundEffects.game.loop = true;
    audioManager.soundEffects.game.volume = 0.2;
  }
}

/**
 * @function manageUnmuteAudioWinLose responsible for managing to play the audio when is not muted by detecting the current screen class and play the relevant music and set its volume.
 */
function manageUnmuteAudioWinLose() {
  if (!audioManager.isMuted) {
    if (winLoseImg.alt.includes("win")) {
      audioManager.winLoseMusic.win.play();
      audioManager.winLoseMusic.win.volume = 0.2;
    } else if (winLoseImg.alt.includes("lose")) {
      audioManager.winLoseMusic.gameOver.play();
      audioManager.winLoseMusic.gameOver.volume = 0.2;
    }
  }
}

/**
 * @function managePauseAudios responsible for pausing all game audios by calling @method pauseGameAudios of the audioManager for each category of audios.
 */
function managePauseAudios() {
  audioManager.pauseGameAudios(audioManager.soundEffects);
  audioManager.pauseGameAudios(audioManager.menuMusik);
  audioManager.pauseGameAudios(audioManager.winLoseMusic);
}

/**
 * @addEventListener for keyboard events to set set keyboard properties to true when the relevant keys are pressed down.
 */
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") keyboard.LEFT = true;
  if (event.key === "ArrowRight") keyboard.RIGHT = true;
  if (event.key === "ArrowUp") keyboard.UP = true;
  if (event.key === " ") keyboard.SPACE = true;
  if (event.key === "d") keyboard.THROW = true;
});

/**
 * @addEventListener for keyboard events to set set keyboard properties to false when the relevant keys are released.
 */
document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") keyboard.LEFT = false;
  if (event.key === "ArrowRight") keyboard.RIGHT = false;
  if (event.key === "ArrowUp") keyboard.UP = false;
  if (event.key === " ") keyboard.SPACE = false;
  if (event.key === "d") keyboard.THROW = false;
});
