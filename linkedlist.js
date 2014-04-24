// linkedlist.js
// A simple implementation of doubly linked lists in JavaScript
//
// Author: Nick Armstrong
// Version: 0.4
//
// Sources:
// [1]: http://en.wikipedia.org/wiki/Linked_list
// [2]:  http://stackoverflow.com/questions/5384358/how-does-a-sentinel-node-offer-benefits-over-null
//
// Functions to consider adding:
//   - Sort Ascending/Descending
//   - Split
//   - Mode node in list
//   - Shuffle merge
//   - Shuffle list


var LinkedList = {
  version : 0.1
}

// Sentinel constructor
function Sentinel(next, prev) {
  this.next = next || this;
  this.prev = prev || this;
}

// Node constructor
function Node(data, next, prev) {

  if(!arguments.length || data == null) 
    data = {};

  this.data = data;
  Sentinel.prototype.constructor.apply(this, [next, prev]);
}

// List constructor
function List() {
  this.length = 0;
  this.sentinel = new Sentinel();
}

List.prototype = {

  // Retrieve the first node in the list
  // TODO ensure list is not empty
  head : function() {
    return this.sentinel.next;
  },

  // Retrieve the last node in the list
  // TODO ensure list is not empty
  tail : function() {
    return this.sentinel.prev;
  },

  // Retrieve the nth node in the list
  fetch : function(n) {
    if(!n || n <= 0 || n > this.length)
      throw TypeError;

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
  // TODO ensure node is valid
  insert : function(node, newnode) {
    newnode.next = node.next;
    newnode.prev = node;
    node.next = node.next.prev = newnode;
    ++this.length;
  },

  // Delete a node in the list
  // TODO delete by number or node!
  // TODO ensure node is valid
  delete : function(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    //TODO set node pointers to the initial node state?
    // node.next = node;
    // node.prev = node;
    --this.length;
  },

  // Add a node with the given data to the end of the list
  // TODO ensure node is valid
  push : function(node) {
    this.insert(this.tail(), node);
  },

  // Remove and return the last node in the list
  // TODO ensure the list is not empty
  pop : function() {
    var node = this.tail();
    delete(node);
    return node;
  },

  // Perform fn on every node in the list
  // TODO ensure function is valid
  each : function(fn) {
    var node = this.sentinel;
    while(node.next.hasOwnProperty('data'))
      fn(node.next);
  },

  // Perform fn on every node in the list and return a new list of the results
  // TODO ensure function is valid
  map : function(fn) {
    var list = new List();
    this.each(function(node){
      list.push(fn(node));
    });
  },

  // Count the number of times data occurs in the list
  // TODO ensure data is valid
  count : function(data) {
    var count = 0;
    this.each(function(node){
      node.data == data && ++count;
    });
    return count;
  },

  // Append a second list to the end of the list and set the second to null
  // TODO ensure list is valid
  append : function(list) {
    this.tail().next = list.head();
    list.head().prev = this.tail();
    list.tail().next = this.sentinel;
    this.sentinel.prev = list.tail();
    list = null;
  }

};

//TODO Print error details to console?
/*
function error(n) {

}
*/
