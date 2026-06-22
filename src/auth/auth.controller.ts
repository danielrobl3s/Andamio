import { All, Controller, Req, Res } from '@nestjs/common';
import { auth } from '../lib/auth';
import { toNodeHandler } from 'better-auth/node';
import type { Request, Response } from 'express';

@Controller('/api/auth')
export class AuthController {
    @All('*')
    async handleAuth(@Req() req: Request, @Res() res: Response) {
    const handler = toNodeHandler(auth);
    return handler(req, res);
  }
}
