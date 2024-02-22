
import { IsOptional, IsString } from "class-validator";
import { User } from "src/auth/user.entity";

export class FriendRequestDto {
  @IsString()
  nickname: string;

  @IsOptional()
  user: User|null
} 