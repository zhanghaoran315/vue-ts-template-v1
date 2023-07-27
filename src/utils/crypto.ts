/*
 * @description 前端加密解密方法模块
 */

import CryptoJS from 'crypto-js'
// 默认DES密钥 (加密秘钥长度必须是16的整数倍)
const KEY_DES = '\u0067\u0072\u0065\u0061\u0074\u006d\u0061\u0070'
// 默认AES密钥
const KEY_AES = 'd1ca833579a311ca683f362d5b93e7c7'

export const crypto = {
  /*
   * [DES 加密]
   * @description des对称数据加密算法（Data Encryption Algorithm），是一种对称加密算法。
   * @param {string} strMessage 待加密内容
   * @param {string} key 密钥串
   * @returns {string} 加密后的内容
   */
  encryptByDES(strMessage: string, key?: string) {
    key = key || KEY_DES
    const keyHex = CryptoJS.enc.Utf8.parse(key) // 从utf8解析出原始字符串
    const encrypted = CryptoJS.DES.encrypt(strMessage, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  },
  /*
   * [DES 解密]
   * @param {string} strMessage 待解密内容
   * @param {string} key 密钥串
   * @returns {string} 解密后的内容
   */
  decryptByDES(strMessage: string, key?: string) {
    key = key || KEY_DES
    const keyHex = CryptoJS.enc.Utf8.parse(key)
    const decrypted = CryptoJS.DES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(strMessage)
      } as CryptoJS.lib.CipherParams,
      keyHex,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }
    )
    return decrypted.toString(CryptoJS.enc.Utf8)
  },
  /*
   * [AES 加密]
   * @description 密码学中的高级加密标准（Advanced Encryption Standard，AES），又称Rijndael加密法，属于一种对称加密算法。
   * @param {string} strMessage 待加密内容
   * @param {string} key 密钥串
   * @returns {string} 加密后的内容
   */
  encryptByAES(strMessage: string, key?: string) {
    key = key || KEY_AES
    const keyHex = CryptoJS.enc.Hex.parse(key)
    const srcs = CryptoJS.enc.Utf8.parse(strMessage)
    const encrypted = CryptoJS.AES.encrypt(srcs, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  },
  /*
   * [AES 解密]
   * @param {string} strMessage 待解密内容
   * @param {string} key 密钥串
   * @returns {string} 解密后的内容
   */
  decryptByAES(strMessage: string, key?: string) {
    key = key || KEY_AES
    const keyHex = CryptoJS.enc.Hex.parse(key)
    const decrypted = CryptoJS.AES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(strMessage)
      } as CryptoJS.lib.CipherParams,
      keyHex,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }
    )
    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}
