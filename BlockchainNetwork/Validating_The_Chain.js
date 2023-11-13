//Block.js
const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(data) {
        this.data = data;
    }
    
    toHash() {
        return SHA256(this.data + this.previousHash);
    }
}

module.exports = Block;

//Blockchain.js
const Block = require('./Block');
class Blockchain {
    constructor() {
        this.chain = [new Block()];
    }

    addBlock(block) {
        block.previousHash = this.chain[this.chain.length - 1].toHash();
        this.chain.push(block);
    }

    isValid(){
        for(let i=this.chain.length-1;i>0;i--){
            const block=this.chain[i];
            const pre=this.chain[i-1];
            if(block.previousHash.toString()!==pre.toHash().toString()){
                return false;
            }
            
        }
        return true;
    }
}
module.exports = Blockchain;

//test.js
const Blockchain = require('../Blockchain');
const Block = require('../Block');
const assert = require('assert');
const SHA256 = require("crypto-js/sha256");
describe('Blockchain', function() {
  let blockchain;
  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain.addBlock(new Block("Dan"));
    blockchain.addBlock(new Block("Peter"));
    blockchain.addBlock(new Block("James"));
  });
  
  it('should be considered valid', function() {
    assert(blockchain.isValid());
  });

  describe('tampering with a previousHash', function() {
    beforeEach(() => {
      blockchain.chain[1].previousHash = SHA256("gibberish");
    });

    it('should not be considered valid', function() {
      assert(!blockchain.isValid());
    });
  });
  
  describe('tampering with data', function() {
    beforeEach(() => {
      blockchain.chain[0].data = "Something Else";
    });

    it('should not be considered valid', function() {
      assert(!blockchain.isValid());
    });
  });
});
