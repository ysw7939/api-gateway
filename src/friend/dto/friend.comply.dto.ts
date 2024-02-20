import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class FriendComplyDto {
    @IsNumber()
    @ApiProperty({
        description: '친구 신청 목록의 고유 번호',
        example: 1,
        type: Number
    })
    friendRequestId: number;
} 