import { ApiProperty } from "@nestjs/swagger";

export class SearchUserDto {
    @ApiProperty({
        example: "myNickname",
        description: "사용자의 닉네임"
    })
    nickname: string;

    @ApiProperty({
        example: 1,
        description: "사용자의 고유 번호",
    })
    userId: Number; 
} 