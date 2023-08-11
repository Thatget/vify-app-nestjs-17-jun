import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import HmacValidator from '../../utils/hmac';

@Injectable()
export class StoreFrontendService {
  constructor(private readonly config: ConfigService) {}

  public verifySignature(query) {
    const hashed = query.signature as string;
    delete query.signature;
    const queryString = Object.keys(query)
      .sort()
      .map((key: string) => `${key}=${query[key as keyof typeof query]}`)
      .join('');

    const hmacValidator = new HmacValidator(
      this.config.get<string>('shopify.api_secret') as string,
    );

    return hmacValidator.verify(hashed, queryString);
  }
}
