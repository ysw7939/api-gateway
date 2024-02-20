import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCreateGuestDto {
    @IsString()
    @MinLength(4)
    @MaxLength(50) 
    @ApiProperty({
        description: '접속한 디바이스의 고유한 시리얼 넘버',
        example:'디바이스 id',
        type: String,
    })
    guestId: string;

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    @ApiProperty({
        description: '사용자의 닉네임',
        example:'user_nickname',
        type: String,
    })
    nickname: string;
}