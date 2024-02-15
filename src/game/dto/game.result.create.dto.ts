import { IsBoolean, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class GameResultDto {
    @IsNumber()
    userId: number;
    @IsNumber()
    roleId: number;
    userSession: string;
    roomSession: string;
    @IsBoolean()
    isWin: boolean;
}