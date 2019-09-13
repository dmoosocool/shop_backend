import { IsNotEmpty } from 'class-validator';

export class GoodsDto {
  @IsNotEmpty({
    message: 'title不允许为空',
  })
  readonly title: string;
  @IsNotEmpty({
    message: 'content不允许为空',
  })
  readonly content: string;
  @IsNotEmpty({
    message: 'description不允许为空',
  })
  readonly description: string;
}
