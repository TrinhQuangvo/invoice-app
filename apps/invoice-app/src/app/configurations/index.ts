import { AppConfiguration, BaseConfiguration } from '@common/configuration';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { TcpConfiguration } from '@common/configuration';

class Configurations extends BaseConfiguration {
  @ValidateNested({ each: true })
  @Type(() => AppConfiguration)
  APP_CONFIG: AppConfiguration = new AppConfiguration();
  TCP_SERV = new TcpConfiguration();
}
export const CONFIGURATION = new Configurations();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
