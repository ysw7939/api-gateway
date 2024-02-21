import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { ResponseStatus } from './ResponseStatus';
import { AccessTokenDto } from 'src/auth/dto/auth.access.dto';
import { CheckDto } from 'src/auth/dto/auth.check.dto';
import { FriendRequest } from 'src/friend/friend.request.entity';
import { FriendListDto } from 'src/friend/dto/friend.list.dto';
import { FriendRequestListDto } from 'src/friend/dto/friend.request.list.dto';
import { HttpStatus } from '@nestjs/common';


export class ResponseEntity<T> {
    @ApiProperty({
        description: "상태 코드"
    })
    private readonly statusCode: number;
    @ApiProperty({
        description: "메세지",
        example:"message"
    })
    private readonly message: string;
    @ApiProperty({
        description: "응답 데이터"
    })
    data: T;

  public constructor(status: number, message: string, data: T) {
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
    status : HttpStatus,
    message: string,
  ): ResponseEntity<string> {
    return new ResponseEntity<string>(status, message, '');
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
    data: T,
  ): ResponseEntity<T> {
    return new ResponseEntity<T>(code, message, data);
  }
    
}



export class SwaggerResponse extends OmitType(ResponseEntity, ['data'] as const) { }

export class ResponseCheckDto extends IntersectionType(
    SwaggerResponse
) {
    @ApiProperty()
    data: CheckDto
} 

export class ResponseAccessDto extends IntersectionType(
    SwaggerResponse
) {
    @ApiProperty()
    data: AccessTokenDto
} 

export class ResponseFriendRequestDto  extends IntersectionType(
    SwaggerResponse
) {
    @ApiProperty({
        type: [FriendRequest]
    })
    data: FriendRequest[]
} 

export class ResponseFriendListDto  extends IntersectionType(
    SwaggerResponse
) {
    @ApiProperty({
        type: [FriendListDto]
    })
    data: FriendListDto[]
} 

export class ResponseFriendRequestListDtoDto  extends IntersectionType(
    SwaggerResponse
) {
    @ApiProperty({
        type: [FriendRequestListDto]
    })
    data: FriendRequestListDto[]
} 

