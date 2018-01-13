import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';

import { HttpLink } from 'apollo-link-http';
import * as React from 'react'
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter, Route } from 'react-router-dom'

import './App.css'
import ListView from './views/ListView'

const logo = require('./logo.svg')

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
        new HttpLink({
            uri: 'http://localhost:8000/gql',
            credentials: 'same-origin'
        })
    ),
    cache: new InMemoryCache(),
})

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>

                <BrowserRouter>
                    <div className="App">
                        <Route exact={true} path="/" component={ListView}/>
                        <div className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h2>Welcome to React</h2>
                        </div>
                        <p className="App-intro">
                            To get started, edit <code>src/App.tsx</code> and save to reload.
                        </p>
                    </div>
                </BrowserRouter>
            </ApolloProvider>

        )
    }
}

export default App
