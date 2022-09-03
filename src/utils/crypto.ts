import CryptoJS from 'crypto-js'

const encrypt = (text: string, key: string): string => CryptoJS.AES.encrypt(text, key).toString()

const decrypt = (text: string, key: string): string => CryptoJS.AES.decrypt(text, key).toString()

export const CryptoUtil = {
  encrypt,
  decrypt
}