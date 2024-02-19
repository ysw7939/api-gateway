import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { GameService } from './game.service';

import { Game } from './game.entity';
import { GameResultDto } from './dto/game.result.create.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/configs/res/ResponseEntity';

@Controller('game')
@ApiBearerAuth('access-token')
@ApiTags('게임 API')
@UseGuards(AuthGuard())
export class GameController {
    constructor(private gameService: GameService) { }

    @Post('/result')
    async create(@Body(ValidationPipe) gameResultDto: GameResultDto): Promise<ResponseEntity<string>> {
        await this.gameService.gameRecord(gameResultDto);
        return ResponseEntity.OK();
    }
}
