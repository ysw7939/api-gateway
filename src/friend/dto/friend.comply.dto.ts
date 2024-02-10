import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class FriendComplyDto {
    @IsNumber()
    friendRequestId: number;
} 