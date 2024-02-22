
import { IsBoolean, IsNumber} from "class-validator";

export class GameResultDto {
    @IsNumber()
    roleId: number;


    userSession: string;

    roomSession: string;

    @IsBoolean()
    isWin: boolean;
}