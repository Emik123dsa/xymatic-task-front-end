import environment from './environment/environment';

console.log(environment);

export class Config {
  static GRAPHQL_API_ROOT = environment.GRAPHQL_API_ROOT;

  static production = environment.production;

  static hmr = environment.hmr;
}
