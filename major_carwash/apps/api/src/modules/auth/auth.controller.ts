import { Controller, All, Req, Res, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { MikroORM, RequestContext } from '@mikro-orm/core'; 
import { ApiTags, ApiOperation, ApiBody, ApiExcludeEndpoint } from '@nestjs/swagger'; 
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';

@ApiTags('Authentication')
@Controller('auth') 
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly orm: MikroORM 
  ) {}

  // ==========================================
  // EXPLICIT ROUTES (FULLY IMPLEMENTED)
  // ==========================================

  @Post('sign-up/email')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' }, name: { type: 'string' } }, required: ['email', 'password', 'name'] } })
  async signUp(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
    return this.executeProxy(req, res);
  }

  @Post('sign-in/email')
  @ApiOperation({ summary: 'Authenticate with Email and Password' })
  @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } }, required: ['email', 'password'] } })
  async signIn(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
    return this.executeProxy(req, res);
  }

  @Get('get-session')
  @ApiOperation({ summary: 'Retrieve active user session cookies data' })
  async getSession(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
    return this.executeProxy(req, res);
  }

  @Post('sign-out')
  @ApiOperation({ summary: 'Destroy active authorization token' })
  async signOut(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
    return this.executeProxy(req, res);
  }

  // ==========================================
  // FALLBACK CATCH-ALL ROUTER
  // ==========================================

  @All('*path')
  @ApiExcludeEndpoint() // Hides fallback from Swagger UI since explicit routes are defined above
  async handleAuthFallback(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
    return this.executeProxy(req, res);
  }

  // ==========================================
  // SHARED CORE PROXY ENGINE
  // ==========================================

  private async executeProxy(req: ExpressRequest, res: ExpressResponse) {
    return RequestContext.create(this.orm.em, async () => {
      try {
        const protocol = req.secure ? 'https' : 'http';
        const host = req.get('host');
        const fullUrl = `${protocol}://${host}${req.originalUrl}`;
        
        const isMutation = ['POST', 'PUT', 'PATCH'].includes(req.method);
        
        // Build fresh, clean headers to pass down
        const headers = new Headers(req.headers as Record<string, string>);
        if (isMutation && req.body) {
          headers.set('content-type', 'application/json');
        }

        // Safe JSON parsing guard to prevent empty payload exceptions
        let body: string | undefined = undefined;
        if (isMutation && req.body && Object.keys(req.body).length > 0) {
          body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        }

        // Construct standard Request object required by Better Auth handler
        const authRequest = new Request(fullUrl, {
          method: req.method,
          headers: headers,
          body,
        });

        // Delegate execution to Better Auth engine instance
        const authResponse = await this.authService.auth.handler(authRequest);

        // Map web standard Response object headers back to Express response object
        authResponse.headers.forEach((value, key) => {
          res.setHeader(key, value);
        });

        // Finalize response distribution
        return res
          .status(authResponse.status)
          .send(await authResponse.text());

      } catch (error: unknown) {
        return res
          .status(500)
          .json({ message: 'Internal auth router exception', error: (error as Error).message });
      }
    });
  }
}
