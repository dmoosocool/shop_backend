import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsModule } from './modules/goods/goods.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { GoodsCategoryModule } from './modules/goods-category/goods-category.module';
import { GoodsCommentModule } from './modules/goods-comment/goods-comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GoodsModule,
    UserModule,
    AuthModule,
    FileModule,
    GoodsCategoryModule,
    GoodsCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
