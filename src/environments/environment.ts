// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  protocol: 'https',
  production: false,
  apiServer: 'https://film-diary-api-jwt-auth.herokuapp.com',
  // apiServer: 'http://localhost:9000',
  tokenGetter: () => {
    return window.localStorage.getItem('access_token');
  },
  jwtConfig: {
    tokenGetter: () => {
      return window.localStorage.getItem('access_token');
    },
    whitelistedDomains: ['film-diary-api-jwt-auth.herokuapp.com']
  }
};
