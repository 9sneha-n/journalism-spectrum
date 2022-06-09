import React from 'react';
import './ImageDropdown.css';
import { useState } from 'react';
import Journalist from './Journalist';


export default function ImageDropdown({ ...props }) {

    const [isActive, setIsActive] = useState(false);

    const toggleOptions = () => {
        setIsActive(!isActive);
    };

    
    return (
        <div>
            <button className='dropdownButton' type="button" onClick={toggleOptions}>
                Select Journalist  
                { !isActive &&
                    <div style={{ margin: '0 0 0 15px' }}>&#9660;</div>
                }
                { isActive &&
                    <div style={{ margin: '0 0 0 15px' }}>&#9650;</div>
                }

            </button>
            <ul className={`${isActive ? "showDropDown" : "hideDropDown"}`} >
                <div className='droppedDiv'>
                    {props.options && props.options.map((option, index) => (
                        !option.placedInGrid && 
                        <Journalist key={index} 
                            imgSrc={option.imgSrc} 
                            name={option.name} 
                            id={option.id}
                            updateJournalist={props.updateJournalist} />
                    ))}
                </div>
            </ul>
        </div>

    );

}