import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class FriendRequestDto {
    @ApiProperty({
        description: '친구 신청을 받는 사용자의 닉네임',
        example: 'nickname',
        type: String,
    })
    @IsString()
    nickname: string;
} 