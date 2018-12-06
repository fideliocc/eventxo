import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import indexRoutes from './routes/index.jsx';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'

import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Import Private Route Component
import PrivateRoute from './components/common/PrivateRoute';

// Check for token in the whole app
if (localStorage.jwtToken) {
    // Set Token in Auth header
    setAuthToken(localStorage.jwtToken);
    // Decode Token and get user info
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
  
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      // Clear current Profile
      //store.dispatch(clearCurrentProfile())
      // Redirect to Login
      window.location.href = "/login";
    }
  }

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            {indexRoutes.map((prop, key) => {
              if (prop.status !== 'Private') {
                return <Route path={prop.path} key={key} component={prop.component} />
              } else {
                return <PrivateRoute path={prop.path} key={key} component={prop.component} />
              }
            })}
          </Switch>
       </BrowserRouter>
      </Provider>
    )
  }
}

export default App