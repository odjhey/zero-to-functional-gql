# best docs

1. https://graphql.org/learn/
2. https://www.prisma.io/docs/getting-started

# topics

1. graphql
   1. schema
   2. resolvers as a (mirror of schema)
   3. nested fields
   4. variables
   5. operations
   6. fragments
   7. resolver context
   8. field level args
   9. continue on your own for unions, interfaces, etc
2. prisma https://github.com/prisma/prisma
3. organization with services

# advanced essentials

stuff you don't have to know how to do for now, but should understand the concept behind

1. graphql directives
2. graphql execution lifecycle

# practices

1. parse to validate
2. use the `canError() : {ok: true; data: any} | {ok: false; error: any}` signature
3. prefer storing dates as truthy values instead of just booleans, i.e. use `deletedAt` instead of `isDeleted`, or use `publishedAt` instead of `isPublished`
