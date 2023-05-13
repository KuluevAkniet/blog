import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}
    
    // async hashPassword(password){
    //    return await bcrypt.hash(password, 10)
    // }

    async getUserByName(name:string) {
        const user = await this.userRepo.findOne({where: {name}})
        return user;
    }


    async CreateUser(dto:CreateUserDto){
    //    dto.password = await this.hashPassword(dto.password)
       return await this.userRepo.save(dto)
   } 
}
