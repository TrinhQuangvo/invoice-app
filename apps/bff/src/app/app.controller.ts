import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDTO } from '@common/interfaces';
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    const data = this.appService.getData();
    return new ResponseDTO({ data });
  }
}
