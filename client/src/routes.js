import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './App';
import Login from './components/login';

class CustomRoutes extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
      </Switch>
    )
  }
}

export default CustomRoutes;
