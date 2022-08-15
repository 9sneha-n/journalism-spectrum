import React from 'react';
import './ImageDropdown.css';
import './Journalist.css'
import { useState } from 'react';

export default function ImageDropdown({ ...props }) {

    const [isActive, setIsActive] = useState(false);

    const toggleOptions = () => {
        setIsActive(!isActive);
    };

    const setSelectedJourno = (id) => {
        props.setActiveJourno(id);
    }

    return (
        <div className='ImageDropdown'>
            <button className='dropdownButton' type="button" onClick={toggleOptions}>
                Select Journalist
                {!isActive &&
                    <div className="arrow down" />
                }
                {isActive &&
                    <div className="arrow up" />
                }
            </button>
            <ul className={`${isActive ? "showDropDown" : "hideDropDown"}`} >
                <div className='droppedDiv'>
                    {props.options && props.options.map((option, index) => (
                        !option.placedInGrid &&
                        <div className='dropDownContent' onClick={() => setSelectedJourno(option.id)} key={option.id}>
                            <div className='journoInfo'>
                                <img className='JournoImg' src={option.imgSrc} alt={option.name} id={option.id} key={index} />
                                <p className='JournoName'>{option.name}</p>
                            </div>
                            {(option.id === props.activeJourno) ? <div className='selectedTick'>&#x2713;</div> : null}
                        </div>
                    ))}
                </div>
            </ul>
        </div>
    );
}