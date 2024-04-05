import { Heap } from "./Heap.js";

export class MaxHeap extends Heap {
  pairIsInCorrectOrder(firstElement, secondElement) {
    return this.compare.greaterThanOrEqual(firstElement, secondElement);
  }
}

const maxHeap = new MaxHeap();

maxHeap.insert(1, 1445);
maxHeap.insert(444, 2);
maxHeap.insert(999, 3);
maxHeap.insert(1616, 4);
maxHeap.insert(1, 1443);
maxHeap.insert(1, 1444);

maxHeap.extract();

maxHeap.extract();

// maxHeap.extract();
// console.log("maxHeap", maxHeap.heap);
