export class RedBlackNode {
  static color = {
    RED: "red",
    BLACK: "black",
  };

  constructor(key = null, parent = null) {
    this.key = key;
    this.parent = parent;
    this.left = null;
    this.right = null;
    this._color = RedBlackNode.color.RED;

    if (key === null) {
      //For nil nodes, we set the color to black (Վերջի էլեմենտները ծառի )
      this._color = RedBlackNode.color.BLACK;
    } else {
      //For all other nodes, we set the color to red
      this._color = RedBlackNode.color.RED;
      this.left = new RedBlackNode(null, this);
      this.right = new RedBlackNode(null, this);
    }
  }

  get isRed() {
    return this._color === RedBlackNode.color.RED;
  }

  get isBlack() {
    return this._color === RedBlackNode.color.BLACK;
  }

  get isNil() {
    return this.key === null;
  }

  set color(newColor) {
    if (!this.isNil) {
      this._color = newColor;
    }
  }
}
