class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1; // Height of node is 1 by default
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  // Method to insert a value
  insert(value) {
    this.root = this._insert(this.root, value);
  }

  // Helper method for insert
  _insert(node, value) {
    // Perform standard BST insert
    if (node === null) {
      return new Node(value);
    }

    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else if (value > node.value) {
      node.right = this._insert(node.right, value);
    } else {
      // Equal values are not allowed in BST
      return node;
    }

    // Update height of this ancestor node
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));

    // Get the balance factor
    let balance = this._getBalance(node);

    // If this node becomes unbalanced, then there are 4 cases

    // Left Left Case
    if (balance > 1 && value < node.left.value) {
      return this._rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && value > node.right.value) {
      return this._leftRotate(node);
    }

    // Left Right Case
    if (balance > 1 && value > node.left.value) {
      return this._leftRightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && value < node.right.value) {
      return this._rightLeftRotate(node);
    }

    // Return the (unchanged) node pointer
    return node;
  }

  // Method to perform right rotation
  _rightRotate(y) {
    // y is the node on which we are performing the rotation
    // x is the left child of y
    let x = y.left;
    let T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;
    x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;

    // Return new root
    return x;
  }

  // Method to perform left rotation
  _leftRotate(x) {
    let y = x.right;
    let T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;
    y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;

    // Return new root
    return y;
  }

  // Method to perform left-right rotation
  _leftRightRotate(node) {
    // First perform left rotation on the left child
    node.left = this._leftRotate(node.left);

    // Then perform right rotation on the node and return it
    return this._rightRotate(node);
  }

  _rightLeftRotate(node) {
    // First perform right rotation on the right child
    node.right = this._rightRotate(node.right);

    // Then perform left rotation on the node and return it
    return this._leftRotate(node);
  }

  // Get height of node
  _getHeight(node) {
    if (node === null) {
      return 0;
    }
    return node.height;
  }

  // Get balance factor of node
  _getBalance(node) {
    if (node === null) {
      return 0;
    }
    return this._getHeight(node.left) - this._getHeight(node.right);
  }
}
