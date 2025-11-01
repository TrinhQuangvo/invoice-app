import { AppConfiguration, BaseConfiguration } from '@common/configuration';
class Configurations extends BaseConfiguration {
  APP_CONFIG = new AppConfiguration();
}

export const CONFIGURATIONS = new Configurations();
export type TConfigurations = typeof CONFIGURATIONS;
