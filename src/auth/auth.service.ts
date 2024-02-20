import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { AuthLoginDto } from './dto/auth.login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginGuestDto } from './dto/auth.guest.login.dto';
import { AuthCreateGuestDto } from './dto/auth.guest.create.dto';
import { AccessTokenDto } from './dto/auth.access.dto';
import { CheckDto } from './dto/auth.check.dto';
import { AuthCreateDto } from './dto/auth.create.dto';
import { SearchUserDto } from './dto/auth.search.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userRepository: UserRepository,
    ) { }

    async signUp(authCreateDto: AuthCreateDto): Promise<void> {
        return await this.userRepository.createUser(authCreateDto);
    }

    async guestSignUp(authCreateGuestDto: AuthCreateGuestDto): Promise<void> {
        return await this.userRepository.createGuestUser(authCreateGuestDto);
    }

    async signIn(authLoginDto: AuthLoginDto): Promise<AccessTokenDto> {
        const { address, passwd } = authLoginDto;
        try {
            const user = await this.userRepository.findOne({ where: { address: address } });
            const nickname = user.nickname;
            const hashedPasswd = await bcrypt.hash(passwd, user.salt);
            if(user &&  user.passwd == hashedPasswd) {
                const payload = { nickname};
                const accessToken = await this.jwtService.sign(payload);
                return { 'accessToken': accessToken };
            } else {
                throw new UnauthorizedException('login failed')
            }
        } catch {
              throw new UnauthorizedException('login failed')
        }
    }

    async guestSignIn(authLoginDto: AuthLoginGuestDto): Promise<AccessTokenDto> {
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

    async checkAddress(address: string): Promise<CheckDto> {
        const check = await this.userRepository.checkUsername(address);
        return {check}
    }

    async checkNickname(nickname: string): Promise<CheckDto> {
        const check = await this.userRepository.checkNickname(nickname);
        return {check}
    }

    async searchNickname(nickname: string): Promise<SearchUserDto> {
        return await this.userRepository.searchNickname(nickname)
    }
}
