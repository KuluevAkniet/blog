import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { BlogModule } from './blog/blog.module';
import { Blog } from './blog/blog.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'blog',
    entities: [User,Blog],
    synchronize: true,
  }), BlogModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
