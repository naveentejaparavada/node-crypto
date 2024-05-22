/**
 *
 * @author Paravada Naveen Teja <https://www.pnaveenteja.com/>
 * @version 1.0.0
 *
 */

const {
  scrypt,
  scryptSync,
  createCipheriv,
  createDecipheriv,
} = require("node:crypto");

function NodeCrypto(algorithm, password, iv) {
  this.algorithm = algorithm || "aes-192-cbc";
  this.password = password || "pass";
  this.iv = iv || "0000";
}

/**
 * A simple AES based encrypt function
 * @param {String} text String to be encrypted
 * @returns {Promise<String>} encrypted Key
 */
NodeCrypto.prototype.encrypt = function encrypt(text) {
  return new Promise((resolve, reject) => {
    try {
      let encrypted;
      return scrypt(this.password, "salt", 24, (err, key) => {
        if (err) throw err;
        const cipher = createCipheriv(this.algorithm, key, this.iv);
        encrypted = cipher.update(text, "utf8", "hex");
        encrypted += cipher.final("hex");
        return resolve(encrypted);
      });
    } catch (error) {
      return reject("Encryption Error");
    }
  });
};

/**
 * A simple AES based decrypt function
 * @param {String} encrypted Encrypted String
 * @returns {Promise<String>} decrypted string
 */
NodeCrypto.prototype.decrypt = function decrypt(encrypted) {
  return new Promise((resolve, reject) => {
    try {
      const key = scryptSync(this.password, "salt", 24);
      const decipher = createDecipheriv(this.algorithm, key, this.iv);
      let decrypted = decipher.update(encrypted, "hex", "utf8");
      decrypted += decipher.final();
      return resolve(decrypted);
    } catch (error) {
      return reject("Decryption Error");
    }
  });
};

module.exports = NodeCrypto;
