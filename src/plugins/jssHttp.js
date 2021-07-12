import JsEncrypt from 'encryptlong'

//公钥
const PUBLIC_KEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxFb+e8CF0sie4aVYq0dnjpef1vghU5+yR/G1QTF8Px3NGmHrQyu6/7anRPzqQ4QGilJZfT+gLXE0HJbqihfaCQi5u/bO5LnuEj6DYfG7mhRS73Yspp4msieJfkLKRMSSz4OxyDTael/x4Q9Cy8Qa8Dr/yeIvwALtiYRF+Nh1IJwIDAQAB'
//私钥
const PRIVATE_KEY =
  'MIICXQIBAAKBgQDa3Hs2FDkmyiEMzvzPmdyHFciRYZ4zVxzj5ngYUGMXUH5M63dnB/0CZ2IH6ncgz1QkGQxbcFNf7ov6+xa5xiAtbxRe2MH2o5ZE6YCOxcvgwRX681WqUz/RNdN+YBezLd+8zIHwbrCuRLdIFR2GZLfkWFIKRrPoyGFVOXBKEYpZQQIDAQABAoGAYALFEm5AvCGD6iiLg08ODTyjJhPa4M7gX6HlIVVygvHO1lOdp9c7SOiteqeC5yPM16EdaKeYC8eMJOgtigW+ayA7sADk5GSe1WM6AxW5pB2FcSIaOx3aEdCxq2PnZqcABPLPP9vMETMWYVt5VocUxW6+9vUh95cYpRG3rwFFcpkCQQDlIAXw2I1629CzcM6Dlmqqf6hy3lppbTcD17DxoPfknZUDl+GVTEP1lnjCgexKnnllfDWb879E486kH7wSgWrLAkEA9IhDoxvZ8ibNTrte4g2f6RcFF2sRFWPVz9y+TEOZDeVj72o4owpv1lpz4FdOO7FW1DyEr/FKN/9HRSaphRzOowJBAMI8wYyJqHbMvkJAkXHQJCDiE+U9Rpw1b/wb7+8HLN9sD5V6PkyY2MvrgfgyuCQR8IvuHmxU2IMINHfCR2fQur0CQCgshugyODFHXK2VrPX4hRAXXxfE2E6qU0NOIdmHtYqJ6Ew6KEno+gy+WZE+5rR54ykFNEtvmeDvSLc8rdcXr38CQQDcm4QDJZSP4mZyFPReaVST6y9XVhsYnuOKPn4+bZGWHVklaGdTUUChDcg02Pc57w3hvcw9Na6ie3eGxzicgB9D'


  //实名制公钥
const PUBLIC_KEY_realName = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIeh9Rge1ilndLVF0iriMgrdZJSoO2ewlb+NzGm3VO54cTXb16ZzcS6PYo40Ty4plw62D2U3sHIUWHSnanWs4q+KZWqZ19/ufANToV7Z2vTlnxd/q2qJkRQThYXhcQ0wcr7vBHhQxuw2IikKuOGQjR01E6p4jVPEtoV3p9h1HfuwIDAQAB/GnUEYf0pf59yTA0SJTWIScBt5BOTUpWqJwVGbWxpzpajEfPDg8lsSighRhYoGjPkSOscr4GBYlnrRaDaUJd8Ali8P0BoXgScgBEyJZ/eZznQIDAQAB";



export const $encruption = function(obj) {
  let encrypt = new JsEncrypt()
  encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + PUBLIC_KEY + '-----END PUBLIC KEY-----')
  return encrypt.encryptLong(obj)
}
//RSA解密
export const $decryption = function(obj) {
  let _decryp = new JsEncrypt()
  _decryp.setPrivateKey(
    '-----BEGIN RSA PRIVATE KEY-----' + PRIVATE_KEY + '-----END RSA PRIVATE KEY-----'
  )
  var data = _decryp.decryptLong(obj)
  return data
}


export const $encruption_realName = function (obj) {
	let encrypt = new JsEncrypt();
	encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + PUBLIC_KEY_realName + '-----END PUBLIC KEY-----');
	return encrypt.encryptLong(obj);
}
