import React from 'react';
import './ImageDropdown.css';
import { useState, useEffect } from 'react';
import Journalist from './Journalist';


export default function ImageDropdown({ ...props }) {
    // const [options, setOptions] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const toggleOptions = () => {
        setIsActive(!isActive);
    };

    
    return (
        <div>
            <button className='dropdownButton' type="button" onClick={toggleOptions}>
                Select Journalist  <div style={{ margin: '0 0 0 15px' }}>&#9660;</div>
            </button>
            <ul className={`${isActive ? "showDropDown" : "hideDropDown"}`} >
                <div className='droppedDiv'>

                    {props.options && props.options.map((option, index) => (
                        <Journalist key={index} imgSrc={option.imgSrc} name={option.name} id={option.id} />
                    ))}
                    {props.options.length === 0 && <div>Done!</div>}
                </div>
            </ul>
        </div>

    );

}