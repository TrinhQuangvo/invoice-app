// libs/configuration/src/lib/app-configuration.ts
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AppConfiguration {
  @Type(() => Number) // chuyển string -> number khi dùng plainToInstance
  @IsInt({ message: 'PORT phải là số nguyên' })
  @Min(1, { message: 'PORT phải lớn hơn 0' })
  PORT: number;

  constructor() {
    this.PORT = process.env['PORT'] ? Number(process.env['PORT']) : 3300;
  }
}
