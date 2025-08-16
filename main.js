import { Tree } from "./binarySearchTree.js";

// create array of numbers less than 100
const array = [5, 39, 26, 85, 66, 91, 47, 73];

// create the tree
const tree = new Tree(array);

// check if the tree is balanced;
console.log("Tree balance status: " + tree.isBalanced());

// function to print out node data
function printNodeData(node) {
  console.log(node.data);
}

// print out elements in level order
console.log("level order:");

tree.levelOrderForEach(printNodeData);

// print out elements in preorder
console.log("pre order:");

tree.preOrderForEach(printNodeData);

// print out elements in inorder
console.log("in order:");

tree.inOrderForEach(printNodeData);

// print out elements in postorder
console.log("post order:");

tree.postOrderForEach(printNodeData);

// add numbers greater than 100
tree.insert(181);
tree.insert(543);
tree.insert(444);
tree.insert(735);

// check if the tree is balanced again;
console.log("Tree balance status: " + tree.isBalanced());

// rebalance the tree
tree.rebalance();

// check balance after rebalancing
console.log("Tree balance status: " + tree.isBalanced());

// print out elements in level order
console.log("level order:");
tree.levelOrderForEach(printNodeData);

// print out elements in preorder
console.log("preorder:");

tree.preOrderForEach(printNodeData);

// print out elements in inorder
console.log("inorder:");

tree.inOrderForEach(printNodeData);

// print out elements in postorder
console.log("postorder:");

tree.postOrderForEach(printNodeData);
