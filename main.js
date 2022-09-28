console.clear();
console.log('START NEW SESSION ---------------');

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  root = null;
  constructor(arr) {
    this.array = [...new Set(arr)];
    this.buildTree(this.array);
  }

  buildTree() {
    this.array.sort((a, b) => (a > b ? 1 : -1));

    this.root = function build(start, end) {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);

      const newNode = new Node(this.array[mid]);
      newNode.left = build.call(this, start, mid - 1);
      newNode.right = build.call(this, mid + 1, end);

      return newNode;
    }.call(this, 0, this.array.length - 1);
  }

  insert(data) {
    return function traverse(head) {
      if (data < head.data) {
        if (head.left === null) {
          head.left = new Node(data);
          return head.left;
        }
        return traverse(head.left);
      }
      if (data >= head.data) {
        if (head.right === null) {
          head.right = new Node(data);
          return head.right;
        }
        return traverse(head.right);
      }
    }.call(this, this.root);
  }

  delete(data) {
    this.root = deleteRec.call(this, this.root, data);

    function findSmallest(node) {
      if (node.left === null) return node.data;
      return findSmallest(node.left);
    }

    function deleteRec(root, data) {
      if (root == null) return root;

      if (data < root.data) root.left = deleteRec.call(this, root.left, data);
      else if (data > root.data)
        root.right = deleteRec.call(this, root.right, data);
      else {
        // node with only one child or no child
        if (root.left == null) return root.right;
        else if (root.right == null) return root.left;

        // node with two children: Get the inorder successor
        root.data = findSmallest(root.right);

        // Delete the inorder successor
        root.right = deleteRec.call(this, root.right, root.data);
      }

      return root;
    }
  }

  find(data) {
    if (data === undefined) return null;

    return (function trav(root) {
      if (root === null) return null;
      if (root.data === data) {
        return root;
      }

      if (data < root.data) return trav(root.left);
      if (data > root.data) return trav(root.right);
    })(this.root);
  }

  levelOrder(cb) {
    let q = [this.root];
    const array = [];

    (function traverse(head) {
      if (head === undefined) return;

      if (cb) {
        cb(head);
      } else {
        array.push(head);
      }

      if (head.left !== null) q.push(head.left);
      if (head.right !== null) q.push(head.right);
      q = q.slice(1);

      return traverse(q[0]);
    })(q[0]);

    if (!cb) return array;
  }

  inOrder(cb) {
    const array = [];

    (function trav(root) {
      if (root === null) return;

      trav(root.left);
      if (cb) {
        cb(root);
      } else {
        array.push(root);
      }
      trav(root.right);
    })(this.root);

    if (!cb) return array;
  }

  preOrder(cb) {
    const array = [];

    (function trav(root) {
      if (root === null) return;

      if (cb) {
        cb(root);
      } else {
        array.push(root);
      }
      trav(root.left);
      trav(root.right);
    })(this.root);

    if (!cb) return array;
  }

  postOrder(cb) {
    const array = [];

    (function trav(root) {
      if (root === null) return;

      trav(root.left);
      trav(root.right);
      if (cb) {
        cb(root);
      } else {
        array.push(root);
      }
    })(this.root);

    if (!cb) return array;
  }

  height(node) {
    let heights = [];
    (function trav(head, height) {
      if (head === null) {
        heights.push(height - 1);
        return;
      }

      trav(head.left, height + 1);
      trav(head.right, height + 1);
    })(node, 0);

    return Math.max(...heights);
  }

  depth(node) {
    if (node === null) return node;

    return (function trav(head, height) {
      if (head === null) {
        return null;
      }
      if (node.data === head.data && head === node) {
        return height;
      }
      if (node.data < head.data) {
        return trav(head.left, height + 1);
      }
      if (node.data > head.data) {
        return trav(head.right, height + 1);
      }
    })(this.root, 0);
  }

  isBalanced() {
    const leftHeight = this.height(this.root.left);
    const rightHeight = this.height(this.root.right);

    if (Math.abs(leftHeight - rightHeight) <= 1) return true;
    else return false;
  }

  rebalance() {
    const values = [];

    this.inOrder((node) => values.push(node.data));

    this.array = [...new Set(values)];
    this.buildTree();
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNumberArray(size, min, max) {
  const array = [];

  for (let i = 0; i < size; i++) {
    array.push(getRandomInt(min, max));
  }

  return array;
}

function driverScript() {
  const BST = new Tree(randomNumberArray(100, -1, 100));
  // prettyPrint(BST.root);
  console.log(`Tree balanced ${BST.isBalanced()}`);
  console.log('Printing Level');
  BST.levelOrder((node) => console.log(node.data));
  console.log('----------------------------------');
  console.log('Printing pre order');
  BST.preOrder((node) => console.log(node.data));
  console.log('----------------------------------');
  console.log('Printing in order');
  BST.inOrder((node) => console.log(node.data));
  console.log('----------------------------------');
  console.log('Printing post order');
  BST.postOrder((node) => console.log(node.data));
  console.log('----------------------------------');

  for (let i = 0; i < 50; i++) {
    BST.insert(getRandomInt(100, 1000));
  }

  // prettyPrint(BST.root);

  console.log(`Tree balanced ${BST.isBalanced()}`);
  console.log('Rebalancing Tree');
  BST.rebalance();
  console.log(`Tree balanced ${BST.isBalanced()}`);
  // prettyPrint(BST.root);

  console.log('Printing Level');
  BST.levelOrder((node) => console.log(node.data));
  console.log('----------------------------------');
  console.log('Printing pre order');
  BST.preOrder((node) => console.log(node.data));
  console.log('----------------------------------');
  console.log('Printing in order');
  BST.inOrder((node) => console.log(node.data));
  console.log('----------------------------------');
  console.log('Printing post order');
  BST.postOrder((node) => console.log(node.data));
  console.log('----------------------------------');
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

driverScript();
