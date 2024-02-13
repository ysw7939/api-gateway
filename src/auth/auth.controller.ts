import { Body, Controller, Param, Post, Get, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCreateDto } from './dto/auth.create.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthLoginGuestDto } from './dto/auth.guest.login.dto';
import { AuthCreateGuestDto } from './dto/auth.guest.create.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCreateDto: AuthCreateDto): Promise<void> {
        return this.authService.signUp(authCreateDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authLoginDto: AuthLoginDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authLoginDto);
    }

    @Post('/guest/signup')
    guestSignUp(@Body(ValidationPipe) authCreateDto: AuthCreateGuestDto): Promise<void> {
        return this.authService.guestSignUp(authCreateDto);
    }

    @Post('guest/signin')
    guestSignIn(@Body(ValidationPipe) authLoginDto: AuthLoginGuestDto): Promise<{ accessToken: string }> {
        return this.authService.guestSignIn(authLoginDto);
    }

    @Get('check-username/:userName')
    checkUsername(@Param('userName') userName: string): Promise<boolean> {
        return this.authService.checkAddress(userName);
    }

    @Get('check-nickname/:nickname')
    checkNickname(@Param('nickname') userName: string): Promise<boolean> {
        return this.authService.checkNickname(userName);
    }
}
