import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './modules/post/post.controller';
import { PostService } from './modules/post/post.service';
import { PostModule } from './modules/post/post.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PostModule,
  ],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}
