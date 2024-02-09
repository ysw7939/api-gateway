import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCreateDto } from './dto/auth-create-dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCreateDto: AuthCreateDto): Promise<void> {
        return this.authService.signUp(authCreateDto);
    }
}
