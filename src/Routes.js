import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Public from './components/Public';
import Private from './components/Private';
import Login from './components/Login';
import { useSelector } from 'react-redux'

const Router = (props) => (
    <Switch>
        <Route exact path='/public' component={Public}/>
        <Route exact path='/login' component={Login}/>
        <PrivateRoute  path="/private" component={Private} />
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
                        pathname: "/"
                    }}
                />
            )
        }
    />
}
;

export default Router;