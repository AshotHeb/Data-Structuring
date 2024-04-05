import { LinkedListNode } from "../LinkedList.js";
import Comparator from "../utils/comperator.js";
import { generateUniquenumberId } from "../utils/uniqueId.js";

//Prority Queue implemantaion with Heap
//Priority -ները կարող է թվալ թե սխալ են դասավորված ,բայց որ սարքենք այդ զանգվածից ծառ կտեսնենք,որ ամենինչ ճիշտ է դասավորված

export class Heap {
  constructor(comparatorFunction) {
    this.heap = [];
    this.compare = new Comparator(comparatorFunction);
  }

  //helper functions

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  getRightChildIndex(index) {
    return index * 2 + 2;
  }

  swap(indexOne, indexTwo) {
    const temp = this.heap[indexTwo];
    this.heap[indexTwo] = this.heap[indexOne];
    this.heap[indexOne] = temp;
  }

  //Main operations

  //Insert an element into the priority queue with a given priority.
  insert(value, priority = generateUniquenumberId()) {
    const newNode = new LinkedListNode({
      value,
      priority,
    });

    this.heap.push(newNode);
    this.heapifyUp();
  }

  isEmpty() {
    return this.heap.length === 0;
  }
  heapifyDown(index = 0) {
    // Այս մեթոդը առաջին էլեմենտից(կամ այլ տրված index-ից) ստուգում է այն արդյոք ճիշտ է դասավորված
    //Ստուգում է left and right child-երի մեծ կամ փոքր լինելը կախված minHeap է թե maxHeap
    //Եթե շեղում է լինում ՝ փոխում է որը ամենամեծն է կամ ամենափոքրն է

    //TODO test this method

    if (this.isEmpty()) {
      return;
    }

    const element = this.heap[index]?.value;

    const leftChildIndex = this.getLeftChildIndex(index);
    const leftChild = this.heap[leftChildIndex]?.value;

    if (!element || !leftChild) {
      return;
    }

    const leftChildPriority = leftChild.priority;
    const elementPriority = element.priority;

    const rightChildIndex = this.getRightChildIndex(index);
    const rigthChild = this.heap[rightChildIndex]?.value;

    if (rigthChild) {
      const rightChildPriority = rigthChild.priority;
      const isRightChildHigherPriority =
        this.pairIsInCorrectOrder(rightChildPriority, elementPriority) &&
        this.pairIsInCorrectOrder(rightChildPriority, leftChildPriority);

      if (isRightChildHigherPriority) {
        this.swap(index, rightChildIndex);
        return this.heapifyDown(rightChildIndex);
      }
    }

    if (this.pairIsInCorrectOrder(leftChildPriority, elementPriority)) {
      this.swap(index, leftChildIndex);
      return this.heapifyDown(leftChildIndex);
    }
  }

  heapifyUp(index) {
    // Այս մեթոդը ստուգում է վերջի ավելացրած էլեմենտից մինչև սկիզբ արդյոք բոլարը ճիշտ է դասավորված
    //MinHeap ի դեպքում պետք է իր parent-ի priority-ն փոքր լինի այն դասավորված էլեմենտից
    //MaxHeap ի դեպքում պետք է իր parent-ի priority-ն մեծ լինի այն դասավորված էլեմենտից
    // Եթե այն ճիշտ չէ ապա այնը փոխարինվում է իր parent-ի հետ
    if (this.isEmpty()) {
      return;
    }

    const elementIndex = index !== undefined ? index : this.heap.length - 1;
    const element = this.heap[elementIndex];

    if (!element) {
      return;
    }

    const { priority } = element.value;

    const parentIndex = this.getParentIndex(elementIndex);
    const parent = this.heap[parentIndex]?.value;

    if (!parent) {
      return;
    }

    const { priority: parentPriority } = parent;

    if (!this.pairIsInCorrectOrder(parentPriority, priority)) {
      this.swap(elementIndex, parentIndex);
      return this.heapifyUp(elementIndex);
    }
  }

  //Extract the element with the highest priority from the priority queue.
  extract() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return root;
  }

  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @return {boolean}
   */
  /* istanbul ignore next */
  pairIsInCorrectOrder(firstElement, secondElement) {
    // For MinHeap the first element must be always smaller or equal.
    //For MaxHeap the first element must be always bigger or equal.

    throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
    `);
  }
}
