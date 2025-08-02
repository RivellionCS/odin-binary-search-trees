class Tree {
  constructor(array) {
    this.root = this.buildTree(this.removeDuplicates(this.mergeSort(array)));
  }

  buildTree(array) {
    // base cases
    if (array.length === 1) {
      return new Node(array[0]);
    }

    if (array.length === 0) {
      return null;
    }

    // select the middle element as root
    const root = new Node(array[Math.floor(array.length / 2)]);

    // split the array into 2 halves recursively
    const leftHalf = this.buildTree(
      array.slice(0, Math.floor(array.length / 2))
    );

    const rightHalf = this.buildTree(
      array.slice(Math.floor(array.length / 2) + 1, array.length)
    );

    // set the left and right children
    root.leftChild = leftHalf;
    root.rightChild = rightHalf;

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
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
  }
}
