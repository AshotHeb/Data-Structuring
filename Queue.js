import { LinkedList, LinkedListNode } from './LinkedList.js'

class Queue {
    constructor() {
        this.queueItems = new LinkedList()
    }

    enqueue(value) {
        this.queueItems.prepend(value)
    }

    dequeue() {
        const deletedElement = this.queueItems.deleteTail()
        return deletedElement ? deletedElement.value : null
    }
}

/* Usage */

const queue = new Queue()

queue.enqueue('Ashot')
queue.enqueue('Narek')

/* First-in first-out */

// console.log('Enque 1 = ', queue.dequeue()); //Ashot
// console.log('Enque 2 = ', queue.dequeue()); //Narek