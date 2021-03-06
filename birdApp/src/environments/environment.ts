// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mockupEnabled: false,
  config: {
    dbName: '__bird',
  },
  keys: {
    myComments: 'MY_COMMENTS_KEY',
  },
  api: {
    baseUrl: 'http://127.0.0.1:3000/',
    
    comment: {
      list: '/comments',
      listPaginated: '/comments?page={currentPage}&maxItens={maxItens}&includeCategory=true',
      listPaginatedById: '/comments?page={currentPage}&maxItens={maxItens}&categoryId={categoryId}&includeCategory=true',
      create: '/comments'
    },
    category: {
      list: '/categories',
      listPaginated: '/categories?page={currentPage}&maxItens={maxItens}',
      create: '/categories'
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
