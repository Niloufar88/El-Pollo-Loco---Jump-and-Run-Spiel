//Screens and Buttons Variables
const startGameBtn = document.getElementById("startGame-btn");
const startScreen = document.getElementById("start-screen");
const howToPlayBtn = document.getElementById("howToPlay-btn");
const contentContainer = document.getElementById("contents");
const controlsBtn = document.getElementById("controls-btn");

//start Game handler
startGameBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  gameInit();
});

//side-Screen function
function showRelevantContent(func) {
  contentContainer.innerHTML = "";
  contentContainer.style.visibility = "visible";
  contentContainer.innerHTML = func;
  contentContainer.style.padding = "24px";
}
