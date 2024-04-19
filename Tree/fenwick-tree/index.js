class FenwickTree {
  constructor(size) {
    this.tree = new Array(size + 1).fill(0);
  }

  // Updates the value at index 'i' by 'delta'.
  update(i, delta) {
    while (i < this.tree.length) {
      this.tree[i] += delta;
      i += i & -i; // Move to next node in the binary representation
    }
  }

  // Computes the prefix sum up to index 'i'.
  query(i) {
    let sum = 0;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & -i; // Move to parent node in the binary representation
    }
    return sum;
  }

  // Computes the sum of elements in the range [start, end].
  rangeQuery(start, end) {
    return this.query(end) - this.query(start - 1);
  }
}

// Example usage:
const arr = [1, 3, 5, 2, 7, 6, 4];
const n = arr.length;
const fenwickTree = new FenwickTree(n);

// Construct Fenwick Tree
for (let i = 0; i < n; i++) {
  fenwickTree.update(i + 1, arr[i]);
}

// Query examples
console.log("Prefix sum up to index 3:", fenwickTree.query(3)); // Output: 9 (1 + 3 + 5)
console.log("Sum of elements in range [2, 5]:", fenwickTree.rangeQuery(2, 5)); // Output: 17 (3 + 5 + 2 + 7)
