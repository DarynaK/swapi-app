import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Public from './components/Public';
import Account from './components/Account';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useSelector } from 'react-redux'

const Router = (props) => (
    <Switch>
        <Route exact path='/public' component={Public}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/sign-up' component={SignUp}/>
        <PrivateRoute  path="/account" component={Account} />
    </Switch>
);

const PrivateRoute = ({ component: Component, ...rest }) => {
        const isLoggedIn = useSelector(state => state.firebase.profile.isEmpty);
    return <Route
        {...rest}
        render={props =>
            !isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/account"
                    }}
                />
            )
        }
    />
}
;

export default Router;