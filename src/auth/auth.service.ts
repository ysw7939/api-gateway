import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { AuthCreateDto } from './dto/auth-create-dto';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
    ) { }

    async signUp(authCreateDto: AuthCreateDto): Promise<void> {
        return this.userRepository.createUser(authCreateDto);
    }
}
