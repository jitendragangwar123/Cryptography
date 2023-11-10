/*
Block Hash :
    All the information in the header of the block is hashed together to create a unique hash based on those properties.
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
    const hash = SHA256(JSON.stringify(block));
    blocks.push({ ...block, hash });
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
        it('should return the expected hash', () => {
            const expectedHash = SHA256(JSON.stringify({ id: 0 }));
            const lastBlock = blocks[blocks.length - 1];
            assert(lastBlock.hash, "did not find a hash property on the block");
            assert.equal(lastBlock.hash.toString(), expectedHash.toString());
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
        it('should return the expected hash', () => {
            const expectedHash = SHA256(JSON.stringify({ id: 1 }));
            const lastBlock = blocks[blocks.length - 1];
            assert(lastBlock.hash, "did not find a hash property on the block");
            assert.equal(lastBlock.hash.toString(), expectedHash.toString());
        });
    });
});
