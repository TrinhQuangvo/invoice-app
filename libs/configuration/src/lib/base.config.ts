export class BaseConfiguration {
  NODE_ENV: string;
  PORT: number;
  IS_DEVELOPMENT: boolean;
  GLOBAL_PREFIX: string;

  constructor() {
    this.NODE_ENV = process.env['NODE_ENV'] || 'development';
    this.PORT = parseInt(process.env['PORT'] || '3300', 10);
    this.IS_DEVELOPMENT = this.NODE_ENV === 'development';
    this.GLOBAL_PREFIX = process.env['GLOBAL_PREFIX'] || 'api/v1';
  }
}
