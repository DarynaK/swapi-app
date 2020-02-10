import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Public from './components/Public';
import Private from './components/Private';
import Login from './components/Login';
import Auth from './Auth';
const Router = (props) => (
    <Switch>
        <Route exact path='/public' component={Public}/>
        <Route exact path='/login' component={Login}/>
        <PrivateRoute  path="/private" component={Private} />
    </Switch>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.getAuth() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/"
                    }}
                />
            )
        }
    />
);

export default Router;