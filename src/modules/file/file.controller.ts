import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';
import { FileService } from './file.service';
import { FileDto } from './file.dto';
import { Response } from 'express';
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) {}

  /**
   * 文件上传
   * @param data {FileDto} 上传数据
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async store(
    @UploadedFile() data: FileDto,
  ) {
    return await this.fileService.store(data);
  }

  /**
   * 获取文件
   * @param id {number} 文件id 通过 ParseIntPipe 将 id:string 转成 id:int.
   * @param res {Response}
   */
  @Get('serve/:id')
  async serve(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const file = await this.fileService.show(id);
    res.sendfile(file.filename, {
      root: 'uploads',
      headers: {
        'Content-type': file.mimetype,
      },
    });
  }
}
