function Node(val) {
  this.value = val,
  this.children = [];

  return this;
}

Node.prototype.add = function(val) {
  this.children.push(new Node(val));
  return this;
}

Node.prototype.isLeaf = function() {
  return !this.children.length;
}

function Tree(val) {
  this.root = new Node(val);
  this.children = this.root.children;

  this.toString = function() {
    var queue = [this.root];
    var str = "";

    while(queue.length > 0) {
      var node = queue.shift();

      str = str.concat(node.value);

      node.children.forEach(function(child) {
          queue.push(child);
      });
    }

    return str;
  }

  return this;
}

//reconstruct image
function getTestTree() {
  var tree = new Tree(2);
  var root = tree.root;
  lvl1 = root.add(7).add(5);
  var node7 = lvl1.children[0];

  node7.add(2).add(6).children[1].add(5).add(11);

  var node5 = lvl1.children[1];
  node5.add(9).children[0].add(4);

  return tree;
}

function depthFirst(node, func) {
  if(func) {
    func(node);
  }

  node.children.forEach(function(child) {
    depthFirst(child, func);
  });
}

function breadFirst(node, func) {
  var queue = [node];
  while(queue.length) {
    node = queue.shift();
    if(func) {
      func(node);
    }

    node.children.forEach(function(child) {
      queue.push(child);
    });
  }
}

var tree = getTestTree ();
console.log("Breadth first search: \n");
breadFirst(tree.root, function(node) {
  console.log(node.value);
});
console.log("Depth first search: \n");
depthFirst(tree.root, function(node) {
  console.log(node.value);
});
// depthFirst(tree.root, depthSearch(5) );

function  depthSearch(num) {
 return function(node) {
  if(node.value == num) {
    console.log("Num found: " + num);
  }
 }
}
