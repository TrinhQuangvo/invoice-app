import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestParams = createParamDecorator((params: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  if (!params) {
    return request.params;
  }
  return request.params[params as string];
});
