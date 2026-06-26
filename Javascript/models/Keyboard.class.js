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
    leftButton.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        this.LEFT = false;
      },
      { passive: false },
    );
    leftButton.addEventListener(
      "touchcancel",
      (e) => {
        this.LEFT = false;
      },
      { passive: false },
    );
    this.leftBtnPointerHandler(leftButton);
  }

  /**
   * @method leftBtnPointerHandler - handle the pointer events for the left button
   */
  leftBtnPointerHandler(leftButton) {
    leftButton.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this.LEFT = true;
      leftButton.setPointerCapture(e.pointerId);
    });
    leftButton.addEventListener("pointerup", (e) => {
      e.preventDefault();
      this.LEFT = false;
      leftButton.releasePointerCapture(e.pointerId);
    });
    leftButton.addEventListener("pointercancel", (e) => {
      this.LEFT = false;
      leftButton.releasePointerCapture(e.pointerId);
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
    rightButton.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        this.RIGHT = false;
      },
      { passive: false },
    );
    rightButton.addEventListener(
      "touchcancel",
      (e) => {
        this.RIGHT = false;
      },
      { passive: false },
    );
    this.rightBtnPointerHandler(rightButton);
  }

  /**
   * @method rightBtnPointerHandler - handle the pointer events for the right button
   */
  rightBtnPointerHandler(rightButton) {
    rightButton.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this.RIGHT = true;
      rightButton.setPointerCapture(e.pointerId);
    });
    rightButton.addEventListener("pointerup", (e) => {
      e.preventDefault();
      this.RIGHT = false;
      rightButton.releasePointerCapture(e.pointerId);
    });
    rightButton.addEventListener("pointercancel", (e) => {
      this.RIGHT = false;
      rightButton.releasePointerCapture(e.pointerId);
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
    upButton.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        this.UP = false;
      },
      { passive: false },
    );
    upButton.addEventListener(
      "touchcancel",
      (e) => {
        this.UP = false;
      },
      { passive: false },
    );
    this.upBtnPointerHandler(upButton);
  }

  /**
   * @method upBtnPointerHandler - handle the pointer events for the jump button
   */
  upBtnPointerHandler(upButton) {
    upButton.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this.UP = true;
      upButton.setPointerCapture(e.pointerId);
    });
    upButton.addEventListener("pointerup", (e) => {
      e.preventDefault();
      this.UP = false;
      upButton.releasePointerCapture(e.pointerId);
    });
    upButton.addEventListener("pointercancel", (e) => {
      this.UP = false;
      upButton.releasePointerCapture(e.pointerId);
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
    throwButton.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        this.THROW = false;
      },
      { passive: false },
    );
    throwButton.addEventListener(
      "touchcancel",
      (e) => {
        this.THROW = false;
      },
      { passive: false },
    );

    this.throwBtnPointerHandler(throwButton);
  }

  /**
   * @method throwBtnPointerHandler - handle the pointer events for the throw button
   */
  throwBtnPointerHandler(throwButton) {
    throwButton.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this.THROW = true;
      throwButton.setPointerCapture(e.pointerId);
    });
    throwButton.addEventListener("pointerup", (e) => {
      e.preventDefault();
      this.THROW = false;
      throwButton.releasePointerCapture(e.pointerId);
    });
    throwButton.addEventListener("pointercancel", (e) => {
      this.THROW = false;
      throwButton.releasePointerCapture(e.pointerId);
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
