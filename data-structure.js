function LinkedList() {
	// Initial Linked List will be empty
	this.head = null;
	this.tail = null;
	this.index = null;
}
function Node(value, next, prev) {
	this.value = value;
	this.next = next;
	this.prev = prev;
}

// Adding to the head of the Linked list
LinkedList.prototype.addToHead = function(value) {
	// creating a new node with the contructor function
	let newNode = new Node(value, this.head, null);
	// If there is already node present, set the previous' node's head pointer to the new node
	if (this.head) this.head.prev = newNode;
	// If there is no node present yet (empty), it will be the head and tail node
	else this.tail = newNode;
	// sets newNode to head of the linked list
	this.head = newNode;
};

// Adding to the tail of the Linked list
LinkedList.prototype.addToTail = function(value) {
	// creating a new node with the contructor function
	let newNode = new Node(value, null, this.tail);
	// If there is already a node present, set the next node's tail pointer to the new node
	if (this.tail) this.tail.next = newNode;
	// if there is no node present yet (empty), it will be the head and tail node
	else this.head = newNode;
	// sets newNode to tail of the linked list
	this.tail = newNode;
};

LinkedList.prototype.removeHead = function() {
	// If linked list is empty
	if (!this.head) return null;
	// Save the value of the head node
	let val = this.head.value;
	// Now the new head will be equal to current head node's next node
	this.head = this.head.next;
	// if there is a head present, set previous property to null
	if (this.head) this.head.prev = null;
	// if there is no head present (empty)
	else this.tail = null;
	// finally get the value of the node removed
	return val;
};

LinkedList.prototype.removeTail = function() {
	// If linked list is empty
	if (!this.tail) return null;
	// Save the value of the tail node
	let val = this.tail.value;
	// Now the new tail will be equal to current tail node's previous node
	this.tail = this.tail.prev;
	// if there is a tail present, set previous property to null
	if (this.head) this.tail.next = null;
	// if there is no tail present (empty)
	else this.head = null;
	// finally get the value of the node removed
	return val;
}

LinkedList.prototype.search = function(searchValue) {
	// Set starting point
	let currentNode = this.head;
	// iterate of the linked list
	while(currentNode) {
		if (currentNode.value === searchValue) return true + ', value exists of: ' + currentNode.value;
		currentNode = currentNode.next;
	}
	return false;
};

LinkedList.prototype.indexOf = function(value) {
	// If linked list is empty
	if (!this.head) return null;
	// set starting point
	let currentNode = this.head;
	// create an array to store the index values
	let indexes = [];
	// a way to create the index value
	let index = 0;
	while(currentNode) {
		if (currentNode.value === value) {
			indexes.push(index);
		}
		currentNode = currentNode.next;
		index++;
	}
	return 'Indexes are ' + indexes.join(', ');
};

let myLL = new LinkedList();

myLL.addToHead(8)
myLL.addToHead(3)
myLL.addToHead(5)
myLL.addToHead(3)
myLL.addToHead(7)
myLL.addToHead(457)
myLL.addToHead(7)
myLL.addToHead(3)

console.log(myLL.indexOf(3));

// BST Contrsuctor Function
function BST(value) {
	this.value = value;
	this.left = null;
	this.right = null;
}
// Inserting nodes to create a BST
BST.prototype.insert = function(value) {
	// Checks to see if the new node is less than the current node
	if (value <= this.value) {
		// Now to check to see if there is or is not a left child node already
		// If there is no child node, then create one!
		if (!this.left) this.left = new BST(value);
		// If not, run a recursive call to find a position where the node can be placed
		else this.left.insert(value);
	} 
	// checks to see if the new node is larger than the current node
	else if (value > this.value) {
		// Now to check to see if there is or is not a right child node already
		// If there is no child node, then create one!
		if (!this.right) this.right = new BST(value);
		// If not, run a recursive call to find a position where the node can be placed
		else this.right.insert(value);
	}
};

// Now to search the binary search tree for a given value
BST.prototype.contains = function(value) {
	// Simply check if the first node is that value
	if (value === this.value) return true;
	// Check to see if value is less than the current node
	else if (value < this.value) {
		// Check to see if there is a left node or not
		if (!this.left) return false;
		// If there is a child there, run a recursive function to complete search
		else return this.left.contains(value);
	}
	// Check to see if value is greater than the current node
	else if (value > this.value) {
		// Check to see if there is a right node or not
		if (!this.right) return false;
		// If there is a child there, run a recursive function to complete search
		else return this.right.contains(value);
	}
};

// the different oder values: "In odrer", "Pre-Order", and "Post Order"
// In-order: it will travel all the way down through in order from least to greatest (left to right)
// Pre-order: it will touch the parent node first then go down the left branch, then the right branch (useful for making a copy of the tree)
// Post-order: Process All of the left children, then all of the right children and then the parent node (can be used to safely remove nodes from a BST because of starting at the lowest level and working it's way up)
BST.prototype.depthFirstTraversal = function(iteratorFunc, order) {
	// Makes the parent node go first for pre-order iteration
	if (order === 'pre-order') iteratorFunc(this.value);
	// if there is a left, Iterate the left first (because its the least) and travel through that branch
	if (this.left) {
		this.left.depthFirstTraversal(iteratorFunc, order);
	}
	// Then iterate the parent node in order
	if (order === 'in-order') iteratorFunc(this.value);
	// Then finally to the right node to travel through that branch to finish the BST
	if (this.right) {
		this.right.depthFirstTraversal(iteratorFunc, order);
	}
	// for post order checking the parent node last after checking all the children nodes
	if (order === 'post-order') iteratorFunc(this.value);
}

