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
  }

  type Query {
    samurai(id: ID!): Samurai!
    samurais: [Samurai!]!
  }
`;
