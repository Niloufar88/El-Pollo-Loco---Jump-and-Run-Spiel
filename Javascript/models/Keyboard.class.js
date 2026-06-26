class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  SPACE = false;
  THROW = false;

  listenersAdded = false;

  /**
   * @method touchButtons - define the touch Buttons
   */

  touchButtons() {
    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");
    const upButton = document.getElementById("up-button");
    const throwButton = document.getElementById("throw-button");

    return { leftButton, rightButton, upButton, throwButton };
  }

  /**
   * @method leftBtnTouchHandler - handle the touch events for the left button
   */

  leftBtnTouchHandler(leftButton) {
    leftButton.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.LEFT = true;
    });
    leftButton.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.LEFT = false;
    });
  }

  /**
   * @method rightBtnTouchHandler - handle the touch events for the right button
   */

  rightBtnTouchHandler(rightButton) {
    rightButton.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });
    rightButton.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });
  }

  /**
   * @method jumpBtnTouchHandler - handle the touch events for the jump button
   */

  jumpBtnTouchHandler(upButton) {
    upButton.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.UP = true;
    });
    upButton.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.UP = false;
    });
  }

  /**
   * @method throwBtnTouchHandler - handle the touch events for the throw button
   */

  throwBtnTouchHandler(throwButton) {
    throwButton.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.THROW = true;
    });
    throwButton.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.THROW = false;
    });
  }

  /**
   * @function setupTouchControls - sets up touch controls for the game
   * @returns accordingly to the input a function to handle touch event
   */

  setupTouchControls() {
    if (this.listenersAdded) return;
    const { leftButton, rightButton, upButton, throwButton } =
      this.touchButtons();
    if (!leftButton || !rightButton || !upButton || !throwButton) return;
    this.leftBtnTouchHandler(leftButton);
    this.rightBtnTouchHandler(rightButton);
    this.jumpBtnTouchHandler(upButton);
    this.throwBtnTouchHandler(throwButton);
    this.listenersAdded = true;
  }
}
