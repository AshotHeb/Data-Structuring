class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(value) {
    this.root = new Node(value);
    this.count = 1;
  }

  size() {
    return this.count;
  }

  insert(value) {
    this.count++;

    let newNode = new Node(value);

    const searchTree = (node) => {
      // go to left
      if (value < node.value) {
        // no left child, append new node
        if (!node.left) {
          node.left = newNode;
        } else {
          searchTree(node.left);
        }
      }
      //go to right
      else if (value > node.value) {
        // no right child, append new node
        if (!node.right) {
          node.right = newNode;
        } else {
          searchTree(node.right);
        }
      }
    };

    //start searching from the root
    searchTree(this.root);
  }

  min() {
    //Ձախ կողմի ամենաներքևի ձախն է min -ը

    let currentNode = this.root;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode.value;
  }

  max() {
    // Աջ կողմի ամենավերևի արժեքը է max -ն է
    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode.value;
  }
  contains(value) {
    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.value) {
        return true;
      }

      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return false;
  }

  /* DepthFirst  search => looking branch by branch ( Ճյուղերովա search անում ) */

  // left root right
  // in ascending order (Աճման կարգով)
  // գնում են սկզբից ձախ և գտնում min-y հետո min-ի parent-ը հետո parent-ի աջ node-ը ու նուն ձև մինչև աջ կողմի ամենաներքևը ՝ մաքսիմումը
  inOrder() {
    const result = [];

    const traverse = (node) => {
      // if left child exists, go left again
      if (node.left) {
        traverse(node.left);
      }

      //capture the root node first
      result.push(node.value);

      // if right child exists, go right again
      if (node.right) {
        traverse(node.right);
      }
    };
    traverse(this.root);
  }

  // root left right

  preOrder() {
    let result = [];

    const traverse = (node) => {
      //capture the root node first
      result.push(node.value);

      // if left child exists, go left again
      if (node.left) {
        traverse(node.left);
      }

      // if right child exists, go right again
      if (node.right) {
        traverse(node.right);
      }
    };
    traverse(this.root);
  }

  // left right root

  postOrder() {
    let result = [];

    const traverse = (node) => {
      //capture the root node first
      result.push(node.value);

      // if left child exists, go left again
      if (node.left) {
        traverse(node.left);
      }

      // if right child exists, go right again
      if (node.right) {
        traverse(node.right);
      }
    };

    traverse(this.root);
  }

  // use a queue
  bfs() {
    /*BroaderFirst search => looking level by level  (մակարդակներովա search անում ) */
    // root ,left ,right
    let result = [];
    let queue = [];

    queue.push(this.root);

    while (queue.length) {
      let currentNode = queue.shift();

      result.push(currentNode.value);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return result;
  }

  //Amazon interview question
  //find the lowest common ancestor of two nodes in a binary search tree
  findGeneralParent(firstValue, secondValue) {
    let currentNode = this.root;

    while (currentNode) {
      if (firstValue < currentNode.value && secondValue < currentNode.value) {
        currentNode = currentNode.left;
      } else if (
        firstValue > currentNode.value &&
        secondValue > currentNode.value
      ) {
        currentNode = currentNode.right;
      } else {
        return currentNode.value;
      }
    }
  }
}

// BST
const bst = new BinarySearchTree(15);
bst.insert(3);
bst.insert(36);
bst.insert(2);
bst.insert(12);
bst.insert(28);
bst.insert(39);

//Main array
//15, 3 ,36 ,2 ,12 ,28 ,39

// in-order 2, 3, 12, 15, 28, 36, 39
// console.log("in-order", bst.inOrder());

// pre-order 15, 3, 2, 12, 36, 28, 39
// console.log("pre-order", bst.preOrder());

//post-order 2, 12, 3, 28, 39, 36, 15
// console.log("post-order", bst.postOrder());

//BFS
// 15, 3, 36, 2, 12, 28, 39
// bst.bfs();
