import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  HttpCustomExceptionResponse,
  HttpExceptionResponse,
} from './models/http-exception-response.interface';
import * as fs from 'fs';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const errorResponse = exception.getResponse();
      errorMessage =
        (errorResponse as HttpExceptionResponse).message || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical Internal Server Error';
    }

    const errorResponse: HttpCustomExceptionResponse = this.getResponse(
      status,
      errorMessage,
      request,
    );

    const errorLog = this.getErrorLog(errorResponse);
    this.writeErrorLogToFile(errorLog);

    response.status(status).json(errorResponse);
  }

  private getResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ): HttpCustomExceptionResponse => ({
    statusCode: status,
    message: errorMessage,
    path: request.url,
    timestamp: new Date(),
    method: request.method,
  });

  private getErrorLog = (
    errorResponse: HttpCustomExceptionResponse,
  ): string => {
    const errorLog = `${JSON.stringify(errorResponse)}\n`;
    return errorLog;
  };

  private writeErrorLogToFile = (errorLog: string) => {
    fs.appendFile('error.log', errorLog, 'utf-8', (err) => {
      if (err) throw err;
    });
  };
}
