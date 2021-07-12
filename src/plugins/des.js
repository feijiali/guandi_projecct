import cryptoJs from "crypto-js";
export const $encryptDes = (message, key) => {
  var keyHex = cryptoJs.enc.Utf8.parse(key);
  var encrypted = cryptoJs.DES.encrypt(message, keyHex, {
    mode: cryptoJs.mode.ECB,
    padding: cryptoJs.pad.Pkcs7
  });
  return encrypted.toString();
}
// DES解密
export const $decryptDes = (message, key) => {
  var keyHex = cryptoJs.enc.Utf8.parse(key)
  var decrypted = cryptoJs.DES.decrypt(
    {
      ciphertext: cryptoJs.enc.Hex.parse(message)
    },
    keyHex,
    {
      mode: cryptoJs.mode.ECB,
      padding: cryptoJs.pad.Pkcs7
    }
  )
  return decrypted.toString(cryptoJs.enc.Utf8)
}
