/*
Target Difficulty :
   In bitcoin, the difficulty is adjusted every 2016 blocks, 
   which is about every two weeks with the blocks being mined on average every 10 minutes.
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
    let transactions = [];
    while (transactions.length < MAX_TRANSACTIONS && mempool.length > 0) {
        transactions.push(mempool.pop());
    }
    const block = { id: blocks.length, transactions }
    block.nonce = 0;
    let hash;
    while (true) {
        hash = SHA256(JSON.stringify(block)).toString();
        if (BigInt(`0x${hash}`) < TARGET_DIFFICULTY) {
            break;
        }
        block.nonce++;
    }
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
const { mine, blocks, mempool, addTransaction, TARGET_DIFFICULTY } = require('../index');
const SHA256 = require('crypto-js/sha256');

describe('mine', () => {
    describe('with 5 mempool transactions', () => {
        before(() => {
            for (let i = 0; i < 5; i++) {
                addTransaction({ sender: 'bob', to: 'alice' });
            }
        });
        describe('after mining', () => {
            before(() => {
                mine();
            });
            it('should add to the blocks', () => {
                assert.equal(blocks.length, 1);
            });
            it('should store the transactions on the block', () => {
                assert.equal(blocks[blocks.length - 1].transactions.length, 5);
            });
            it('should clear the mempool', () => {
                assert.equal(mempool.length, 0);
            });
            it('should have a nonce', () => {
                assert.isDefined(blocks[blocks.length - 1].nonce, "did not find a nonce on the block");
            });
            it('should have a hash lower than the target difficulty', () => {
                const actual = blocks[blocks.length - 1].hash.toString();
                const isLess = BigInt(`0x${actual}`) < TARGET_DIFFICULTY;
                assert(isLess, "expected the hash to be less than the target difficulty");
            });
        });
    });
    describe('with 15 mempool transactions', () => {
        before(() => {
            for (let i = 0; i < 15; i++) {
                addTransaction({ sender: 'bob', to: 'alice' });
            }
        });
        describe('after mining', () => {
            before(() => {
                mine();
            });
            it('should add to the blocks', () => {
                assert.equal(blocks.length, 2);
            });
            it('should store the transactions on the block', () => {
                assert.equal(blocks[blocks.length - 1].transactions.length, 10);
            });
            it('should reduce the mempool to 5', () => {
                assert.equal(mempool.length, 5);
            });
            it('should have a nonce', () => {
                assert.isDefined(blocks[blocks.length - 1].nonce, "did not find a nonce on the block");
            });
            it('should have a hash lower than the target difficulty', () => {
                const actual = blocks[blocks.length - 1].hash.toString();
                const isLess = BigInt(`0x${actual}`) < TARGET_DIFFICULTY;
                assert(isLess, "expected the hash to be less than the target difficulty");
            });
            describe('after mining again', () => {
                before(() => {
                    mine();
                });
                it('should add to the blocks', () => {
                    assert.equal(blocks.length, 3);
                });
                it('should store the transactions on the block', () => {
                    assert.equal(blocks[blocks.length - 1].transactions.length, 5);
                });
                it('should clear the mempool', () => {
                    assert.equal(mempool.length, 0);
                });
                it('should have a nonce', () => {
                    assert.isDefined(blocks[blocks.length - 1].nonce, "did not find a nonce on the block");
                });
                it('should have a hash lower than the target difficulty', () => {
                    const actual = blocks[blocks.length - 1].hash.toString();
                    const isLess = BigInt(`0x${actual}`) < TARGET_DIFFICULTY;
                    assert(isLess, "expected the hash to be less than the target difficulty");
                });
            });
        });
    });
});
