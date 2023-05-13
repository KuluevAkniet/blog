import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
       constructor(private readonly  userService:UserService, private readonly jwtService:JwtService){}

       async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    private async generateToken(user:User) {
        const payload = {name: user.name, id: user.id,}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByName(userDto.name);
        if (candidate) {
            throw new HttpException('Пользователь с таким именем существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.CreateUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

         async validateUser(userDto: CreateUserDto) {
            const user = await this.userService.getUserByName(userDto.name);
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (user && passwordEquals) {
                return user;
            }
            throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
        }    

    }
