import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, TcpClientOptions, Transport } from '@nestjs/microservices';
import { IsNotEmpty, IsObject } from 'class-validator';

export enum TCP_SERVICE {
  INVOICE_SERVICE = 'TCP_INVOICE_SERVICE',
}

export class TcpConfiguration {
  @IsNotEmpty()
  @IsObject()
  TCP_INVOICE_SERVICE: TcpClientOptions = {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3301,
    },
  };

  constructor() {
    Object.entries(TCP_SERVICE).forEach(([key, serviceName]) => {
      const host = process.env[`${key}_HOST`] || 'localhost';
      const port = process.env[`${key}_PORT`] || 3301;
      this[serviceName] = TcpConfiguration.setValue({
        host,
        port: +port,
      });
    });
  }

  static setValue({ port, host }: { port: number; host: string }): TcpClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    };
  }
}

export function tcpProvider(serviceName: keyof TcpConfiguration): ClientsProviderAsyncOptions {
  return {
    name: serviceName,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return configService.get(`TCP_SERV.${serviceName}`) as TcpClientOptions;
    },
  };
}
