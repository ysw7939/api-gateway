import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { AuthCreateDto } from './dto/auth.create.dto';
import { AuthLoginDto } from './dto/auth.login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginGuestDto } from './dto/auth.guest.login.dto';
import { AuthCreateGuestDto } from './dto/auth.guest.create.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userRepository: UserRepository,
    ) { }

    async signUp(authCreateDto: AuthCreateDto): Promise<void> {
        return this.userRepository.createUser(authCreateDto);
    }

    async guestSignUp(authCreateDto: AuthCreateGuestDto): Promise<void> {
        return this.userRepository.createGuestUser(authCreateDto);
    }

    async signIn(authLoginDto: AuthLoginDto): Promise<{accessToken: string}> {
        const { address, passwd } = authLoginDto;
        try {
            const user = await this.userRepository.findOne({ where: { address: address } });
            const nickname = user.nickname;
            const hashedPasswd = await bcrypt.hash(passwd, user.salt);
            if(user &&  user.passwd == hashedPasswd) {
                const payload = { nickname};
                const accessToken = await this.jwtService.sign(payload);
                return { accessToken };
            } else {
                throw new UnauthorizedException('login failed')
            }
        } catch {
              throw new UnauthorizedException('login failed')
        }
    }

    async guestSignIn(authLoginDto: AuthLoginGuestDto): Promise<{ accessToken: string }> {
        const { guestId } = authLoginDto;
        try {
            const user = await this.userRepository.findOne({ where: { guestId: guestId } });
            const nickname = user.nickname;
            if(user && user.guestId === guestId) {
                const payload = { nickname };
                const accessToken = await this.jwtService.sign(payload);
                return { accessToken };
            }  else {
                throw new UnauthorizedException('login failed')
            }
        } catch {
             throw new UnauthorizedException('login failed')
        }
     
    }

    async checkAddress(address: string): Promise<boolean> {
        return this.userRepository.checkUsername(address);
    }

    async checkNickname(nickname: string): Promise<boolean> {
        return this.userRepository.checkNickname(nickname);
    }
}
