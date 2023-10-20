export interface HttpExceptionResponse {
  statusCode: number;
  message: string;
}
export interface HttpCustomExceptionResponse extends HttpExceptionResponse {
  timestamp: Date;
  method: string;
  path: string;
}
