import { gql } from "graphql-tag";

export const typedefs = gql`
  schema {
    query: Query
  }

  enum Trait {
    SILENT
    SNEAKY
  }

  type Samurai {
    id: ID!
    name: String!
    trait: Trait!
    quotes(limit: Int): [Quote!]!
  }

  type Quote {
    id: ID!
    quote: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
  }

  type Query {
    samurai(id: ID!): Samurai!
    samurais: [Samurai!]!
  }
`;
