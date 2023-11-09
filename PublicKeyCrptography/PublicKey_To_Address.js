/*
Public Key to Address :-
    1.Bitcoin and Ethereum both have a transformation process to take a public key and turn it into an address.
    2.For Bitcoin it includes a checksum and Base58 encoding.
    3.Ethereum's address transformation is quite a bit simpler, its address is the last 20 bytes of the hash of the public key.
    4.The first byte indicates the format of the key, whether it is in the compressed format or not.
    5.The publicKey will be a Uint8Array so you can use the slice method to slice off the first byte.
*/

//getAddress.js
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    // the first byte indicates whether this is in compressed form or not
    return keccak256(publicKey.slice(1)).slice(-20);
}

module.exports = getAddress;

//test.js
const getAddress = require('../getAddress');
const secp = require("ethereum-cryptography/secp256k1");
const { assert } = require('chai');
const { toHex } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718f";
const EXPECTED_ADDRESS = "16bB6031CBF3a12B899aB99D96B64b7bbD719705";

describe('Get Address', () => {
    it('should get the address from a public key', async () => {
        const publicKey = secp.getPublicKey(PRIVATE_KEY);
        
        const address = toHex(getAddress(publicKey));

        assert.equal(address.toLowerCase(), EXPECTED_ADDRESS.toLowerCase());
    });
});
