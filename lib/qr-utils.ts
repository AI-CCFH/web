import CryptoJS from "crypto-js"

// Simplified interface for QR code data (only the fields we need)
export interface QRProductData {
  name: string
  productType?: string
  quantity: number
  importDate?: string
  expiryDate?: string
}

// Secret key for encryption/decryption (in production, this should be in an environment variable)
const SECRET_KEY = "LogiTrack-QR-Secret-Key-2025"

/**
 * Encrypts product data for QR code
 * @param data Product data to encrypt
 * @returns Encrypted string that can be used in QR code
 */
export function encryptProductData(data: QRProductData): string {
  // Convert data to JSON string
  const jsonData = JSON.stringify(data)
  
  // Encrypt the data
  const encryptedData = CryptoJS.AES.encrypt(jsonData, SECRET_KEY).toString()
  
  // Make the string URL-safe
  return encodeURIComponent(encryptedData)
}

/**
 * Decrypts product data from QR code
 * @param encryptedData Encrypted string from QR code
 * @returns Decrypted product data
 */
export function decryptProductData(encryptedData: string): QRProductData | null {
  try {
    // URL-decode the string
    const decodedData = decodeURIComponent(encryptedData)
    
    // Decrypt the data
    const decryptedBytes = CryptoJS.AES.decrypt(decodedData, SECRET_KEY)
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8)
    
    // Parse JSON
    return JSON.parse(decryptedText) as QRProductData
  } catch (error) {
    console.error("Error decrypting QR code data:", error)
    return null
  }
}

/**
 * Generates a URL with encrypted product data for QR code
 * @param data Product data to encode in QR
 * @param baseUrl Base URL of the website
 * @returns Full URL for QR code
 */
export function generateQRCodeUrl(data: QRProductData, baseUrl?: string): string {
  const encryptedData = encryptProductData(data)
  
  // Handle baseUrl safely for both client and server environments
  let url = baseUrl || ''
  
  // If we're in browser and no baseUrl was provided, use the window.location.origin
  if (typeof window !== 'undefined' && !baseUrl) {
    url = window.location.origin
  }
  
  return `${url}/product/scan?data=${encryptedData}`
}
