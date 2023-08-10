import { Injectable, NestMiddleware } from '@nestjs/common'
import * as bodyParse from 'body-parser'
import { Request, Response } from 'express'

@Injectable()
export class JsonBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    bodyParse.json()(req, res, next)
  }
}
