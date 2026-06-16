class AudioManager {
  //   WALK = new Audio(
  //     "assets/sounds/u_3x9ga8wevj-walking-sound-effect-272246.mp3",
  //   );
  //   BOTTLES = new Audio("assets/sounds/glass_bottle_open.mp3");
  //   COINS = new Audio(
  //     "assets/sounds/freesound_crunchpixstudio-drop-collect-384918.mp3",
  //   );
  //   HURT = new Audio("assets/sounds/mixkit-ow-exclamation-of-pain-2204.wav");
  //   BREAK = new Audio(
  //     "assets/sounds/mixkit-glass-break-with-hammer-thud-759.wav",
  //   );
  //   THROW = new Audio("assets/sounds/mixkit-quick-rope-throw-730.mp3");
  //   HIT = new Audio("assets/sounds/mixkit-wood-hard-hit-2182.wav");
  //   BOSS_GROWL = new Audio(
  //     "assets/sounds/dragon-studio-beast-growl-sound-376873.mp3",
  //   );
  //   BOSS_DEAD = new Audio(
  //     "assets/sounds/dragon-studio-rooster-doodle-doo-487665.mp3",
  //   );
  //   PEPE_DEAD = new Audio(
  //     "assets/sounds/universfield-male-death-scream-horror-352706.mp3",
  //   );
  //   GAME = new Audio("assets/sounds/safari.mp3");
  //   MENU = new Audio(
  //     "assets/sounds/ikoliks_aj-mexico-mexican-mariachi-music-468180.mp3",
  //   );
  //   CLICK = new Audio("assets/sounds/mixkit-mouse-click-close-1113 (1).wav");

  sounds = {};

  load(name, path) {
    let audio = new Audio();
    audio.src = path;
    audio.onload = () => {};
    audio.volume = 0.8;
    this.sounds[name] = audio;
  }

  loadSounds() {
    this.load(
      "walk",
      "assets/sounds/u_3x9ga8wevj-walking-sound-effect-272246.mp3",
    );
    this.load("bottles", "assets/sounds/glass_bottle_open.mp3");
    this.load(
      "coins",
      "assets/sounds/freesound_crunchpixstudio-drop-collect-384918.mp3",
    );
    this.load("hurt", "assets/sounds/mixkit-ow-exclamation-of-pain-2204.wav");
    this.load(
      "break",
      "assets/sounds/mixkit-glass-break-with-hammer-thud-759.wav",
    );
    this.load("throw", "assets/sounds/mixkit-quick-rope-throw-730.mp3");
    this.load("hit", "assets/sounds/mixkit-wood-hard-hit-2182.wav");
    this.load(
      "bossGrowl",
      "assets/sounds/dragon-studio-beast-growl-sound-376873.mp3",
    );
    this.load(
      "bossDead",
      "assets/sounds/dragon-studio-rooster-doodle-doo-487665.mp3",
    );
    this.load("game", "assets/sounds/safari.mp3");
    this.load(
      "menu",
      "assets/sounds/ikoliks_aj-mexico-mexican-mariachi-music-468180.mp3",
    );
    this.load("click", "assets/sounds/mixkit-mouse-click-close-1113 (1).wav");
    this.load("gameOver", "assets/sounds/mixkit-game-over-trombone-1940.wav");
    this.load("win", "assets/sounds/pw23check-winning-218995.mp3");
  }

  pauseGameSoundEffects() {
    for (let key in this.sounds) {
      this.sounds[key].pause();
      this.sounds[key].volume = 0;
      this.sounds[key].currentTime = 0;
    }
  }
}
