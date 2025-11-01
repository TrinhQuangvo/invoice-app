export class AppConfiguration {
  PORT: number;

  constructor() {
    this.PORT = parseInt(process.env['PORT'] || '3300', 10);
  }
}
export const APP_CONFIGURATION = new AppConfiguration();
export type TAppConfiguration = typeof APP_CONFIGURATION;
