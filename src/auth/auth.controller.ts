import { Controller,Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('/login')
    @ApiOperation({summary:'login user'})
    @ApiResponse({    
        status: 200, 
        description: 'Successfully login',
        type: String,})
    login(@Body() userDto:CreateUserDto) {
        return this.authService.login(userDto)
    }


    @Post('/signUp')
    @ApiOperation({summary:'registration user'})
    @ApiResponse({    
        status: 200, 
        description: 'Successfully signup user',
        type: String,})
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
