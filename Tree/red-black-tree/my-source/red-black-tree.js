import { RedBlackNode } from "./red-black-tree-node.js";

const COLOR = {
  RED: "RED",
  BLACK: "BLACK",
};

export class RedBlackTree {
  constructor() {
    this.root = null;
  }

  /* Adjust Methods */

  _handleBlackUncle(node) {}

  _adjustTreeAfterInsertion(node) {
    if (node.parent === null) {
      // No Parent
      node.color = COLOR.BLACK;
    } else if (node.parent.isRed) {
      //Parent is Red
      const parentNode = node.parent;
      const grandParentNode = parentNode.parent;
      const uncleNode =
        grandParentNode.left === parentNode
          ? grandParentNode.right
          : grandParentNode.left;

      if (uncleNode.isBlack) {
        //Red Parent Black Uncle
        this._handleBlackUncle(node);
      } else {
        //Red Parent Red Uncle
        this._handleRedUncle(parentNode, uncleNode, grandParentNode);
      }
    }

    //do nothing if parent is Black
  }

  _handleRedUncle(parentNode, uncleNode, grandParentNode) {
    parentNode.color = COLOR.BLACK;
    uncleNode.color = COLOR.BLACK;
    grandParentNode.color = COLOR.RED;
    this._adjustTreeAfterInsertion(grandParentNode);
  }

  /* Insertion Methods */

  insert(key) {
    const newNode = this.createNode(key);
    if (this.root === null) {
      // If the tree is empty, create a new node and set it as root
      this.root = newNode;
    } else {
      this._insertNode(newNode);
    }

    this._adjustTreeAfterInsertion(newNode);
  }

  _insertNode(node, currentNode = this.root) {
    // go to Right
    if (node.key > currentNode.key) {
      //currentNode has no right child
      if (currentNode.right === null) {
        currentNode.right = node;
        node.parent = currentNode;
      } else {
        //go deeper
        this._insertNode(node, currentNode.right);
      }
    } else {
      // go to Left
      if (currentNode.left === null) {
        //currentNode has no left child
        currentNode.left = node;
        node.parent = currentNode;
      } else {
        //go deeper
        this._insertNode(node, currentNode.left);
      }
    }
  }

  createNode(key = null, parent = null) {
    return new RedBlackNode(key, parent);
  }

  /* Test Methods */
  print() {
    this._printNode();
  }

  _printNode = (node = this.root, spaceCount = 0, label = "* ") => {
    // Thid method prints the tree starting from the node (default is root)
    if (node == null) return;

    console.log(
      `${" -".repeat(spaceCount)}${label}${node.key} (${node.color})`
    );

    if (node.isNil) return;

    this._printNode(node.right, spaceCount + 2, "R: ");
    this._printNode(node.left, spaceCount + 2, "L: ");
  };
}

const redBlackTree = new RedBlackTree();
redBlackTree.insert(10);
// console.log("🚀 ~ redBlackTree:", redBlackTree);
