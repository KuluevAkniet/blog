import { Controller,Body,Post,Get,  Query, Param, Put, Delete } from '@nestjs/common';
import { CreateBlogDto } from './blog.dto';
import { BlogService } from './blog.service';
import { Blog } from './blog.entity';
import { PaginationResponse } from 'src/pagination/pagination-response.interface';
import { UpdateBlog } from './blog.update.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';



@Controller('blog')
export class BlogController {
     constructor(private readonly blogService:BlogService){}

    @Post('create')
    @ApiOperation({summary:'create blog'})
    @ApiResponse({ 
      status: 200, 
      description: 'Successfully create blog',
      type: String,
    })
    async createBlog(@Body() dto:CreateBlogDto){
    return await this.blogService.createBlog(dto)
    }

    @Get()
    @ApiOperation({summary:'get blogs by pages(pagination)'})
    @ApiResponse({ 
      status: 200, 
      description: 'Successfully get blogs',
      type: String,
    })
    async getBlogs(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    ): Promise<PaginationResponse<Blog>> {
       return this.blogService.getBlogs(page, limit);
    }

    @Put(':id')
    @ApiOperation({summary:'change blogs'})
    @ApiResponse({ 
      status: 200, 
      description: 'Successfully change blogs',
      type: String,
    })
    async Update(@Param('id') id:string, @Body() updateDto:UpdateBlog ){
       return await this.blogService.Update(+id,updateDto)
    }

    @Delete(':id')
    @ApiOperation({summary:'delete blogs'})
    @ApiResponse({ 
      status: 200, 
      description: 'Successfully delete blogs',
      type: String,
    })
    async Delete(@Param('id') id:string): Promise<void>{
       await this.blogService.Delete(+id);
    }
   
}
