import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { GameService } from './game.service';

import { GameResultDto } from './dto/game.result.create.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags,ApiOperation ,ApiBody,ApiResponse} from '@nestjs/swagger';
import { ResponseEntity } from 'src/configs/res/ResponseEntity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('game')
@ApiBearerAuth('access-token')
@ApiTags('게임 API')
@UseGuards(AuthGuard())
export class GameController {
    constructor(private gameService: GameService) { }

    @ApiOperation({ summary: "게임 결과 전송" })
    @ApiBody({
        type: GameResultDto,
        description:"게스트 회원가입에 대한 필수 요청 항목"
    })
    @ApiResponse({
        type: ResponseEntity,
    })
    @Post('/result')
    async create(@Body(ValidationPipe) gameResultDto: GameResultDto, @GetUser() user: User): Promise<ResponseEntity<string>> {
        await this.gameService.gameRecord(gameResultDto, user);
        return ResponseEntity.OK();
    }
}
