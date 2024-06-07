import { ApolloClient, InMemoryCache } from "@apollo/client";

export interface Food {
  id: number;
  type: string;
  name: string;
  topping: string;
}

export const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({ addTypename: false }),
});

export * from "./helpers";
