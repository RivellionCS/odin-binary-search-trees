class Tree {
  constructor(root) {
    this.root = buildTree(root);
  }

  buildTree(array) {
    const sortedArray = mergeSort(array);
  }

  mergesort(array) {
    if (array.length === 1) {
      return array;
    }

    const leftHalf = array.slice(0, parseInt(array.length / 2));
    const sortedLeft = this.mergesort(leftHalf);

    const rightHalf = array.slice(parseInt(array.length / 2), array.length);
    const sortedRight = this.mergesort(rightHalf);

    const mergedArray = [];
    let i = 0;
    let j = 0;

    while (i < sortedLeft.length && j < sortedRight.length) {
      if (sortedLeft[i] < sortedRight[j]) {
        mergedArray.push(sortedLeft[i++]);
      } else if (sortedLeft[i] === sortedRight[j]) {
        mergedArray.push(sortedLeft[i++]);
        j++;
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
}

class Node {
  constructor(data, leftChild, rightChild) {
    this.data = data;
  }
}
