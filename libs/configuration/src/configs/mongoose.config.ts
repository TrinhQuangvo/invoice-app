import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { Logger } from '@nestjs/common';

export class MongooseConfig {
  @IsString()
  @IsNotEmpty()
  URL: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsNumber()
  @IsOptional()
  CONNECT_TIMEOUT_MS?: number;

  @IsNumber()
  @IsOptional()
  SOCKET_TIMEOUT_MS?: number;

  @IsNumber()
  @IsOptional()
  POOL_SIZE?: number;

  constructor(data?: Partial<MongooseConfig>) {
    this.URL = data?.URL || process.env['MONGODB_URI'] || 'mongodb://localhost:27017';
    this.DB_NAME = data?.DB_NAME || process.env['MONGODB_DB_NAME'] || 'test';
    this.CONNECT_TIMEOUT_MS = data?.CONNECT_TIMEOUT_MS || Number(process.env['MONGODB_CONNECT_TIMEOUT_MS']) || 10000;
    this.SOCKET_TIMEOUT_MS = data?.SOCKET_TIMEOUT_MS || Number(process.env['MONGODB_SOCKET_TIMEOUT_MS']) || 45000;
    this.POOL_SIZE = data?.POOL_SIZE || Number(process.env['MONGODB_POOL_SIZE']) || 10;
  }
}
export const MongoProvider = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get('MONGO_CONFIG.MONGODB_URI') || 'mongodb://localhost:27017',
    dbName: configService.get('MONGO_CONFIG.MONGODB_DB_NAME') || 'test',
    maxPoolSize: configService.get('MONGO_CONFIG.MONGODB_POOL_SIZE') || 10,
    connectTimeoutMS: configService.get('MONGO_CONFIG.MONGODB_CONNECT_TIMEOUT_MS') || 10000,
    socketTimeoutMS: configService.get('MONGO_CONFIG.MONGODB_SOCKET_TIMEOUT_MS') || 45000,
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
