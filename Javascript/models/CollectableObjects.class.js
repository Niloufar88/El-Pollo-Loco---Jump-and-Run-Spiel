class CollectableObjects extends DrawableObjects {
  //state
  isCollected = false;

  constructor() {
    super();
  }

  collected() {
    this.isCollected = true;
  }
}
