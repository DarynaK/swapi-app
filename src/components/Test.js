import React from 'react';
import MyInfo from '../components/MyInfo';
import MyLists from '../components/MyLists';
import { Route, Link,useParams } from 'react-router-dom';

const Test = () => {
    let { topicId } = useParams();
    console.log(111)
    return (
        <div>
            <h3>{topicId}</h3>
        </div>
    );
};

export default Test;