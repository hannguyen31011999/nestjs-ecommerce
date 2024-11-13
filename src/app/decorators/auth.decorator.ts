import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const access_token = request.headers['authorization'].split(' ')[1];
    return { ...request.user, access_token };
  },
);
