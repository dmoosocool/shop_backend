import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PostModule, UserModule, AuthModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
