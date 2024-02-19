import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ResponseStatus } from './ResponseStatus';

export class ResponseEntity<T> {
  @Exclude() private readonly statusCode: number;
  @Exclude() private readonly message: string;
  @Exclude() private readonly data: T;

  private constructor(status: ResponseStatus, message: string, data: T) {
    this.statusCode = status;
    this.message = message;
    this.data = data;
  }

  static OK(): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.OK, 'success', '');
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.OK, 'success', data);
  }
  static OK_MSG<T>(msg: string ,data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.OK, msg, data);
  }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      ResponseStatus.SERVER_ERROR,
      '서버 에러가 발생했습니다.',
      '',
    );
  }

  static ERROR_WITH(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
  ): ResponseEntity<string> {
    return new ResponseEntity<string>(code, message, '');
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
    data: T,
  ): ResponseEntity<T> {
    return new ResponseEntity<T>(code, message, data);
  }

}
