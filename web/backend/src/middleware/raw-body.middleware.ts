import { Injectable, NestMiddleware } from '@nestjs/common'
import * as bodyParse from 'body-parser'
import { Request, Response } from 'express'

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    bodyParse.raw({ type: '*/*' })(req, res, next)
  }
}
