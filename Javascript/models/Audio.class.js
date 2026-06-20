/**
 * @class AudioManager 
 * responsible for managing all game audio including sound effects, menu music, and win/lose music.
 * @property {Object} soundEffects and emtpy object to store all sound effect audio files.
 * @property {Object} menuMusik and emtpy object to store all menu music audio files.
 * @property {Object} winLoseMusic and emtpy object to store all win/lose music audio files.
 * @property {boolean} isMuted indicates whether the game audio is currently muted or not.
 
 */
class AudioManager {
  soundEffects = {};
  menuMusik = {};
  winLoseMusic = {};
  isMuted = true;

  /**
   * @method load Loads an audio file and stores it in the specified library.
   * @param {string} name - The name of the audio to be used as a key in the library.
   * @param {string} path - The file path to the audio file.
   * @param {object} library - The audio library (soundEffects, menuMusik, or winLoseMusic) where the audio will be stored.
   */
  load(name, path, library) {
    let audio = new Audio();
    audio.src = path;
    audio.onload = () => {};
    audio.volume = 0.8;
    library[name] = audio;
  }

  /**
   * @method loadSoundEffects Loads all sound effects into the soundEffects library.
   */
  loadSoundEffects() {
    this.load(
      "walk",
      "assets/sounds/u_3x9ga8wevj-walking-sound-effect-272246.mp3",
      this.soundEffects,
    );
    this.load(
      "bottles",
      "assets/sounds/glass_bottle_open.mp3",
      this.soundEffects,
    );
    this.load(
      "coins",
      "assets/sounds/freesound_crunchpixstudio-drop-collect-384918.mp3",
      this.soundEffects,
    );
    this.load(
      "hurt",
      "assets/sounds/mixkit-ow-exclamation-of-pain-2204.wav",
      this.soundEffects,
    );
    this.load(
      "break",
      "assets/sounds/mixkit-glass-break-with-hammer-thud-759.wav",
      this.soundEffects,
    );
    this.load(
      "throw",
      "assets/sounds/mixkit-quick-rope-throw-730.mp3",
      this.soundEffects,
    );
    this.load(
      "hit",
      "assets/sounds/mixkit-wood-hard-hit-2182.wav",
      this.soundEffects,
    );
    this.load(
      "bossGrowl",
      "assets/sounds/dragon-studio-beast-growl-sound-376873.mp3",
      this.soundEffects,
    );
    this.load(
      "bossDead",
      "assets/sounds/dragon-studio-rooster-doodle-doo-487665.mp3",
      this.soundEffects,
    );
    this.load("game", "assets/sounds/safari.mp3", this.soundEffects);
    this.load(
      "pepeDead",
      "assets/sounds/universfield-male-death-scream-horror-352706.mp3",
      this.soundEffects,
    );
    this.load(
      "snoring",
      "assets/sounds/audiopapkin-male-snoring-297875.mp3",
      this.soundEffects,
    );
  }

  /**
   * * @method loadMenuMusik Loads all menu music into the menuMusik library.
   */
  loadMenuMusik() {
    this.load(
      "menu",
      "assets/sounds/ikoliks_aj-mexico-mexican-mariachi-music-468180.mp3",
      this.menuMusik,
    );
    this.load(
      "click",
      "assets/sounds/mixkit-mouse-click-close-1113 (1).wav",
      this.menuMusik,
    );
  }

  /**
   * @method loadWinLoseMusic Loads all win/lose music into the winLoseMusic library.
   */
  loadWinLoseMusic() {
    this.load(
      "gameOver",
      "assets/sounds/mixkit-game-over-trombone-1940.wav",
      this.winLoseMusic,
    );
    this.load(
      "win",
      "assets/sounds/pw23check-winning-218995.mp3",
      this.winLoseMusic,
    );
  }

  /**
   *  @method loadAllSounds Loads all audio files for sound effects, menu music, and win/lose music.
   */
  loadAllSounds() {
    this.loadMenuMusik();
    this.loadSoundEffects();
    this.loadWinLoseMusic();
  }

  /**
   * @method pauseGameAudios Pauses and resets the current time of all audio files in the specified library.
   * @param {object} audioLibrary - The audio library to be paused (soundEffects, menuMusik, or winLoseMusic).
   */
  pauseGameAudios(audioLibrary) {
    for (let key of Object.keys(audioLibrary)) {
      audioLibrary[key].pause();
      audioLibrary[key].currentTime = 0;
    }
  }
}
