import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { AuthCreateGuestDto } from "./dto/auth.guest.create.dto";
import { AuthCreateDto } from "./dto/auth.create.dto";
import { SearchUserDto } from "./dto/auth.search.dto";


@Injectable()
export class UserRepository extends Repository<User> {
    // 사용자 관련 커스텀 메서드들을 추가할 수 있음
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCreateDto: AuthCreateDto): Promise<any>{
        const { id, passwd, email, nickname  } = authCreateDto;

        const salt = await bcrypt.genSalt();
        const hashedPasswd = await bcrypt.hash(passwd, salt);

        const user = this.create({address: id, passwd: hashedPasswd, salt: salt, email:email, nickname:nickname})

        await this.save(user)
        return "success"
    }


    async createGuestUser(authCreateGuestDto: AuthCreateGuestDto): Promise<any> {
        const { guestId, nickname } = authCreateGuestDto;

        const user = this.create({ guestId, nickname });
       
        await this.save(user)
        return "success"
    }
    
    async findUser(userId: number): Promise<User> {
        return this.findOne({ where: { userId } });
    }

    async checkUsername(userName: string): Promise<boolean> {
        if (await this.exists({ where: { address: userName } })) {
            return false
        } else {
            return true
        }
    }

    async checkNickname(nickname: string): Promise<boolean> {
        if (await this.exists({ where: { nickname: nickname } })) {
            return false
        } else {
            return true
        }
    }

    async searchNickname(nickname: string): Promise<SearchUserDto> {
        return await this.createQueryBuilder()
            .select([
                "user_id",
                "nickname"
            ])
            .where("nickname = :nickname", { nickname: nickname })
            .execute()
    }
}