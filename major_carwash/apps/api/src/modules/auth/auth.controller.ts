// apps/api/src/modules/auth/auth.controller.ts
import { Controller, All, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import type { Request, Response } from 'express';

// Remove the hardcoded 'api/' if you use setGlobalPrefix('api') inside main.ts
@Controller('auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // FIX: Using '*path' syntax satisfies NestJS/path-to-regexp v11 wildcard formatting requirements
  @All('*path')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    const protocol = req.secure ? 'https' : 'http';
    const fullUrl = `${protocol}://${req.get('host')}${req.originalUrl}`;
    
    const bodyString = ['POST', 'PUT', 'PATCH'].includes(req.method) 
      ? JSON.stringify(req.body) 
      : undefined;

    const webRequest = new Request(fullUrl, {
      method: req.method,
      headers: req.headers as HeadersInit,
      body: bodyString,
    });

    const webResponse = await this.authService.auth.handler(webRequest);

    res.status(webResponse.status);
    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    return res.send(await webResponse.text());
  }
}
