function renderHowToPlayContent() {
  return `
            <h3 class="header">HOW TO PLAY</h3>
            <div class="content-text">
              <ul>
                <li>"🪙 Collect coins scattered throughout the world"</li>
                <li>"🍾 Collect bottles to use as weapons"</li>
                <li>"🐔 Jump on small chickens to defeat them"</li>
                <li>"🍾 Throw bottles at the Boss Chicken to damage it"</li>
                <li>"❤️ Avoid getting hit by enemies"</li>
                <li>"🏆 Defeat the Boss to win the game!"</li>
              </ul>
            </div>
          </div>
       
    `;
}

function renderControlsContent() {
  return `
  <h3 class="header">CONTROLS</h3>
            <div class="content-text">
              <ul>
                <li>"➡️ Arrow Right", action: "Move Right"</li>
                <li>"⬅️ Arrow Left", action: "Move Left"</li>
                <li>"⏫ Arrow Up / Space", action: "Jump"</li>
                <li>"🍾 D", action: "Throw Bottle"</li>
              </ul>
            </div>
          </div>
  `;
}

function renderImpressumContent() {
  return `
  <h3 class="header">IMPRESSUM</h3>
            <div class="content-text">
              <ul>
                <li>"⭐ Graphics: Developer Akademie Assets"</li>
                <li>"⭐ Sound Effects: Freesound.org / Mixkit.co /",
        "Pixabay.com"</li>
                <li>"⭐ Music: Safari Theme from opengameart.org"</li>
                <li>"⭐ Game Programming: Niloufar"</li>
                <li>"⭐ © 2026 - El Pollo Loco Project"</li>
              </ul>
            </div>
          </div>
  `;
}

function renderWinLoseScreen() {
  return `
  <div class="btns">
          <!-- GAME BUTTONS -->
          <div id="gameBtns" data-id="win-lose-game-btn">
            <!-- BACK TO MENU -->
            <button id="backToMenu-btn" onclick="backToMenu(event)">
              Back to Menu
            </button>

            <!-- RESTART GAME -->
            <button id="restartGame-btn" onclick="restartGame()">Restart game</button>
          </div>

          <!-- CONFIG BUTTONS -->
          <div class="configBtns" data-id="win-lose-config-btn">
            <!-- MUTE BUTTON -->
            <button class="audio-btn" aria-label="audio-button">
              <img src="assets/Icons/volume-xmark-solid.png" alt="audio-btn" />
            </button>
            <!-- FULLSCREEN BUTTON -->
            <button class="fullScreen-btn" aria-label="fullscreen-button">
              <i class="fa-solid fa-expand"></i>
            </button>
          </div>
        </div>
  `;
}
