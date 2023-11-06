/*
- Cryptographic Hash Functions like SHA256 are one-way functions.
- For security purposes, it's important to remember to use a random salt which you can add to your input to make it unguessable.
- utf8ToBytes : translate the string to bytes. 
- sha256 : translate the bytes to hash.
- toHex : For comparing the two hashes to turn each hash from a Uint8Array to a string of hexadecimal characters.
*/

/*
Example :
const a = "Mango";
const b = "banana";

const aBytes = utf8ToBytes(a);
const bBytes = utf8ToBytes(b);

const aHash = sha256(aBytes);
const bHash = sha256(bBytes);

console.log(toHex(aHash) === toHex(aHash)); // true
console.log(toHex(aHash) === toHex(bHash)); // false
*/

/*
Ranibow Table :
- A rainbow table is simply a table which maps common inputs to their hash output. For instance, we could map common passwords to their SHA256 hashes.

COMMON PASSWORDS	SHA256 HASH
password	        0x5e8848...1542d8
qwerty	          0x65e84b...2337c5
111111	          0xbcb15f...09802a
*/

//index.js
const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// the possible colors that the hash could represent
const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

// given a hash, return the color that created the hash
function findColor(hash) {
    return COLORS.find(color=>
        toHex(sha256(utf8ToBytes(color)))===toHex(hash));
}

module.exports = findColor;

//test.js
const {assert} = require('chai');
const findColor = require('../index');
const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

describe('findColor', () => {
    COLORS.forEach((color) => {
        it(`should work for ${color}`, () => {
            assert.equal(findColor(sha256(utf8ToBytes(color))), color);
        });
    });
});

