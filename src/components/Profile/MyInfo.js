import React from "react";
import {useSelector} from 'react-redux';
import '../../styles/my-info.scss';

const MyInfo = () => {
    const profileData = useSelector(state => state.firebase.profile);
    console.log(profileData);
    return (
        <div className="my-info-container">
            <p className="my-info-title">My Info</p>
            <form className="my-info-wrapper">
                <div className="info-wrapper">
                    <p className="pi-title">
                        Personal Information
                    </p>
                    <div className="inputs-container">
                        <label htmlFor="name" className='label-name'>
                            <input type="text" className='account-input' placeholder='First Name' value={profileData.name}/>
                        </label>
                        <label htmlFor="last-name" className='label-name'>
                            <input type="text" className='account-input' placeholder='Last Name' value={profileData.lastName}/>
                        </label>
                    </div>
                </div>
                <div className="info-wrapper">
                    <p className="pi-title">
                        Contact Information
                    </p>
                    <div className="inputs-container">
                        <label htmlFor="email" className='label-name'>
                            <input type="text" className='account-input' placeholder='Email' value={profileData.email}/>
                        </label>
                        <label htmlFor="phone" className='label-name'>
                            <input type="text" className='account-input' placeholder='Phone'/>
                        </label>
                        <label htmlFor="country" className='label-name'>
                            <input type="text" className='account-input' placeholder='Country'/>
                        </label>
                        <label htmlFor="city" className='label-name'>
                            <input type="text" className='account-input' placeholder='City'/>
                        </label>
                    </div>
                </div>
                <input type="submit" className='account-save-button' value='Save'/>
            </form>
        </div>
    );
};

export default MyInfo;