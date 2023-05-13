import { IsString } from "class-validator";

export class CreateUserDto {

    @IsString({message:'should be a string'})
    name:string;

    @IsString({message:'should be a string'})
    lastname:string;

    @IsString({message:'should be a string'})
    password:string;

}