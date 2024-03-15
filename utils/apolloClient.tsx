import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL as string, // Replace with the actual GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
