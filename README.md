# @ntp/node-crypto

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This Node.js module provides encrypt and decrypt functions using AES-192-CBC encryption. The encrypt function derives a key with scrypt, creates a cipher, and returns the encrypted text in hexadecimal format. The decrypt function uses the same key derivation to create a decipher and returns the decrypted text in UTF-8.

## Requirements

- Node.js 22.0.0 or higher

## Installation

You can install @ntp/node-crypto using:

```bash
npm i @ntp/node-crypto
```

or

```bash
yarn add @ntp/node-crypto
```

## Usage

The best practice is to create environment variables and assign the properties.

```javascript
//Header file
let NodeCrypto = require("@ntp/node-crypto");

const algorithm = "aes-192-cbc";
const password = "Password used to generate key"; //Encryption and Decryption Password
const iv = "123"; //Initialization vector

// Create Constructor
const ntp_crypto = new NodeCrypto(algorithm, password, iv);

// Encrypt data
let encrypted = ntp_crypto.encrypt("Hello World");

// Decrypt data
let decrypted = ntp_crypto.decrypt(encrypted);
```

## Testing

```bash
npm run test
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

[Naveen Teja Paravada](https://github.com/naveentejaparavada)

## Contributing

Pull requests are welcome. For maj-or changes, please open an issue first to discuss what you would like to change.

## Support

If you like this project, please consider giving it a ⭐️ on [GitHub](https://github.com/naveentejaparavada)
