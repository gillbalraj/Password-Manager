var crypto = require('crypto-js');

var secretMessage = {
	name: 'Balraj',
	secretName: '007'
};
var secretString = JSON.stringify(secretMessage);
var secretKey = '123abc';
//encrypt
var encryptedMessage = crypto.AES.encrypt(secretString, secretKey);
console.log('encrypted Message :' + encryptedMessage);
//decrypt

var bytes = crypto.AES.decrypt(encryptedMessage,secretKey);
var decryptedMessage = bytes.toString(crypto.enc.Utf8);
var decryptedObject = JSON.parse(decryptedMessage);
console.log('Decrypted message :'+ decryptedObject.name);

