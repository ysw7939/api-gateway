import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class GameResultDto {
    @IsNumber()
    @ApiProperty({
        description: '사용자의 고유 번호',
        example: 1,
        type: Number,
    })
    userId: number;

    @IsNumber()
    @ApiProperty({
        description: '게임내 플레이어 역할 고유 번호',
        example: 1,
        type: Number,
    })
    roleId: number;

    @ApiProperty({
        description: '사용자의 세션 정보',
        example: "사용자 세션",
        type: String,
    })
    userSession: string;

    @ApiProperty({
        description: '플레이한 룸의 세션 정보',
        example: "룸 세션",
        type: String,
    })
    roomSession: string;

    @ApiProperty({
        description: '이겼는지 확인하는 항목',
        example: true,
        type: Boolean,
    })
    @IsBoolean()
    isWin: boolean;
}