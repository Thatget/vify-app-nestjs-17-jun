import * as crypto from 'crypto'

export default class HmacValidator {
  private hmac: crypto.Hmac
  private readonly ENCODING = 'sha256'

  constructor(private secret: string) {
    this.hmac = crypto.createHmac(this.ENCODING, this.secret)
  }

  private hashing(payload: crypto.BinaryLike, encoding: crypto.BinaryToTextEncoding = 'hex'): string {
    return this.hmac
      .update(payload)
      .digest(encoding)
  }

  verify(hashed: string, payload: crypto.BinaryLike) {
    const hashedBuffer = Buffer.from(hashed)

    const generatedHash = this.hashing(payload)
    const generatedBuffer = Buffer.from(generatedHash)

    return crypto.timingSafeEqual(hashedBuffer, generatedBuffer)
  }

}
