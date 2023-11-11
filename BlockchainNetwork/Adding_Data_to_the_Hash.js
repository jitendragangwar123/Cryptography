/*
  When creating a new block, data will be passed to its constructor.
  Example: 
  const block = new Block("Alice sent Bob 1 BTC");
  console.log( block.data ); // Alice sent Bob 1 BTC
*/  

//Block.js
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data){
        this.data=data;
    }
    toHash() {
        return SHA256(this.data);  // a hash!
    }
}

module.exports = Block;

//test.js
const Block = require('../Block');
const assert = require('assert');
const SHA256 = require("crypto-js/sha256");

describe('Block', function() {
    it('should store a random name', function() {
        const randomName = require('faker').name.findName();
        assert.equal(randomName, new Block(randomName).data)
    });

    it('should hash some random data', function() {
        const randomEmail = require('faker').internet.email();
        const myHash = SHA256(randomEmail).toString();
        const yourHash = new Block(randomEmail).toHash().toString();
        assert.equal(myHash, yourHash);
    })
})
