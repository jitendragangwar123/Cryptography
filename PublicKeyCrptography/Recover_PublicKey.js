/*
Recover PublicKey :
    1.When the signature is passed with all of its components (recovery bit included), the public key can be recovered. 
    2.This means that blockchain nodes will be able to understand who signed the transaction that was sent to them. 
*/

//recoverKey.js
const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");

async function recoverKey(message, signature, recoveryBit) {
    const messageHash=hashMessage(message);
    return secp.recoverPublicKey(messageHash,signature,recoveryBit);
}

module.exports = recoverKey;

//test.js
const signMessage = require('../signMessage');
const recover = require('../recoverKey');
const secp = require("ethereum-cryptography/secp256k1");
const { assert } = require('chai');
const { toHex } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718f";

describe('Recover Key', () => {
    it('should recover the public key from a signed message', async () => {
        const [sig, recoveryBit] = await signMessage('hello world');

        const publicKey = secp.getPublicKey(PRIVATE_KEY);

        const recovered = await recover('hello world', sig, recoveryBit);

        assert.equal(toHex(recovered), toHex(publicKey));
    });
});
