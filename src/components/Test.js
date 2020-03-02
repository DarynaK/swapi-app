import React from 'react';
import MyInfo from '../components/MyInfo';
import MyLists from '../components/MyLists';
import { Route, Link } from 'react-router-dom';

const Test = ({ match }) => {
    return (
        <div>
            <h2>Topics</h2>
            <Link to={`${match.url}/my-info`}>My Info</Link>
            <Link to={`${match.url}/my-lists`}>My Lists</Link>
            <Route exact path={`${match.path}/my-info`} component={MyInfo}/>
            <Route exact path={`${match.path}/my-lists`} component={MyLists}/>
        </div>
    );
};

export default Test;