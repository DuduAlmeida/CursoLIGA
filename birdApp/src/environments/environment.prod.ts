export const environment = {
  production: true,
  mockupEnabled: false,
  config: {
    dbName: '__bird',
    
  },
  keys: {
    myComments: 'MY_COMMENTS_KEY',
  },
  api: {
    baseUrl: 'http://localhost:3000',
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
