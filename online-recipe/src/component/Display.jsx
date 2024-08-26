import React, { useEffect, useState } from 'react';
import Logo from './Logo';

export default function Name() { 
    const [visible, setVisible] = useState(true); 
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    function toggleVisibility() {
        setVisible(!visible);
    }

    return (
        <div
            className='Display'
            style={{ display: visible ? 'block' : 'none' }}
        >
            <Logo />
            <ul className='Display_ul'>
                <li className='time'>
                    Time: {time.toLocaleTimeString()} {time.getHours() < 12 ? 'AM' : 'PM'}
                </li> 
                
            </ul>
            <button
                className='onClick'
                onClick={toggleVisibility}
                aria-label='Close'
                title='Close'
            >
                ❌
            </button>
        </div>
    );
}
