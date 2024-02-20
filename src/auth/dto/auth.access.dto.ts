import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenDto {
    @ApiProperty({
        description: "인증 토큰",
        type: String
    })
    accessToken: string;
} 