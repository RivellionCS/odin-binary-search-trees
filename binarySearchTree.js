class Tree {
  constructor(array) {
    this.root = this.buildTree(this.removeDuplicates(this.mergeSort(array)));
  }

  buildTree(array, start = 0, end = array.length - 1) {
    // base case
    if (start > end) {
      return null;
    }

    // find the middle element
    let mid = start + Math.floor((end - start) / 2);

    // create root node
    let root = new Node(array[mid]);

    // create left subtree
    root.leftChild = this.buildTree(array, start, mid - 1);

    // create right subtree
    root.rightChild = this.buildTree(array, mid + 1, end);

    // return root
    return root;
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
    for (let i = 0; i < array.length; i++) {
      if (array[i] === array[i + 1]) {
        array.splice(i, 1);
        i--;
      }
    }
    return array;
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
  if (node.right !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(tree.root);
