/**
 *
 * @author Paravada Naveen Teja <https://www.pnaveenteja.com/>
 * @version 1.0.0
 *
 * @description Test's the crypto function.
 *
 */

const assert = require("node:assert");
const { describe, it } = require("node:test");
const NodeCrypto = require("@ntp/node-crypto");

//Helper Function
/**
 *
 * @param {String} data to be tampered
 * @returns {String} tampered data
 */
function tamperData(data) {
  const buffer = Buffer.from(data, "base64");
  // Change some bytes in the buffer to tamper the data
  buffer[0] = 255 - buffer[0]; // Example of tampering the first byte
  return buffer.toString("base64");
}

describe("Encryption and Decryption Class Based ", function () {
  const algorithm = "aes-192-cbc";
  const password = "Password used to generate key";
  const iv = "2222222222222222";
  const node_crypto = new NodeCrypto(algorithm, password, iv);
  const plainText = "CryptoTest";
  let encryptedKey;

  it("Encrypts data correctly", async function () {
    encryptedKey = await node_crypto.encrypt(plainText);
    assert.ok(encryptedKey);
  });

  it("Decrypts encrypted data correctly", async function () {
    const decryptedData = await node_crypto.decrypt(encryptedKey);
    assert.equal(decryptedData, plainText);
  });

  it("Fails to decrypt with incorrect key", async function () {
    await assert.rejects(
      node_crypto.decrypt("27d53600b67baa4c6bff9172f79asdaf3")
    );
  });

  it("Fails to decrypt tampered data", async function () {
    const tamperedData = tamperData(encryptedKey); // A function to tamper encrypted data
    await assert.rejects(node_crypto.decrypt(tamperedData));
  });
});
