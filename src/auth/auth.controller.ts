import { Body, Controller, Param, Post, Get, ValidationPipe, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthLoginGuestDto } from './dto/auth.guest.login.dto';
import { AuthCreateGuestDto } from './dto/auth.guest.create.dto';

import { ApiBody, ApiExtraModels, ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { AccessAddDto, CheckAddDto, ResponseEntity } from 'src/configs/res/ResponseEntity';
import { AccessTokenDto } from './dto/auth.access.dto';
import { CheckDto } from './dto/auth.check.dto';
import { AuthCreateDto } from './dto/auth.create.dto';

@ApiExtraModels(
    AccessTokenDto,
    CheckDto,
    ResponseEntity
)
@Controller('auth')
@ApiTags('유저 API')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    @ApiOperation({ summary: "일반 사용자 회원가입" })
    @ApiBody({
        type: AuthCreateDto,
        description:"회원가입에 대한 필수 요청 항목"
    })
    @ApiResponse({
        description: "회원가입 성공 응답",
        type: ResponseEntity
    })
    async signUp(@Body(ValidationPipe) authCreateDto: AuthCreateDto): Promise<ResponseEntity<string>> {
        await this.authService.signUp(authCreateDto);
        return ResponseEntity.OK();
    }

    @Post('/signin')
    @ApiOperation({ summary: "일반 사용자 로그인" })
    @ApiBody({
        type: AuthLoginDto,
        description:"로그인에 대한 필수 요청 항목"
    })
    @ApiResponse({
        type: AccessAddDto
    })
    @HttpCode(200)
    async signIn(@Body(ValidationPipe) authLoginDto: AuthLoginDto): Promise<ResponseEntity<AccessTokenDto>> {
        return ResponseEntity.OK_WITH( await this.authService.signIn(authLoginDto));
    }

    @Post('/guest/signup')
    @ApiOperation({ summary: "게스트 사용자 회원가입" })
    @ApiBody({
        type: AuthCreateGuestDto,
        description:"게스트 회원가입에 대한 필수 요청 항목"
    })
    @ApiResponse({
        description: "회원가입 성공 응답",
        type: ResponseEntity
    })
   async guestSignUp(@Body(ValidationPipe) authCreateGuestDto: AuthCreateGuestDto): Promise<ResponseEntity<string>> {
        await this.authService.guestSignUp(authCreateGuestDto);
        return ResponseEntity.OK(); 
    }

    @ApiOperation({ summary: "게스트 사용자 로그인" })
    @ApiBody({
        type: AuthLoginGuestDto,
        description:"게스트 로그인에 대한 필수 요청 항목"
    })
    @ApiResponse({
        type: AccessAddDto
    })
    @Post('guest/signin')
    async guestSignIn(@Body(ValidationPipe) authLoginDto: AuthLoginGuestDto): Promise<ResponseEntity<AccessTokenDto>> {
        return ResponseEntity.OK_WITH(await this.authService.guestSignIn(authLoginDto));
    }


    @ApiOperation({ summary: "아이디 중복확인" })
    @ApiParam({
        name: 'userName',
        description : "중복 확인할 아이디"
    })
    @ApiResponse({
        type: CheckAddDto,
    })
    @Get('check-username/:userName')
    async checkUsername(@Param('userName') userName: string): Promise<ResponseEntity<CheckDto>> {
        return ResponseEntity.OK_WITH(await this.authService.checkAddress(userName));
    }

    @ApiOperation({ summary: "닉네임 중복확인" })
    @ApiParam({
        name: 'nickname',
        description : "중복 확인할 닉네임"
    })
    @ApiResponse({
        type: CheckAddDto,
    })
    @Get('check-nickname/:nickname')
    async checkNickname(@Param('nickname') userName: string): Promise<ResponseEntity<CheckDto>> {
        return ResponseEntity.OK_WITH(await this.authService.checkNickname(userName));
    }
}
