import React from "react";
import firebase from "firebase";

const TrailsList = props => {
    const { match } = props;
    let {id} = match.params;
    let collectionName = id;
    const db = firebase.firestore();
    const docRef = db.collection(collectionName);

    docRef.get().then(function(doc) {
        return doc.docs.map(doc=>console.log(doc.data()));
    });
    return (
        <div>
            <p>Hello</p>
        </div>
    );
};

export default TrailsList;