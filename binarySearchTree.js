class Tree {
  constructor(array) {
    this.root = this.buildTree(this.removeDuplicates(this.mergeSort(array)));
  }

  buildTree(array) {
    return buildTreeRecursive(array, 0, array.length - 1);

    function buildTreeRecursive(array, start, end) {
      // base case
      if (start > end) {
        return null;
      }

      // find the middle element
      let mid = start + Math.floor((end - start) / 2);

      // create root node
      let root = new Node(array[mid]);

      // create left subtree
      root.leftChild = buildTreeRecursive(array, start, mid - 1);

      // create right subtree
      root.rightChild = buildTreeRecursive(array, mid + 1, end);

      // return root
      return root;
    }
  }

  mergeSort(array) {
    if (array.length === 1) {
      return array;
    }

    const leftHalf = array.slice(0, Math.floor(array.length / 2));
    const sortedLeft = this.mergeSort(leftHalf);

    const rightHalf = array.slice(Math.floor(array.length / 2), array.length);
    const sortedRight = this.mergeSort(rightHalf);

    const mergedArray = [];
    let i = 0;
    let j = 0;

    while (i < sortedLeft.length && j < sortedRight.length) {
      if (sortedLeft[i] < sortedRight[j]) {
        mergedArray.push(sortedLeft[i++]);
      } else {
        mergedArray.push(sortedRight[j++]);
      }
    }

    for (; i < sortedLeft.length; i++) {
      mergedArray.push(sortedLeft[i]);
    }
    for (; j < sortedRight.length; j++) {
      mergedArray.push(sortedRight[j]);
    }

    return mergedArray;
  }

  removeDuplicates(array) {
    const uniqueArray = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== array[i + 1]) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }

  insert(value) {
    return insertRecursive(value, this.root);

    function insertRecursive(value, root) {
      // base case
      if (root === null) {
        return new Node(value);
      }

      // make sure duplicates aren't added
      if (root.data === value) {
        return root;
      }

      // if value is less than the current node move left in the tree
      // otherwise move right
      if (value < root.data) {
        root.leftChild = insertRecursive(value, root.leftChild);
      } else if (value > root.data) {
        root.rightChild = insertRecursive(value, root.rightChild);
      }

      return root;
    }
  }

  delete(value) {
    return deleteNode(value, this.root);

    function getSuccessor(node) {
      node = node.rightChild;
      while (node !== null && node.leftChild !== null) {
        node = node.leftChild;
      }
      return node;
    }

    function deleteNode(value, root) {
      // base case
      if (root === null) {
        return root;
      }

      // If value to be searched is in a subtree
      if (root.data > value) {
        root.leftChild = deleteNode(value, root.leftChild);
      } else if (root.data < value) {
        root.rightChild = deleteNode(value, root.rightChild);
      } else {
        // If root matches with the given value

        // Case when root has 0 children or 1 child
        // When root only has right child
        if (root.leftChild === null) {
          return root.rightChild;
        }

        // When root has only left child
        if (root.rightChild === null) {
          return root.leftChild;
        }

        // When root has both children
        let successor = getSuccessor(root);
        root.data = successor.data;
        root.rightChild = deleteNode(successor.data, root.rightChild);
      }

      return root;
    }
  }

  find(value) {
    return findValueRecursive(value, this.root);

    function findValueRecursive(value, root) {
      // base case if value not found
      if (root.leftChild === null && root.rightChild === null) {
        return null;
      }

      // base case if value found
      if (root.data === value) {
        return root;
      }

      // if value is greater than root we move right
      // else we move left
      if (value > root.data) {
        return findValueRecursive(value, root.rightChild);
      } else if (value < root.data) {
        return findValueRecursive(value, root.leftChild);
      }
    }
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.delete(8);

prettyPrint(tree.root);

console.log(tree.find(5));
