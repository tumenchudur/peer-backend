import config from '@root/config'
import { createCipheriv, createDecipheriv, createHash } from 'crypto'
import { randomPassword, lower, upper, digits, symbols } from 'secure-random-password'

function encrypt(data: string): string {
    const iv = createHash('sha256').update(config.crypto.hash_iv).digest()
    const resizedIV = Buffer.allocUnsafe(16)
    iv.copy(resizedIV)

    const hashKey = createHash('sha256').update(config.crypto.hash_key).digest()

    const cipher = createCipheriv('aes256', hashKey, resizedIV)

    const encrypted = Buffer.concat([cipher.update(data), cipher.final()])

    return encrypted.toString('hex')
}

function decrypt(hashed: string): string {
    const iv = createHash('sha256').update(config.crypto.hash_iv).digest()
    const resizedIV = Buffer.allocUnsafe(16)
    iv.copy(resizedIV)

    const hashKey = createHash('sha256').update(config.crypto.hash_key).digest()

    const decipher = createDecipheriv('aes256', hashKey, resizedIV)

    const decrypted = Buffer.concat([decipher.update(Buffer.from(hashed, 'hex')), decipher.final()])

    return decrypted.toString()
}

function generatePassword(
    length = 32,
    characters = [lower, upper, digits, symbols]
): string {
    const password = randomPassword({
        length,
                characters
    })

    return password
}

export default {
    encrypt,
    decrypt,
    generatePassword
    // objectIdWithTimestamp
}
