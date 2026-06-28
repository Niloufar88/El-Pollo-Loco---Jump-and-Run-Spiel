/**
 * Renders the "How to Play" content section.
 * @returns HTML DOM Elements
 */
function renderHowToPlayContent() {
  return `
            <h3 class="header">HOW TO PLAY</h3>
            <div class="content-text">
              <ul>
                <li>" Collect coins scattered throughout the world"</li>
                <li>" Collect bottles to use as weapons"</li>
                <li>" Jump on small chickens to defeat them"</li>
                <li>" Throw bottles at the Boss Chicken to damage it"</li>
                <li>" Avoid getting hit by enemies"</li>
                <li>" Defeat the Boss to win the game!"</li>
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
                <li>"  Arrow Right", action: "Move Right"</li>
                <li>"  Arrow Left", action: "Move Left"</li>
                <li>"  Arrow Up / Space", action: "Jump"</li>
                <li>"  D", action: "Throw Bottle"</li>
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
              <h3> Impressum </h3>
              <p> Angaben gemäß § 5 DDG</p>
              <ul>
                <li> Niloufar Shirvani</li>
                <li> Omid Siedlung 20/72 </li>
                <li> 16897 Teheran</li>
                </ul>
                <p> <strong>Vertreten durch: </strong><br>
                Niloufar Shirvani<br>
                </p> 
                <h3> Kontakt </h3>
                <ul>
                <li> Telephone: +98 912 3272389</li>
                <li> Email: niloufar88@hotmail.com</li><br>
                </ul>
                <p><strong>Verbraucherstreitbeilegung / Universalschlichtungsstelle</strong>
                <br>Wir nehmen nicht an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil und sind dazu auch nicht verpflichtet.
                </p> 
                <p> Impressum von <a href="https://impressum-generator.de" rel="dofollow">Impressum-Generator.de</a>. Powered by <a href="https://www.kanzlei-hasselbach.de/" rel="nofollow">Franziska Hasselbach, Bonn</a>.
                </p>
                <li> © 2026 - El Pollo Loco Project</li>
              
            </div>
          </div>
  `;
}
