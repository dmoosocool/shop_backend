import { Module, BadRequestException } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FileEntity,
    ]),
    // 设置文件上传本地磁盘的位置.
    MulterModule.register({
      dest: './uploads',

      // 添加允许上传的文件类型
      fileFilter: (req, file, callback) => {

        const mimetypes = [
          'image/png',
          'image/jpg',
        ];

        // 判断是否是允许的文件类型
        const allowed = mimetypes.some( type => type === file.mimetype );

        if (allowed) {
          callback(null, true);
        } else {
          callback(new BadRequestException('不支持上传次类型的文件.'), false);
        }
      },
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
