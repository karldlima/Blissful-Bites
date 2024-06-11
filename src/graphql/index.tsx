import { ApolloClient, InMemoryCache } from "@apollo/client";

export interface Food {
  id: number;
  type: string;
  name: string;
  topping: string;
}

export const client = new ApolloClient({
  uri: import.meta.env.VITE_API_FOOD_URL,
  cache: new InMemoryCache({ addTypename: false }),
});

export * from "./helpers";
