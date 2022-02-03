import { envelop, useSchema, useLogger } from "@envelop/core";
import fastify from "fastify";
import {
  processRequest,
  getGraphQLParameters,
  renderGraphiQL,
} from "graphql-helix";
import { typedefs } from "./graphql/typedefs.js";
import { makeExecutableSchema } from "graphql-tools";

// This creates the `getEnveloped` function for us. Behind the scense the wrapped functions are created once, here.
const getEnveloped = envelop({
  plugins: [
    useSchema(
      makeExecutableSchema({
        typeDefs: typedefs,
        resolvers: {
          Query: {
            samurais: () => {
              return [
                {
                  id: 1,
                  name: "john",
                  trait: "SILENT",
                  quotes: [
                    {
                      id: 1,
                      quote: "",
                      author: {
                        id: 1,
                        name: "john author",
                      },
                    },
                  ],
                },
              ];
            },
          },
        },
      })
    ),
    useLogger(),
  ],
});
const app = fastify();

app.route({
  method: ["POST"],
  url: "/graphql",
  async handler(req, res) {
    // Here we can pass the request and make available as part of the "context".
    // The return value is the a GraphQL-proxy that exposes all the functions.
    const { parse, validate, contextFactory, execute, schema } = getEnveloped({
      req,
    });
    const request = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      query: req.query,
    };
    const { operationName, query, variables } = getGraphQLParameters(request);

    // Here, we pass our custom functions to Helix, and it will take care of the rest.
    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      parse,
      validate,
      execute,
      contextFactory,
    });

    if (result.type === "RESPONSE") {
      res.status(result.status);
      res.send(result.payload);
    } else {
      // You can find a complete example with Subscriptions and stream/defer here:
      // https://github.com/contrawork/graphql-helix/blob/master/examples/fastify/server.ts
      res.send({ errors: [{ message: "Not Supported in this demo" }] });
    }
  },
});

app.route({
  method: "GET",
  url: "/graphql",
  handler(req, res) {
    res.header("Content-Type", "text/html").send(renderGraphiQL({}));
  },
});

app.listen(3000, () => {
  console.log(`GraphQL server is running...`);
});
