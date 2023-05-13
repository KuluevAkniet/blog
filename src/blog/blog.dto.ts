import { IsString } from "class-validator";


export class CreateBlogDto {
    @IsString({message:'should be a string'})
    blog:string;

    @IsString({message:'should be a string'})
    author:string;
}