// Moving down the tree level by level. Useful
BST.prototype.breadthFirstTraversal = function(iteratorFunc) {
	// define a queue FIFO (first in first out) with the root node as the first element
	let queue = [this];
	// shift nodes out in the front of the queue, run iterator function on that node, then push its child nodes into the back the queue.. repeat
	// run as long as queue is NOT empty
	while (queue.length) {
		let treeNode = queue.shift();
		iteratorFunc(treeNode);
		if (treeNode.left) queue.push(treeNode.left);
		if (treeNode.right) queue.push(treeNode.right);
	};
};

BST.prototype.getMinVal = function() {
	// since it is a BST the smallest value will be the farthest left node possible
	if (this.left) return this.left.getMinVal();
	else return this.value;
};

BST.prototype.getMaxVal = function() {
	// since it is a BST the smallest value will be the farthest left node possible
	if (this.right) return this.right.getMaxVal();
	else return this.value;
};


// Iterator function for DFS
const logDFS = (value) => {
	console.log(value);
};

// Iterator function for BFS
const logBFS = (node) => {
	console.log(node.value);
};

let bst = new BST(50);

bst.insert(30)
bst.insert(70)
bst.insert(100)
bst.insert(60)
bst.insert(59)
bst.insert(20)
bst.insert(45)
bst.insert(35)
bst.insert(85)
bst.insert(105)
bst.insert(10)

console.log(bst.contains(45));
console.log(bst.right.right)
bst.depthFirstTraversal(log, 'post-order');
bst.breadthFirstTraversal(logBFS);
console.log('MIN:', bst.getMinVal());
console.log('MAX:', bst.getMaxVal());

// table contructor
// defines where the data of the hash table will be stored
function HashTable(size) {
  // create an array which will be the buckets of the hash table
  this.buckets = Array(size);

  // keeping track how buckets we have in the hash table
  this.numBuckets = this.buckets.length;
};

// hash node contructor
function HashNode(key, value, next) {
  this.key = key;
  this.value = value;
  // If there is not a next node, then by default set to null
  this.next = next || null;
};

HashTable.prototype.hash = function(key) {
  // to obtain a hashed key iterate the key and apply charCodeAt
  let total = 0;
  for (let i = 0; i < key.length; i++) {
    total += key.charCodeAt(i);
  };
  // dynamically set a way to get a bucket value for the number buckets in the table
  let bucket = total % this.numBuckets;
  return bucket;
};

HashTable.prototype.insert = function(key, value) {
  // set the bucket number into the variable
  let index = this.hash(key);
  // if there hasn't been a key for that bucket yet (empty), then place it there
  if (!this.buckets[index]) this.buckets[index] = new HashNode(key, value);
  // if there is one chceck the first node first to see if matches the key
  else if (this.buckets[index].key === key) {
    // if found, update the node
    this.buckets[index].value = value
  }
  // If first one didn't match, check to see if there is a chain of nodes,  if so handle it with a chaining it onto the last node
  else {
    let currentNode = this.buckets[index];
    // iterates through the nodes until it is at the last one
    while (currentNode.next) {
      // check to see if the key of the node matches
      if (currentNode.next.key === key) {
        // if it does, update it
        currentNode.next.value = value;
        return;
      }
      currentNode = currentNode.next;
    }
    currentNode.next = new HashNode(key, value);
  }
};

HashTable.prototype.get = function(key) {
  let index = this.hash(key);
  if (!this.buckets[index]) return null;
  else {
    let currentNode = this.buckets[index];
    while (currentNode) {
      if (currentNode.key === key) return currentNode.value;
      currentNode = currentNode.next;
    }
    return null;
  }
}

HashTable.prototype.retrieveAll = function() {
  let allNodes = [];
  // iterate the hash table
  for (let i = 0; i < this.numBuckets; i++) {
    // set a starting point
    let currentNode = this.buckets[i];
    // check to see if a chained list follows in a bucket
    while (currentNode) {
      // add to node array
      allNodes.push(currentNode);
      // iterate
      currentNode = currentNode.next;
    }
  }
  return allNodes;
};

let myHT = new HashTable(30);

myHT.insert('Dean', 'dean@gmail.com');
myHT.insert('Dane', 'dane@gmail.com');
myHT.insert('Megan', 'megan@gmail.com');
myHT.insert('Dean', 'deanmachine@gmail.com');
myHT.insert('Megan', 'meganSmith@gmail.com');
myHT.insert('Dane', 'dane1010@outlook.com');
myHT.insert('Joe', 'joey@outlook.com');
myHT.insert('Travis', 'travis@outlook.com');
myHT.insert('Mary', 'Mary1010@facebook.com');
myHT.insert('Boomer', 'boom@outlook.com');
myHT.insert('Abby', 'abs@outlook.com');

console.log(myHT.get('Dane'));
console.log(myHT.retrieveAll());