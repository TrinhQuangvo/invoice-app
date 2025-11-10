import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MetadataKeys } from '@common/constants';
import { getProcessId } from '@common/utils';

export const ProcessId = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  return request[MetadataKeys.PROCESS_ID] || getProcessId();
});
