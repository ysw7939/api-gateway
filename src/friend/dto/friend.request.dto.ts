import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class FriendRequestDto {
    @ApiProperty({
        description: '친구 신청을 받는 사용자의 고유 번호',
        example: 2,
        type: Number,
    })
    @IsNumber()
    toUser: number;
} 