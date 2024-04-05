//Trie data structure use for audocomplete, spell checker, IP routing, prefix matching, etc.

import { TrieNode } from "./TrieNode.js";

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }

      current = current.children[char];
    }

    current.isEndOfWord = true;
  }

  delete(word) {
    const deleteHelper = (node, word, index) => {
      if (index === word.length) {
        if (!node.isEndOfWord) {
          return false;
        }

        node.isEndOfWord = false;

        return Object.keys(node.children).length === 0;
      }

      const char = word[index];
      const childNode = node.children[char];

      if (!childNode) {
        return false;
      }

      const shouldDeleteCurrentNode = deleteHelper(childNode, word, index + 1);

      if (shouldDeleteCurrentNode) {
        delete node.children[char];
        return Object.keys(node.children).length === 0;
      }

      return false;
    };

    deleteHelper(this.root, word, 0);
  }

  contains(word) {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const charToFind = word[i];

      if (!current.children[charToFind]) {
        return false;
      }

      current = current.children[charToFind];
    }

    return current.isEndOfWord;
  }

  startsWidthPrefix(prefix) {
    let current = this.root;

    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];

      if (!current.children[char]) {
        return false;
      }

      current = current.children[char];
    }

    return true;
  }
}

const trie = new Trie();

trie.insert("hello");
console.log("root", trie.root);
