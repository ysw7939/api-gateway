import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";


export class AuthCreateDto {
    @ApiProperty({
        description: '로그인의 필요한 사용자 아이디',
        example:'suwon123',
        type: String,
    })
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    address: string;

    @ApiProperty({
        description: '로그인의 필요한 사용자 비밀번호',
        example:'passwd123',
        type: String
    })
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    //영어랑 숫자만 가능한 유효성 체크
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: '영어와 숫자만 입력 가능합니다.'
    })
    passwd: string;

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    //영어랑 숫자만 가능한 유효성 체크
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: '이메일 형식에 맞지 않습니다.'
    })
    @ApiProperty({
        description: '이메일',
        example:'suwon@com2us.com',
        type: String
    })
    email: string;
    
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    @ApiProperty({
        description: '사용자의 닉네임',
        example:'myNickname',
        type: String
    })
    nickname: string;
}