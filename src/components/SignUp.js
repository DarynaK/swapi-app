import React, {useState} from 'react';
import '../styles/login.scss';
import {useFirebase} from 'react-redux-firebase';
import {useDispatch} from 'react-redux';
import {userSuccessSignUp, userFailureSignUp} from '../store/actions/auth';
import {Link} from "react-router-dom";

const SignUp = () => {
    const firebase = useFirebase();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
    });
    const [formError, setFormError] = useState({
        nameError: '',
        lastNameError: '',
        phoneError: '',
        emailError: '',
        passwordError: '',
        emailLogInError: '',
        passwordLogInError: '',
        logInError: '',
    });

    const getFormData = e => {
        setFormData({
            ...formData,
            [e.target.name]:  e.target.value,
        });
    };

    const emailValidation = () => {
        let emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        let isEmptyEmail;
        if(formData.email === '') {
            isEmptyEmail = false;
            inputValidation(isEmptyEmail,'emailError', 'Please fill in the input field' );
            return isEmptyEmail;
        }else {
            inputValidation(emailTest,'emailError', 'Please enter correct email' );
            return emailTest;
        }
    };

    const phoneValidation = () => {
        let phoneTest = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(formData.phone);
        let isEmptyPhone;
        if(formData.phone === '') {
            isEmptyPhone = false;
            inputValidation(isEmptyPhone,'phoneError', 'Please fill in the input field' );
            return isEmptyPhone;
        }else {
            inputValidation(phoneTest,'phoneError', 'Please enter correct phone' );
            return phoneTest;
        }
    };

    const emptyInputCheck = (e) => {
        let formInputs = Array.from(e.target.children);
        let validationResult;
        let inputRes = formInputs.map(el => {
            validationResult = el.value !== '';
            inputValidation(validationResult,el.name + 'Error', 'Please fill in the input field' );
            return validationResult;
        });
        return inputRes.every(v => v === inputRes[0]);
    };

    const inputValidation = (state, fieldName, errorMessage) => {
        if(!state) {
            setFormError(prevState => ({
                ...prevState,
                [fieldName]: errorMessage,
            }));
        }else {
            setFormError(prevState => ({
                ...prevState,
                [fieldName]: '',
            }));
        }
    };

    const formValidation = e => {
        let isEmpty = emptyInputCheck(e);
        let email =emailValidation();
        let phone = phoneValidation();
        return isEmpty && email && phone;
    };

    const signUp = e => {
        e.preventDefault();
        if(formValidation(e)) {
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
                .then(data => {
                    return firebase.firestore().collection('users').doc(data.user.uid).set({
                        name: formData.name,
                        lastName: formData.lastName,
                        email: data.user.email,
                    });
                })
                .then(() => {
                    dispatch(userSuccessSignUp({name: formData.name, lastName: formData.lastName, email: formData.email}));
                })
                .catch(err => {
                        inputValidation(false,'emailError', err.message );
                        dispatch(userFailureSignUp(err))
                    }
                );
        }
    };

    return (
        <div className='login-page'>
                    <div className="sign-up form-container">
                            <form className='submit-form' onSubmit={signUp} noValidate>
                                <p>SIGN UP</p>
                                <input type="text" name='name' placeholder='First Name' value={formData.name} className={formError.nameError?'errorInputStyle':null} onChange={getFormData}/>
                                {formError.nameError && <p className='errorMsg'>{formError.nameError}</p>}
                                <input type="text" name='lastName' placeholder='Last Name' value={formData.lastName} className={formError.lastNameError?'errorInputStyle':null} onChange={getFormData}/>
                                {formError.lastNameError && <p className='errorMsg'>{formError.lastNameError}</p>}
                                <input type="tel" name='phone' placeholder='Phone' value={formData.phone} className={formError.phoneError?'errorInputStyle':null} onChange={getFormData}/>
                                {formError.phoneError && <p className='errorMsg'>{formError.phoneError}</p>}
                                <input type="email" name='email' placeholder='Email' value={formData.email} className={formError.emailError?'errorInputStyle':null} onChange={getFormData}/>
                                {formError.emailError && <p className='errorMsg'>{formError.emailError}</p>}
                                <input type="password" name='password' placeholder='Password' value={formData.password} className={formError.passwordError?'errorInputStyle':null} onChange={getFormData}/>
                                {formError.passwordError && <p className='errorMsg'>{formError.passwordError}</p>}
                                <input type="submit" value='Submit'/>
                            </form>
                            <Link to='login'>Already have an account?</Link>
                    </div>
        </div>
    )
};

export default SignUp;