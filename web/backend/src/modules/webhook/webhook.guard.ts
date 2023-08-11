import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'crypto';
import { IncomingMessage } from 'http';
import { Request } from 'express';

@Injectable()
export class WebhookGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService
) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const secretKey = this.configService.get<string>('shopify.api_secret') as string
    const req = context
      .switchToHttp()
      .getRequest<Request<IncomingMessage>>();

    const hmacHeader = req.headers['x-shopify-hmac-sha256']

    if (!hmacHeader || typeof hmacHeader !== 'string') {
      throw new UnauthorizedException(
        `Not Authorized`,
      );
    }  

    if (!req.body) {
      throw new InternalServerErrorException(
        `Raw body not found`,
      );
    }

    const generatedHash = createHmac('sha256', secretKey)
      .update(req.body)
      .digest('base64');

    const generatedHashBuffer = Buffer.from(generatedHash);
    const hmacBuffer = Buffer.from(hmacHeader);

    if (generatedHashBuffer.length !== hmacBuffer.length) {
      throw new UnauthorizedException(
        `Not Authorized`,
      );
    }

    if (!timingSafeEqual(generatedHashBuffer, hmacBuffer)) {
      throw new UnauthorizedException(
        `Not Authorized`,
      );
    }

    return true;
  }
}