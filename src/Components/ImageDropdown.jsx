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
        <div className='ImageDropdown'>
            <button className='dropdownButton' type="button" onClick={toggleOptions}>
                Select Journalist  
                { !isActive &&
                    <div  class="arrow down" />
                    
                }
                { isActive &&
                    <div  class="arrow up" />
                }

            </button>
            <ul className={`${isActive ? "showDropDown" : "hideDropDown"}`} >
                <div className='droppedDiv'>
                    {props.options && props.options.map((option, index) => (
                       !option.placedInGrid && 
                        <div className='JournoInDropDown'>
                            <Journalist key={index} 
                                imgSrc={option.imgSrc} 
                                name={option.name} 
                                id={option.id}
                                updateJournalist={props.updateJournalist}
                                journoState = 'JournoInDropdown' />
                        </div>
                    ))}
                </div>
            </ul>
        </div>

    );

}