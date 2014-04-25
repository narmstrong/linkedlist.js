// linkedlist.js
// A simple implementation of doubly linked lists in JavaScript
//
// Author: Nick Armstrong
// Version: 0.5
//
//--------------------------------------------------------------
//
// Node methods to consider adding:
//   - isSupported
//
// List methods to consider adding:
//   - Sort Ascending/Descending
//   - Split
//   - Move node in list
//   - Shuffle merge
//   - Shuffle list
//
// Validation functions to consider adding:
//   - isValidData
//
// Miscellaneous changes to include in the future:
//   - Print error details to console?
//   - Allow list constructor to create a new list from an array of data


var LinkedList = {
  version : 0.5
}


/***********************
  Sentinel
***********************/

// Sentinel constructor
function Sentinel(next, prev) {
  this.next = next || this;
  this.prev = prev || this;
}


/***********************
  Node
***********************/

// Node constructor
function Node(data, next, prev) {
  if(!arguments.length)
    data = null;
  this.data = data;
  Sentinel.prototype.constructor.apply(this, [next, prev]);
  return this;
}

// Return the data parameter of the node
Node.prototype.getdata = function() {
  return this.data;
};

// Compare the data, next, and prev elements of two nodes
Node.prototype.isequal = function(node) {
  isValidNode(node);
  return this.data == node.data &&
         this.next == node.next &&
         this.prev == node.prev;
};

// Return the next parameter of the node
Node.prototype.getnext = function() {
  return this.next;
};

// Return the prev parameter of the node
Node.prototype.getprev = function() {
  return this.prev;
};


/***********************
  List
***********************/

// List constructor
function List() {
  this.length = 0;
  this.sentinel = new Sentinel();
}

List.prototype = {

  // Retrieve the first node in the list
  head : function() {
    return this.isempty() ? null : this.sentinel.next;
  },

  // Retrieve the last node in the list
  tail : function() {
    return this.isempty() ? null : this.sentinel.prev;
  },

  // Retrieve the nth node in the list
  fetch : function(n) {
    isInRange.call(this, [n]);
    var node = this.sentinel;
    if(n <= this.length / 2) {
      for(var count = 0 ; count < n; count++)
        node = node.next;
      return node;
    }
    else {
      for(var count = this.length ; count >= n; count--)
        node = node.prev;
      return node;
    }
  },

  // Insert a new node after the given node
  // TODO insert by number or node
  insert : function(node, newnode) {
    isValidNode(node) && isValidNode(newnode);
    newnode.next = node.next;
    newnode.prev = node;
    node.next = node.next.prev = newnode;
    ++this.length;
  },

  // Delete a node in the list
  // TODO delete by number or node!
  delete : function(node) {
    isValidNode(node);
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.next = node.prev = node;
    --this.length;
    return node;
  },

  // Add a node with the given data to the end of the list
  push : function(node) {
    isValidNode(node);
    this.insert(this.tail() || this.sentinel, node);
  },

  // Remove and return the last node in the list
  pop : function() {
    return this.isempty() ? null : delete(this.tail());
  },

  // Perform fn on each nodes' data in the list
  each : function(fn) {
    isValidFunction(fn);
    var node = this.sentinel;
    while(node.next.hasOwnProperty('data')) {
      fn(node.next.data);
      node = node.next;
    }
  },

  // Perform fn on each node's data in the list and return a new list
  map : function(fn) {
    isValidFunction(fn);
    var list = new List();
    this.each(function(data){
      list.push(new Node(fn(data)));
    });
    return list;
  },

  // Count the number of times data occurs in the list
  count : function(data) {
    data = data || null;
    var count = 0;
    this.each(function(node){
      node.data == data && ++count;
    });
    return count;
  },

  // Append a copy of a second list to the end of the list
  append : function(list) {
    isValidList(list);
    if(list.isempty())
      return this;
    var newlist = list.map( function(data){ return data; });
    this.tail().next = newlist.head();
    newlist.head().prev = this.tail();
    newlist.tail().next = this.sentinel;
    this.sentinel.prev = newlist.tail();
    this.length += list.length;
  },

  isempty: function() {
    return this.length == 0;
  }

};


/***********************
  Validation functions
***********************/

// Check that n is in the range 0<x<list.length - use call
function isInRange(n) {
  if(!n || n <= 0 || n > this.length)
    throw TypeError;
  return true;
}

// Check that node is a Node instance
function isValidNode(node) {
  if( !(node instanceof Node) )
     if( !(node instanceof Sentinel) )
       throw TypeError;
  return true;
}

// Check that list is a List instance
function isValidList(list) {
  if( !(list instanceof List) )
    throw TypeError;
  return true;
}

// Check that fn is a Function instance
function isValidFunction(fn) {
  if( !(fn instanceof Function) )
    throw TypeError;
  return true;
}


/***********************
  Utility functions
***********************/

var $N = function(data, next, prev) {
  return new Node(data, next, prev);
};

var $L = function() {
  return new List();
};
