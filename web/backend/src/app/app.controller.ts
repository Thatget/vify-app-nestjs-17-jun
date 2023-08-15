import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService
  ) {}

  @Get()
  async rootApp(@Req() req: Request, @Res() res: Response) {
    const node_env = this.configService.get<string>('app.node_env')
    const STATIC_PATH =
      node_env === 'production'
        ? `${process.cwd()}/../frontend/dist/`
        : `${process.cwd()}/../frontend/`;
        console.log("join(STATIC_PATH, 'index.html')", join(STATIC_PATH, 'index.html'))
    return res.sendFile(join(STATIC_PATH, 'index.html'))
  }
}
