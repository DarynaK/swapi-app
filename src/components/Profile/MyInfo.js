import React from "react";
import {useSelector} from 'react-redux';
import {useState} from 'react';
import '../../styles/my-info.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const MyInfo = () => {

    const profileData = useSelector(state => state.firebase.profile);
    const uId = useSelector(state => state.firebase.auth.uid);

    const [accountForm, setAccountForm] = useState({
        name: '' || profileData.name,
        lastName: '' || profileData.lastName,
        email: '' || profileData.email,
        phone: '' || profileData.phone,
        country: '' || profileData.country,
        city: '' || profileData.city,
    });
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(uId);

    const getAccountData = e => {
        setAccountForm({
            ...accountForm,
            [e.target.name]: e.target.value,
        });
    };

    const saveAccountInfo = e => {
        e.preventDefault();
        docRef.set({
            'name': accountForm.name,
            'lastName': accountForm.lastName,
            'phone': accountForm.phone,
            'country': accountForm.country,
            'city': accountForm.city,
        },{ merge: true }).then(res => console.log('saved'));
        if(accountForm.email !== profileData.email) changeAuthEmail();

    };

    const changeAuthEmail = () => {
        let user = firebase.auth().currentUser;

        user.updateEmail(accountForm.email).then(function() {
            docRef.set({
                'email': accountForm.email,
            },{ merge: true }).then(res => console.log('Update successful.'));
        }).catch(function(error) {
            console.log('An error happened.', error);
        });
    };

    return (
        <div className="my-info-container">
            <p className="my-info-title">My Info</p>
            <form className="my-info-wrapper" onSubmit={saveAccountInfo}>
                <div className="info-wrapper">
                    <p className="pi-title">
                        Personal Information
                    </p>
                    <div className="inputs-container">
                        <label htmlFor="name" className='label-name'>
                            <input type="text" className='account-input' placeholder='First Name' name='name' value={accountForm.name} onChange={getAccountData}/>
                        </label>
                        <label htmlFor="last-name" className='label-name'>
                            <input type="text" className='account-input' placeholder='Last Name' name='lastName' value={accountForm.lastName} onChange={getAccountData}/>
                        </label>
                    </div>
                </div>
                <div className="info-wrapper">
                    <p className="pi-title">
                        Contact Information
                    </p>
                    <div className="inputs-container">
                        <label htmlFor="email" className='label-name'>
                            <input type="text" className='account-input' placeholder='Email' name='email' value={accountForm.email} onChange={getAccountData}/>
                        </label>
                        <label htmlFor="phone" className='label-name'>
                            <input type="number" className='account-input' placeholder='Phone' name='phone' value={accountForm.phone} onChange={getAccountData}/>
                        </label>
                        <label htmlFor="country" className='label-name'>
                            <input type="text" className='account-input' placeholder='Country' name='country' value={accountForm.country} onChange={getAccountData}/>
                        </label>
                        <label htmlFor="city" className='label-name'>
                            <input type="text" className='account-input' placeholder='City' name='city' value={accountForm.city} onChange={getAccountData}/>
                        </label>
                    </div>
                </div>
                <input type="submit" className='account-save-button' value='Save'/>
            </form>
        </div>
    );
};

export default MyInfo;