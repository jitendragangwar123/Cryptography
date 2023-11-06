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
