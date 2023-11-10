/*
Mining Blocks :-
   1.Block will be an object with a single property: an id that is equal to the block height prior to it being mined.
   2.In Bitcoin, blocks contain quite a bit of information in their header: the software version, a timestamp, 
     the merkle root of its transactions, the previous block hash, and the difficulty.
*/

//index.js
const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;
const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    const block = { id: blocks.length }
    blocks.push(block);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    mempool,
    blocks,
};

//test.js
const { assert } = require('chai');
const { mine, blocks } = require('../index');
const SHA256 = require('crypto-js/sha256');

describe('mine', () => {
    describe('first block', () => {
        let hash;
        before(() => {
            hash = mine();
        });
        it('should add to the blocks', () => {
            assert.equal(blocks.length, 1);
        });
        it('should store the expected id', () => {
            const lastBlock = blocks[blocks.length - 1];
            assert(lastBlock.id != null, "did not find an id property on the block");
            assert.equal(lastBlock.id, 0);
        });
    });
    describe('second block', () => {
        let hash;
        before(() => {
            hash = mine();
        });
        it('should add to the blocks', () => {
            assert.equal(blocks.length, 2);
        });
        it('should store the expected id', () => {
            const lastBlock = blocks[blocks.length - 1];
            assert(lastBlock.id != null, "did not find an id property on the block");
            assert.equal(lastBlock.id, 1);
        });
    });
});
