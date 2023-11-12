/*
Genesis Block:
  The genesis block is the first block in the chain.
*/
/*
 1. Bitcoin's Genesis Block on Block Explorer on January 3rd, 2009.
 2. Ethereum's Genesis Block on EtherScan on July 30th, 2015.
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
}

module.exports = Blockchain;

//test.js
const Blockchain = require('../Blockchain');
const Block = require('../Block');
const assert = require('assert');

describe('Blockchain', function() {
    it('should have a genesis block', function() {
        const blockchain = new Blockchain();
        const genesisBlock = blockchain.chain[0];
        assert(genesisBlock, 'Could not find the genesis block!');
        assert(genesisBlock instanceof Block, 'genesis block should be a block!');
    })
})
