import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof NotFoundException) {
      response
        .status(404)
        .json({ error: 'Not Found', message: exception.message });
    } else if (exception instanceof UnauthorizedException) {
      response
        .status(401)
        .json({ error: 'Unauthorized', message: exception.message });
    } else {
      response.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong.',
      });
    }
  }
}
