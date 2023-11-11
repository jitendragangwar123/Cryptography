/*
Blockchain Architecture:
  1.A blockchain is a distributed database of a list of validated blocks. 
  2.Each block contains data in the form of transactions and each block is cryptographically tied to its predecessor, producing a "chain".
  3.A blockchain has a list of blocks. It starts with a single block, called the genesis block.
*/
  
/*
Required Fields for A Block:
  1. index: the position of the block in the chain.
  2. timestamp: a record of when the block was created. 
  3. hash: this is commonly referred to as the block hash or block header. As opposed to what the demo says, this piece of data is NOT stored in the block but is actually a digital fingerprint representing the block's contents.
  4. previous hash: the hash of the previous block.
  5. data: each block can store data against it.
  6. nonce: the nonce is the number used to find a valid hash.
  
Note : 1. A valid hash for a blockchain is a hash that meets certain requirements. 
       2. For the blockchain in the demo, having three zeros at the beginning of the hash is the requirement for a valid hash.
       3. A hashing function takes data as input, and returns a unique hash.
       
       Example:
       f ( index + previous hash + timestamp + data + nonce ) = hash
       f ( 0 + "0" + 1508270000000 + "Welcome to Blockchain Demo 2.0!" + 604 ) = 000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf
*/
  
/*
  1. if you see a string of characters "0x123abc", the "0x" is denoting the use of hexadecimals and the string's value is actually just "123abc".
  2. The hash of the block is being tested by the regular expression (regex) /^[0-9A-F]{64}$/i
  3. hash it to a 256 bit array. If we call toString() on that returned object we'll receive a 64 character hexadecimal string.
*/
  
/*
  const hash = SHA256("Dan");
  console.log( hash.toString() );
*/
  
//Block.js
const SHA256 = require('crypto-js/sha256');

class Block {
    toHash() {
        return SHA256("");  // a hash!
    }
}

module.exports = Block;

//test.js
const Block = require('../Block');
const assert = require('assert');

describe('Block', function() {
    const newBlock = new Block();

    it('should have a hash property', function() {
        assert(/^[0-9A-F]{64}$/i.test(newBlock.toHash()));
    });
});
  
