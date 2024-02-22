import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  ValidationPipe,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthLoginGuestDto } from './dto/auth.guest.login.dto';
import { AuthCreateGuestDto } from './dto/auth.guest.create.dto';

import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ResponseAccessDto,
  ResponseCheckDto,
  ResponseEntity,
} from 'src/configs/res/ResponseEntity';
import { AccessTokenDto } from './dto/auth.access.dto';
import { CheckDto } from './dto/auth.check.dto';
import { AuthCreateDto } from './dto/auth.create.dto';
import { IsString, Matches } from 'class-validator';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './user.entity';
import { lastValueFrom } from 'rxjs';

class NicknameParams {
  @IsString()
  @Matches(/^[a-zA-Z0-9가-힣]*$/)
  nickname: string;
}

class userIdParams {
  @IsString()
  @Matches(/^[a-zA-Z0-9]*$/)
  id: string;
}

@ApiExtraModels(AccessTokenDto, CheckDto, ResponseEntity)
@Controller('user')
@ApiTags('유저 API')
export class AuthController {
  constructor(
    @Inject('AUTH')
    private readonly authClient: ClientProxy,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  @ApiOperation({ summary: '일반 사용자 회원가입' })
  @ApiBody({
    type: AuthCreateDto,
    description: '회원가입에 대한 필수 요청 항목',
  })
  @ApiResponse({
    description: '회원가입 성공 응답',
    type: ResponseEntity,
  })
  async signUp(@Body(ValidationPipe) authCreateDto: AuthCreateDto) {
    return await this.authClient.send('signUp', authCreateDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: '일반 사용자 로그인' })
  @ApiBody({
    type: AuthLoginDto,
    description: '로그인에 대한 필수 요청 항목',
  })
  @ApiResponse({
    type: ResponseAccessDto,
  })
  @HttpCode(200)
  async signIn(@Body(ValidationPipe) authLoginDto: AuthLoginDto) {
    return await this.authClient.send('signIn', authLoginDto);
  }

  @Post('signup/guest')
  @ApiOperation({ summary: '게스트 사용자 회원가입' })
  @ApiBody({
    type: AuthCreateGuestDto,
    description: '게스트 회원가입에 대한 필수 요청 항목',
  })
  @ApiResponse({
    description: '회원가입 성공 응답',
    type: ResponseEntity,
  })
  async guestSignUp(
    @Body(ValidationPipe) authCreateGuestDto: AuthCreateGuestDto,
  ) {
    return await this.authClient.send('guestSignUp', authCreateGuestDto);
  }

  @ApiOperation({ summary: '게스트 사용자 로그인' })
  @ApiBody({
    type: AuthLoginGuestDto,
    description: '게스트 로그인에 대한 필수 요청 항목',
  })
  @ApiResponse({
    type: ResponseAccessDto,
  })
  @Post('signin/guest')
  async guestSignIn(@Body(ValidationPipe) authLoginDto: AuthLoginGuestDto) {
    return await this.authClient.send('signIn', authLoginDto);
  }

  @ApiOperation({ summary: '아이디 중복확인' })
  @ApiParam({
    name: 'id',
    description: '중복 확인할 아이디',
  })
  @ApiResponse({
    type: ResponseCheckDto,
  })
  @Get('userid/:id/duplicate')
  async checkUsername(@Param(ValidationPipe) param: userIdParams) {
    return await this.authClient.send('checkAddress', param.id);
  }

  @ApiOperation({ summary: '닉네임 중복확인' })
  @ApiParam({
    name: 'nickname',
    description: '중복 확인할 닉네임',
  })
  @ApiResponse({
    type: ResponseCheckDto,
  })
  @Get('nickname/:nickname/duplicate')
  async checkNickname(@Param(ValidationPipe) param: NicknameParams) {
    return await this.authClient.send('checkNickname', param.nickname);
  }

}
