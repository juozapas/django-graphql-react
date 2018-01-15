import * as React from 'react'
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter, Link, Route } from 'react-router-dom'

import apolloClient  from './apolloClient'

import './App.css'
import ListView from './views/ListView'
import LoginView from './views/LoginView'

const logo = require('./logo.svg')


class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={apolloClient}>

                <BrowserRouter>
                    <div className="App">
                        <div className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h2>Welcome to React</h2>
                        </div>
                        <p className="App-intro">
                            To get started, edit <code>src/App.tsx</code> and save to reload.
                        </p>
                        <ul>
                            <li><Link to="/login/">Login</Link></li>
                        </ul>

                        <Route exact={true} path="/" component={ListView}/>
                        <Route exact={true} path="/login/" component={LoginView}/>

                    </div>

                </BrowserRouter>
            </ApolloProvider>

        )
    }
}

export default App
