import { AppConfiguration, BaseConfiguration } from '@common/configuration';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class Configurations extends BaseConfiguration {
  @ValidateNested({ each: true })
  @Type(() => AppConfiguration)
  APP_CONFIG: AppConfiguration = new AppConfiguration();
}
export const CONFIGURATION = new Configurations();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
