/* 16.03.2024 Անցած շաբաթվա կրկնություն */

import Comparator from "./utils/comperator.js";

class LinkedListNode {
  constructor(value) {
    this.value = value;
  }
}

class LinkedList {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;

    this.compare = new Comparator(comparatorFunction);
  }

  append(value) {
    const node = new LinkedListNode(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }

    const prevElement = this.tail;
    prevElement.next = node;
    this.tail = node;
  }

  getAll() {
    const elements = [];

    if (!this.head) {
      return elements;
    }

    let currentElement = this.head;
    while (currentElement) {
      elements.push(currentElement.value);
      currentElement = currentElement.next;
    }

    return elements;
  }

  prepend(value) {
    // Make new node to be a head.
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  deleteTail() {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...

    // Rewind to the last node and delete "next" link for the node before the last one.
    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }
}

export { LinkedList, LinkedListNode };
/* Usage */

const linkedList = new LinkedList();

linkedList.append("Ashot");
linkedList.append("Narek");
linkedList.append("Aida");
linkedList.append("Ara");
linkedList.append("Gayane");
linkedList.append("Movses");

// console.log('linkedList', linkedList);
// console.log('all', linkedList.getAll());
