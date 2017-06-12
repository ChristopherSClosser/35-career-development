'use strict';

const HashTable = module.exports = function(size=8192) {
  this.size = size;
  this.buckets = [...Array(this.size)];
};

HashTable.prototype.hashKey = function(key) {
  if(!key) throw new Error('key required');
  // let hash = key.split('').reduce((acc, curr) => acc + curr.charCodeAt(0), 0) % this.size;

  // :::: this method is more than twice as time performant, with a bit more space used 70+ms compared to 180+ms in above hash COLLISIONS POSSIBLE :::: \\
  // for (var i=0;i< key.length;i++){
  //   hash += key.charCodeAt(i) * i;
  // }
  //
  // return hash;

  // :::: this method uses most every bucket no speed advantage NO COLLISIONS :::: \\
  let hash = 0;
  for (var i = 0; i < key.length; i++) {
    hash = (hash<<5) - hash;
    hash = hash + key.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

HashTable.prototype.set = function(key, value) {
  this.buckets[this.hashKey(key)] = value;
};

HashTable.prototype.get = function(key) {
  return this.buckets[this.hashKey(key)];
};

HashTable.prototype.remove = function(key) {
  let address = this.hashKey(key);
  this.buckets[address] ? delete this.buckets[address] : new Error('invalid key');
};
