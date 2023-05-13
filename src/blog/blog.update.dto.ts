import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateBlogDto } from "./blog.dto";


export class UpdateBlog extends  PartialType(CreateBlogDto) {
       @ApiProperty()
       name: string;
}