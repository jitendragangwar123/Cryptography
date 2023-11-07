
/*
Hash Function :-
    - A hash function is a function which takes an input of any size and turns it into a fixed size output. 
    - Let's imagine a hash function that takes an input of any size and returns a fixed 32 byte output.
*/

/*
Symmetric Key Encryption :- 
1. It only requires a single key for both encryption and decryption.
2. The encryption process is very fast.
3. Security is less as only one key is used for both encryption and decryption purpose.
4. The length of key used is 128 or 256 bits.
5. The size of cipher text is the same or smaller than the original plain text.
6. The Mathematical Representation is as follows-
      P = D (K, E(P))

      where K –> encryption and decryption key
      P –> plain text
      D –> Decryption 
      E(P) –> Encryption of plain text
      
 7. Examples: 3DES, AES, DES and RC4     
*/

/*
Asymmetric Key Encryption :- 
1. It requires two keys, a public key and a private key, one to encrypt and the other one to decrypt.
2. The encryption process is slow.
3. The size of cipher text is the same or larger than the original plain text.
4. The  length of key used is 2048 or higher
5. It is more secure as two keys are used here- one for encryption and the other for decryption.
6. The Mathematical Representation is as follows-
      P = D(Kd, E (Ke,P))
      where Ke –> encryption key

      Kd –> decryption key
      D –> Decryption
      E(Ke, P) –> Encryption of plain text using encryption key Ke . P –> plain text
      
7. Examples: Diffie-Hellman, ECC, El Gamal, ECDSA and RSA  
*/

/*
Note :- public key cryptography is considered asymmetric encryption in that only one party has access to the private key.
Note :-RSA and ECDSA are two popularly used algorithms for public key cryptography.
*/

/*
RSA:- The RSA algorithm is based on the idea that it's very easy to find the product of two prime numbers, 
      yet extremely difficult to factor out those two prime numbers if you have the product.
ECDSA:-The ECDSA algorithm uses elliptic curves. It can provide the same level security as other public key algorithms with smaller key sizes, 
       which is the reason it's become quite popular. It is the Digital Signing Algorithm used by Bitcoin, specifically the secp256k1 curve. 
*/

/*
:- The first step in ECDSA is to hash the message before applying the signature algorithm.
// turn this into an array of bytes, the expected format for the hash algorithm
const bytes = utf8ToBytes("Vote Yes on Proposal 327");
// hash the message using keccak256
const hash = keccak256(bytes); 
console.log(toHex(hash)); // 928c3f25193b338b89d5646bebbfa2436c5daa1d189f9c565079dcae379a43be
*/

//hashMessage.js
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    return keccak256(utf8ToBytes(message));  
}
module.exports = hashMessage;

//test.js
const hashMessage = require('../hashMessage');
const { assert } = require('chai');
const { toHex } = require("ethereum-cryptography/utils");

const helloWorldHex = '47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad';

describe('Hash Message', () => {
    it('should return the keccak256 hash of hello world', () => {
        const messageHash = hashMessage('hello world');

        assert.equal(toHex(messageHash), helloWorldHex);
    });
});

