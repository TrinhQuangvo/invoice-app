import { AppConfiguration, BaseConfiguration, MongooseConfig } from '@common/configuration';
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

  @ValidateNested({ each: true })
  @Type(() => MongooseConfig)
  database: MongooseConfig = new MongooseConfig();
}
export const CONFIGURATION = new Configurations();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
