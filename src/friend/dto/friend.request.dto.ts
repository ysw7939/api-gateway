import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class FriendRequestDto {
    @IsNumber()
    fromUser: number;
    @IsNumber()
    toUser: number;
} 