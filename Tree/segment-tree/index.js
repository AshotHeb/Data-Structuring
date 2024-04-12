class SegmentTree {
  constructor(array) {
    this.array = array;
    this.tree = [...new Array(array.length).fill(0), ...array]; // [0 0 0 0 0 0 0 0 0 0 1 2 3 4 5 6 7 8 9 10]
    this._build(array, 0, array.length - 1);
  }

  _build(array, startIndex, endIndex) {
    if (startIndex === endIndex) {
      this.tree[0] = array[startIndex];
      return;
    }

    const length = array.length;

    for (let i = length - 1; i >= 0; i--) {
      this.tree[i] = Math.max(this.tree[2 * i], this.tree[2 * i + 1]);
      // [0 0 0 0 0 0 0 0 0 10 ...]
      // [0 0 0 0 0 0 0 0 8 10 ...]
      // [0 0 0 0 0 0 0 6 8 10 ...]
      //... Աջից ձախ դասավորվում են հերթով
    }
  }

  update(index, newValue) {
    const length = this.array.length;
    index += length;
    this.tree[index] = newValue;

    while (index > 1) {
      index = Math.floor(index / 2);
      this.tree[index] = Math.max(
        this.tree[2 * index],
        this.tree[2 * index + 1]
      );
    }
  }
}

const segmentTree = new SegmentTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log(segmentTree); // tree will be [10, 10 , 6, 10 , 2 ,4 ,6 ,8 10, 10 9 8 7 6 5 4 3 2 1]
