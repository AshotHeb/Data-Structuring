class GraphNode {
  constructor(value) {
    this.value = value;
    this.edges = [];
  }

  getKey() {
    return this.value;
  }
}

class DirectedGraph {
  constructor() {
    this.adjacentList = {};
  }

  addVertex(value) {
    if (!this.adjacentList[value]) {
      this.adjacentList[value] = new GraphNode(value);
    }
  }

  addEdge(source, destination, weight) {
    if (!this.adjacentList[source] || !this.adjacentList[destination]) {
      return;
    }

    this.adjacentList[source].edges.push({ node: destination, weight });
  }

  display() {
    console.log("Directed Graph -------------");
    for (let key in this.adjacentList) {
      const vertex = this.adjacentList[key];
      console.log(
        `${vertex.getKey()} -> ${vertex.edges
          .map((edge) => edge.node)
          .join(", ")}`
      );
    }
  }

  getClosestVertex(vertexKey) {
    const edges = this.adjacentList[vertexKey].edges;

    return edges.reduce((min, edge) => {
      if (min.weight > edge.weight) {
        return edge;
      }

      return min;
    }, edges[0]);
  }
}

const directedGraph = new DirectedGraph();
directedGraph.addVertex("A");
directedGraph.addVertex("B");
directedGraph.addVertex("C");

directedGraph.addEdge("A", "B", 10);
directedGraph.addEdge("A", "C", 15);

// directedGraph.display();

// console.log("Min weight of A:", directedGraph.getClosestVertex("A"));
