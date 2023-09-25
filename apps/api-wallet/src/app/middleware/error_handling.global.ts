import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
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
        .json({ error: 'Unauthorized', message: 'Login Required' });
    } else if (exception instanceof BadRequestException) {
      response.status(400).json({
        error: 'Bad Request',
        message: 'All fields must not be empty',
      });
    } else {
      response.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong.',
      });
    }
  }
}
