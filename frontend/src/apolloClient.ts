import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

import { BatchHttpLink } from 'apollo-link-batch-http';
import { setContext } from 'apollo-link-context';


const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `JWT ${token}` : null,
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(
        new BatchHttpLink({
            uri: 'http://localhost:8000/gql',
            // credentials: 'same-origin'
        })
    ),
    cache: new InMemoryCache(),
})

export default client