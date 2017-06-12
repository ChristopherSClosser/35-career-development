'use strict';

const Node = function(val, next=null, prev=null) {
  this.val = val;
  this.next = next;
  this.prev = prev;
};

const DLL = module.exports = function() {
  this.head = null;
  this.tail = null;
  this.length = 0;
};

DLL.prototype.append = function(val) {
  if(!val) throw new Error('must provide a value');
  if(!this.head) {
    return this.head = this.tail = new Node(val);
  }

  this.head.next = new Node(val);
  this.head.next.prev = this.head;
  this.head = this.head.next;
  this.length++;

  return this.head;
};

DLL.prototype.prepend = function(val) {
  if(!val) throw new Error('must provide a value');
  if(!this.tail) {
    return this.tail = this.head = new Node(val);
  }

  this.tail.prev = new Node(val);
  this.tail.prev.next = this.tail;
  this.tail = this.tail.prev;
  this.length++;

  return this.tail;
};

DLL.prototype.remove = function(val) {
  if(!val) throw new Error('must provide a value');
  if(!this.head && !this.tail) throw new Error('the list is empty');

  let currentNode = this.head,
    previous;

  // check if head
  if(val === currentNode.val){
    this.head = currentNode.next;

    return this;
  } 

  //check if tail
  if(currentNode.val === this.tail.val) {
    this.tail.previous = null;

    return this;
  }

  while(currentNode.next){
    if(currentNode.val === val) {
      previous.next = currentNode.next;
      currentNode.next.prev = previous;

      return this;
    }
    previous = currentNode;
    currentNode = currentNode.next;
  }

  return this;
};
