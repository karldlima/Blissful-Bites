import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorInterface = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) => {
      console.error(`[GRAPHQL ERROR]: at ${path}: ${message}`);
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const clientInterface = new HttpLink({
  uri: import.meta.env.VITE_API_FOOD_URL,
});

export function createClient() {
  const client = new ApolloClient({
    link: from([errorInterface, clientInterface]),
    cache: new InMemoryCache({ addTypename: false }),
  });
  return client;
}
