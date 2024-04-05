import { LinkedList } from "./LinkedList.js";

/* last-in first-out Առաջին մտած էլեմենտը առաջինն էլ դուրս է գալիս */

class Stack {
  constructor() {
    this.stack = new LinkedList();
  }

  push(value) {
    this.stack.append(value);
  }

  pop() {
    const previousTail = this.stack.deleteTail();
    return previousTail ? previousTail.value : null;
  }
}

const stack = new Stack();

stack.push("Ashot");
stack.push("Narek");

// console.log(stack.pop()); //Narek
// console.log(stack.pop()); //Ashot
