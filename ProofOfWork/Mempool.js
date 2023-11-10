/*
Consensus Mechanisms :
  1.Consensus means coming to a general agreement. 
  2.Blockchain consensus typically means at least 51% of nodes are in agreement over the current global state of the network.
*/

/*
Mining :-
  Mining is process of creating a block of transactions to be added to a blockchain.
*/

/*
proof-of-work mining algorithm :
  1.Take current block’s block header, add mempool transactions
  2.Append a nonce, starting at nonce = 0
  3.Hash data from #1 and #2
  4.Check hash versus target difficulty (provided by protocol)
  5.If hash < target, puzzle is solved! Get rewarded.
  6.Else, restart process from step #2, but increment nonce
*/

/*
Note : In proof-of-work, miners must present a proof (in the form of a hash output on valid input data) that they expended energy 
       in order to successfully "mine" a block and have it extend a blockchain.
*/


/*
Mempool :-
    The mempool is a place for miners to keep those transactions before adding them to a block.
    the miner will take all the transactions with the highest transaction fees from the mempool. 
    Then they'll add them to the block and attempt to find the proof of work.
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
    // TODO: mine a block
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    blocks,
    mempool
};

// test.js
const {assert} = require('chai');
const {addTransaction, mempool} = require('../index');

describe('addTransaction', () => {
    it('should add the transaction to the mempool', () => {
        const transaction = { to: 'bob', sender: 'alice' }
        addTransaction(transaction);
        assert.equal(mempool.length, 1);
        assert.equal(mempool[0], transaction);
    });
});
