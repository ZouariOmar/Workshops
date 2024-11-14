import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Type de requête: ${req.method} - URL: ${req.originalUrl}`);
    next(); // Passe au middleware suivant
  }
}
