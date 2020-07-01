import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './service/apollo'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Confirm from './components/confirm/Confirm'
import App from './App';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route path="/confirm" component={Confirm} />
          </Switch>
        </Fragment>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
