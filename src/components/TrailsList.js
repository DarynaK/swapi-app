import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import firebase from "firebase";
import '../styles/trailsList.scss';

const TrailsList = props => {
    const [trailsArr, setTrailsArr] = useState(null);
    const { match } = props;
    let {id} = match.params;
    let collectionName = id;
    const db = firebase.firestore();
    const docRef = db.collection(collectionName);

    useEffect(() => {
        docRef.get().then(function(doc) {
            const result =  doc.docs.map(doc=> {
                return doc.data();
            });
            setTrailsArr({
                trailsArr: result,
            });
            return result;
        });
    }, [docRef]);

    return (
        <div className='hiking-container'>
            <div className="hiking-header-container">
                <p className="hh-title">Пішохідні Маршрути</p>
            </div>
            {trailsArr !== null &&
            <div className="hiking-wrapper">
                <div className="hiking-wrapper-content">
                {
                    trailsArr.trailsArr.map((el, key) => {
                        return (
                            <div key={key} className="hiking-item">
                                <div className="info-side">
                                    <p className="hi-title">{el.name}</p>
                                    <p className="hi-length">{el.length}</p>
                                    <div className="hi-about-container">
                                        <p className="hi-about">{el.about}</p>
                                    </div>
                                    {/*<Link to={} className="hi-button">Перейти</Link>*/}
                                </div>
                                <div className="img-side">
                                    <img src={el.header_img} alt="trails-img"/>
                                </div>
                            </div>
                        );
                    })
                }
                </div>
            </div>
            }
        </div>
    );
};

export default TrailsList;