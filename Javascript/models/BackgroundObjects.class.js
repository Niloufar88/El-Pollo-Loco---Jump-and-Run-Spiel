/**
 * @class BackgroundObjects
 * represents the background elements in the game.
 * @extends MovableObject
 * @param {string} imagePath
 */
class BackgroundObjects extends MovableObject {
  constructor(imagePath) {
    super();
    this.loadImage(imagePath);

    //Position and size of the background objects
    this.x = -202;
    this.y = 0;
    this.width = 720 * 2;
    this.height = 480;
  }
}
