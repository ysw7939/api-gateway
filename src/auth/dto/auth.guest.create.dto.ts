import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCreateGuestDto {
    @IsString()
    @MinLength(4)
    @MaxLength(200) 
    @IsNotEmpty()
    @ApiProperty({
        description: '접속한 디바이스의 고유한 시리얼 넘버',
        example:'디바이스 id',
        type: String,
    })
    guestId: string;

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    @Matches(/^[a-zA-Z0-9가-힣]*$/, { message: '영어 숫자 한글만 가능합니다' })
    @ApiProperty({
        description: '사용자의 닉네임 (a-zA-Z0-9가-힣)만 가능',
        example:'myNickname',
        type: String,
    })
    nickname: string;
}