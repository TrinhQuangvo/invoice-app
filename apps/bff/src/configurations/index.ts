import { AppConfiguration, BaseConfiguration, MongoConfiguration } from '@common/configuration';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { TcpConfiguration } from '@common/configuration';

class Configurations extends BaseConfiguration {
  @ValidateNested({ each: true })
  @Type(() => AppConfiguration)
  APP_CONFIG: AppConfiguration = new AppConfiguration();

  @ValidateNested({ each: true })
  @Type(() => TcpConfiguration)
  TCP_SERV = new TcpConfiguration();

  @ValidateNested()
  @Type(() => MongoConfiguration)
  MONGO_CONFIG = new MongoConfiguration();
}
export const CONFIGURATION = new Configurations();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
