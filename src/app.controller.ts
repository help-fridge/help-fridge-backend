import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';
import * as path from 'path';
import { AuthGuard } from './auth/common/guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get('/public')
  getIndex(@Req() req: Request, @Res() res: Response) {
    // console.log(req.user);
    // console.log(req);
    const filePath = path.join(
      '/Users/su-in-i/dev/help-fridge/help-fridge/public',
      'index.html',
    );
    return res.sendFile(filePath);
  }

  @Get('/login')
  getIndex1(@Req() req: Request, @Res() res: Response) {
    // console.log(req.user);
    // console.log(req);
    const filePath = path.join(
      '/Users/su-in-i/dev/help-fridge/help-fridge/public',
      'login.html',
    );
    return res.sendFile(filePath);
  }
}
