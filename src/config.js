import environment from './environment/environment';

export class Config {
  static GRAPHQL_API_ROOT = environment.GRAPHQL_API_ROOT;

  static GRAPHQL_HEADERS = { 'Content-Type': 'application/json' };

  static production = environment.production;

  static hmr = environment.hmr;
}
