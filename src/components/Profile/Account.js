import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import React from "react";
import MyLists from './MyLists'
import MyInfo from './MyInfo';

const Account = () => {
    let { path, url } = useRouteMatch();

    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${url}`}>My Account</Link>
                </li>
                <li>
                    <Link to={`${url}/info`}>My Info</Link>
                </li>
                <li>
                    <Link to={`${url}/lists`}>My Lists</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path={path}>
                    <h3>Please select a topic.</h3>
                </Route>
                <Route path={`${path}/info`}>
                    <MyInfo />
                </Route>
                <Route path={`${path}/lists`}>
                    <MyLists />
                </Route>
            </Switch>
        </div>
    );
}

export default Account;