import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Connection } from 'mongoose';

export class MongoConfiguration {
  @IsString()
  @IsNotEmpty()
  URL?: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME?: string;

  @IsNumber()
  @IsOptional()
  POOL_SIZE?: number;

  @IsNumber()
  @IsOptional()
  CONNECT_TIMEOUT_MS?: number;

  @IsNumber()
  @IsOptional()
  SOCKET_TIMEOUT_MS?: number;

  constructor(data?: Partial<MongoConfiguration>) {
    this.URL = data?.URL || process.env['URL'];
    this.DB_NAME = data?.DB_NAME || process.env['DB_NAME'];
    this.POOL_SIZE = data?.POOL_SIZE || Number(process.env['POOL_SIZE']) || 10;
    this.CONNECT_TIMEOUT_MS = data?.CONNECT_TIMEOUT_MS || Number(process.env['CONNECT_TIMEOUT_MS']) || 15000;
    this.SOCKET_TIMEOUT_MS = data?.SOCKET_TIMEOUT_MS || Number(process.env['SOCKET_TIMEOUT_MS']) || 360000;
  }
}

export const MongoProvider = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    uri: config.get<string>('URL') as string,
    dbName: config.get<string>('DB_NAME') as string,
    maxPoolSize: config.get<number>('POOL_SIZE'),
    connectTimeoutMS: config.get<number>('CONNECT_TIMEOUT_MS'),
    socketTimeoutMS: config.get<number>('SOCKET_TIMEOUT_MS'),
    onConnectionCreate: (connection: Connection) => {
      connection.on('connected', () => Logger.log(' 🟢   🟢   🟢   >>  connected'));
      connection.on('open', () => Logger.log(' 🟢   🟢   🟢   >>  open'));
      connection.on('disconnected', () => Logger.log(' 🪓   🪓   🪓   >>  disconnected'));
      connection.on('reconnected', () => Logger.log(' 🧡   🧡   🧡   >>  reconnected'));
      connection.on('disconnecting', () => Logger.log(' 🪓   🪓   🪓   >>  disconnecting'));

      return connection;
    },
  }),
});
