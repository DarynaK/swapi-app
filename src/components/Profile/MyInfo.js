import React from "react";
import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import '../../styles/my-info.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const MyInfo = () => {

    const profileData = useSelector(state => state.firebase.profile);
    const uId = useSelector(state => state.firebase.auth.uid);
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(uId);

    const [accountForm, setAccountForm] = useState({
        name: '' || profileData.name,
        lastName: '' || profileData.lastName,
        email: '' || profileData.email,
        phone: '' || profileData.phone,
        country: '' || profileData.country,
        city: '' || profileData.city,
    });

    const [accountValError, setAccountValError] = useState({
        nameError: '',
        lastNameError: '',
        emailError: '',
    });

    const [savedData, setsavedData ] = useState({
        savedModal: false,
    });

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setsavedData({
                savedModal: false,
            });
        }, 2000);

        return () => clearTimeout(timeoutID );
    }, [savedData.savedModal]);

    const getAccountData = e => {
        setAccountForm({
            ...accountForm,
            [e.target.name]: e.target.value,
        });
    };

    const checkLastName = () => {
        if(accountForm.lastName === '') {
            accountError (false,"Please fill in the input field", 'lastNameError' );
            return false;
        }else {
            accountError( true,"", 'lastNameError');
            return true;
        }
    };

    const checkName = () => {
        if(accountForm.name === '') {
            accountError (false,"Please fill in the input field", 'nameError' );
            return false;
        }else {
            accountError( true,"", 'nameError');
            return true;
        }
    };

    const checkEmail = () => {
        let emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountForm.email);
        if(accountForm.email === '') {
            accountError(false,'Please enter correct email', 'emailError' );
            return false;
        }else if(!emailTest) {
            accountError(emailTest,'Please enter correct email', 'emailError' );
            return emailTest;
        }else {
            accountError(true,'', 'emailError' );
            return true;
        }
    };


    const checkAccountValue = () => {
        return checkLastName() && checkName() && checkEmail();
    };

    const accountError = ( state, errorMessage, fieldName) => {
        if(!state) {
            setAccountValError(prevState => ({
                ...prevState,
                [fieldName]: errorMessage,
            }));
        }else {
            setAccountValError(prevState => ({
                ...prevState,
                [fieldName]: errorMessage,
            }));
        }
    };

    const saveAccountInfo = e => {
        e.preventDefault();

        if(checkAccountValue()) {
            docRef.set({
                'name': accountForm.name,
                'lastName': accountForm.lastName,
                'phone': accountForm.phone,
                'country': accountForm.country,
                'city': accountForm.city,
            },{ merge: true }).then(res => console.log('saved'));
            if(accountForm.email !== profileData.email) changeAuthEmail();
            setsavedData({
                savedModal: true,
            });
        }else {
            setsavedData({
                savedModal: false,
            });
            // console.log('Not saved');
        }
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
                            <input type="text" className={accountValError.nameError===''?'account-input':'account-input account-input-error'} placeholder='First Name' name='name' value={accountForm.name} onChange={getAccountData}/>
                        </label>
                        {accountValError.nameError&&<span className='account-error'>{accountValError.nameError}</span>}
                        <label htmlFor="last-name" className='label-name'>
                            <input type="text" className={accountValError.lastNameError===''?'account-input':'account-input account-input-error'} placeholder='Last Name' name='lastName' value={accountForm.lastName} onChange={getAccountData}/>
                        </label>
                        {accountValError.lastNameError&&<span className='account-error'>{accountValError.lastNameError}</span>}
                    </div>
                </div>
                <div className="info-wrapper">
                    <p className="pi-title">
                        Contact Information
                    </p>
                    <div className="inputs-container">
                        <label htmlFor="email" className='label-name'>
                            <input type="text" className={accountValError.emailError===''?'account-input':'account-input account-input-error'} placeholder='Email' name='email' value={accountForm.email} onChange={getAccountData}/>
                        </label>
                        {accountValError.emailError&&<span className='account-error'>{accountValError.emailError}</span>}
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
            <div className={savedData.savedModal?'saved-modal-container show-modal':'saved-modal-container'}>
                <p>Saved</p>
            </div>
        </div>
    );
};

export default MyInfo;