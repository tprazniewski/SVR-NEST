import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { MongoError } from 'mongodb';
import { Error } from 'mongoose';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: AbstractHttpAdapter) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    const httpAdapter = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      return httpAdapter.reply(
        ctx.getResponse(),
        exception.getResponse(),
        httpStatus,
      );
    }

    if (exception instanceof Error.ValidationError) {
      if (exception.errors.name.kind === 'unique') {
        const responseBody = {
          status: HttpStatus.FORBIDDEN,
          error: `We don't accept duplicatess`,
        };
        return httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
      }
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    // Potentially could add swtich instead od if statement
    if (exception instanceof MongoError) {
      if (exception.code === 11000) {
        const responseBody = {
          status: HttpStatus.FORBIDDEN,
          error: `We don't accept duplicatess`,
        };
        return httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
      }
    }
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
