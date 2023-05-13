import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

 
  @Post('create')
  @ApiOperation({summary:'create user for blogs'})
  @ApiResponse({ 
    status: 200, 
    description: 'Successfully create user',
    type: String,
  })
  async  CreateUsers(@Body() dto:CreateUserDto){ 
      return await this.userService.CreateUser(dto)
    }
}
