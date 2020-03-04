import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Public from './components/Public';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import { useSelector } from 'react-redux'
import Account from './components/Profile/Account'

const Router = (props) => (
    <div>
        <Switch>
            <Route exact path='/public' component={Public}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/sign-up' component={SignUp}/>
            <PrivateRoute path="/account" component={Account}/>
        </Switch>
    </div>
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