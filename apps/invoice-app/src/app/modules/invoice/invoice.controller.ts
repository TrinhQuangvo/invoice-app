import { Controller, Get } from '@nestjs/common';

@Controller()
export class InvoiceController {
  @Get()
  find(): string {
    return 'Hello from Invoice Controller!';
  }
}
