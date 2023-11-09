/*
Sign Message :
      To sign a message using our private key to prove our intention!
Steps:
  1.When signing a message with secp256k1 we can return the signature along with the recovery bit, 
allowing us to recover the public key from the signature. 
  2.This will allow a blockchain node to take a signature of a transaction 
and understand which address authenticated this particular transaction.

  3.The sign method takes an optional third parameter called options.
  4.Use this parameter to return the recovered bit so that the public key can be recovered from this signature.
*/

//signMessage.js
const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require('./hashMessage');

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718f";

async function signMessage(msg) {
    return secp.sign(hashMessage(msg), PRIVATE_KEY,{recovered:true})
}

module.exports = signMessage;

//test.js
const signMessage = require('../signMessage');
const hashMessage = require('../hashMessage');
const { assert } = require('chai');
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718f";

describe('Sign Message', () => {
    it('should return both a signature and a recovery bit', async () => {
        const response = await signMessage('hello world');

        const errMessage = "expected signMessage to return both a signature and recovery bit!";
        assert(response.length, errMessage);
        assert(response.length === 2, errMessage);

        const [signature, recoveryBit] = response;
        assert(signature.length, "expected signature to be a Uint8Array");
        assert(typeof recoveryBit === "number", "expected the recovery bit to be a number");
    });

    it('should have been signed by the same private key', async () => {
        const [sig, recoveryBit] = await signMessage('hello world');
        const messageHash = hashMessage('hello world');
        const recovered = secp.recoverPublicKey(messageHash, sig, recoveryBit);

        const publicKey = secp.getPublicKey(PRIVATE_KEY);
        assert.equal(toHex(recovered), toHex(publicKey));
    });
});
