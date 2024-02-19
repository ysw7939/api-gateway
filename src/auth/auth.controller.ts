import { Body, Controller, Param, Post, Get, UseGuards, ValidationPipe, HttpCode } from '@nestjs/common';
import { AuthCreateDto } from './dto/auth.create.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthLoginGuestDto } from './dto/auth.guest.login.dto';
import { AuthCreateGuestDto } from './dto/auth.guest.create.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/configs/res/ResponseEntity';
import { AccessTokenDto } from './dto/auth.access.dto';
import { CheckDto } from './dto/auth.check.dto';


@Controller('auth')
@ApiTags('유저 API')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCreateDto: AuthCreateDto): Promise<ResponseEntity<string>> {
        await this.authService.signUp(authCreateDto);
        return ResponseEntity.OK();
    }

    @Post('/signin')
    @HttpCode(200)
    async signIn(@Body(ValidationPipe) authLoginDto: AuthLoginDto): Promise<ResponseEntity<AccessTokenDto>> {
        return ResponseEntity.OK_WITH( await this.authService.signIn(authLoginDto));
    }

    @Post('/guest/signup')
   async guestSignUp(@Body(ValidationPipe) authCreateDto: AuthCreateGuestDto): Promise<ResponseEntity<string>> {
        await this.authService.guestSignUp(authCreateDto);
        return ResponseEntity.OK(); 
    }

    @Post('guest/signin')
    async guestSignIn(@Body(ValidationPipe) authLoginDto: AuthLoginGuestDto): Promise<ResponseEntity<AccessTokenDto>> {
        return ResponseEntity.OK_WITH(await this.authService.guestSignIn(authLoginDto));
    }

    @Get('check-username/:userName')
    async checkUsername(@Param('userName') userName: string): Promise<ResponseEntity<CheckDto>> {
        return ResponseEntity.OK_WITH(await this.authService.checkAddress(userName));
    }

    @Get('check-nickname/:nickname')
    async checkNickname(@Param('nickname') userName: string): Promise<ResponseEntity<CheckDto>> {
        return ResponseEntity.OK_WITH(await this.authService.checkNickname(userName));
    }
}
