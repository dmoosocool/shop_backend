import { createParamDecorator } from '@nestjs/common';

export const ListOptions = createParamDecorator((data, req) => {
  // 从请求中拿到categories
  let { categories } = req.query;

  // 如果请求参数中有categories 重新设置categories的值
  if (categories) {
    categories = categories.split('-');
  }

  return {
    categories,
  };
});
