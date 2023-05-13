import { BadRequestException, Injectable } from '@nestjs/common';
import { Blog } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './blog.dto';
import { PaginationResponse } from 'src/pagination/pagination-response.interface';
import { UpdateBlog } from './blog.update.dto';




@Injectable()
export class BlogService {
    constructor(@InjectRepository(Blog) private readonly blogRepo: Repository<Blog>){}

    async createBlog(dto:CreateBlogDto){
        return await this.blogRepo.save(dto)
    }

    async Update(id:number, updateDto:UpdateBlog){
        const auto = await this.blogRepo.findOne({where:{id:id}});
        if(!auto)throw new BadRequestException();
        Object.assign(auto,updateDto);
        return await  this.blogRepo.save(auto)
    }


    async Delete(id:number){
        const auto = await this.blogRepo.findOne({where:{id:id}});
        if(!auto)throw new BadRequestException();
        return await this.blogRepo.remove(auto);
    }

    
    async getBlogs(page: number, limit: number): Promise<PaginationResponse<Blog>> {
        const [blogs, total] = await this.blogRepo.findAndCount({
          take: limit,
          skip: (page - 1) * limit,
        });
    
        return {
          data: blogs,
          total:total,
          page,
          limit,
        };
      }
}
