/*
 const blockchain = new Blockchain();
 const block = new Block("Charlie sent Dave 2 BTC");
 blockchain.addBlock(block);
 console.log(blockchain.chain.length); // 2
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

//Blockchain.js
const Block = require('./Block');
class Blockchain {
    constructor() {
        this.chain = [ new Block() ];
    }

    addBlock(block){
        this.chain.push(block);
    }
}
module.exports = Blockchain;

//test.js
const Blockchain = require('../Blockchain');
const Block = require('../Block');
const assert = require('assert');
let blockchain;

describe('Blockchain', function() {
    before(() => {
        blockchain = new Blockchain();
    });

    it('should have an addBlock function', function() {
        assert.equal(typeof blockchain.addBlock, 'function');
    });

    describe('adding new blocks', function() {
        let block1;
        let block2;
        before(() => {
            block1 = new Block("Some data");
            block2 = new Block("Some other data");
            blockchain.addBlock(block1);
            blockchain.addBlock(block2);
        });

        it('should be a chain of three blocks', function() {
            assert.equal(blockchain.chain.length, 3);
        });

        it('should include block1 and block2', function () {
            assert(blockchain.chain.some((x) => x === block1), "Could not find block1. Remember to push the block argument in addBlock!")
            assert(blockchain.chain.some((x) => x === block2), "Could not find block1. Remember to push the block argument in addBlock!")
        });
    });
});
