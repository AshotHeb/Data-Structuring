class GraphNode {
  constructor(name) {
    this.name = name;
    this.edges = [];
  }

  getKey() {
    return this.name;
  }
}

class UnDirectedGraph {
  constructor() {
    this.adjacentList = {};
  }

  addVertex(name) {
    if (!this.adjacentList[name]) {
      this.adjacentList[name] = new GraphNode(name);
    }
  }

  addEdge(source, destination, weight) {
    if (!this.adjacentList[source] || !this.adjacentList[destination]) {
      return;
    }

    this.adjacentList[source].edges.push({ value: destination, weight });
    this.adjacentList[destination].edges.push({ value: source, weight });
  }

  display() {
    console.log("UnDirected Graph -------------");

    for (let key in this.adjacentList) {
      const vertex = this.adjacentList[key];
      console.log(
        `${vertex.getKey()} -> ${vertex.edges
          .map((edge) => edge.value)
          .join(", ")}`
      );
    }
  }

  deleteEdge(first, second) {
    this.adjacentList[first].edges = this.adjacentList[first].edges.filter(
      (edge) => edge.value !== second
    );

    this.adjacentList[second].edges = this.adjacentList[second].edges.filter(
      (edge) => edge.value !== first
    );
  }

  deleteVertex(vertexName) {
    const edges = this.adjacentList[vertexName].edges;

    edges.forEach((currentVertex) => {
      this.deleteEdge(vertexName, currentVertex.value);
    });

    delete this.adjacentList[vertexName];
  }
}

const undirectedGraph = new UnDirectedGraph();
undirectedGraph.addVertex("A");
undirectedGraph.addVertex("B");
undirectedGraph.addVertex("C");

undirectedGraph.addEdge("A", "B", 10);
undirectedGraph.addEdge("A", "C", 20);
undirectedGraph.addEdge("B", "C", 30);

undirectedGraph.deleteVertex("B");

undirectedGraph.display();
