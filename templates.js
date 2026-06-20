/**
 * Renders the "How to Play" content section.
 * @returns HTML DOM Elements
 */
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

/**
 * Renders the "Controls" content section.
 * @returns HTML DOM Element
 */
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

/**
 * Renders the "Impressum" content section.
 * @returns HTML DOM Element
 */
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
