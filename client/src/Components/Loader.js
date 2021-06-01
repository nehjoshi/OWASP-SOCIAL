import React from 'react';
import loader from '../media/loader.png';
import '../App.css';

const Loader = () => {

    return (
        <div className='loader-wrapper'>
            <img src={loader} className='loader' />
        </div>
    )
}
export default Loader;