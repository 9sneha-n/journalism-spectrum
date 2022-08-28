import React from 'react';
import './ImageDropdown.css';
import './Journalist.css'
import { useState, useRef, useEffect } from 'react';

export default function ImageDropdown({ ...props }) {

    const [isActive, setIsActive] = useState(false);
    const ref = useRef();

    // Track events outside drop down
    const clickOutside = (e) => {
        if (ref.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setIsActive(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', clickOutside);

        // clean up function before running new effect
        return () => {
            document.removeEventListener('mousedown', clickOutside);
        }
    }, [isActive])

    const toggleOptions = () => {
        setIsActive(!isActive);
    };

    const setSelectedJourno = (id) => {
        props.setActiveJourno(id);
    }

    return (
        <div className='ImageDropdown'>
            <button className='dropdownButton' type="button" onClick={toggleOptions} >
                Select Journalist
                {!isActive &&
                    <div className="arrow down" />
                }
                {isActive &&
                    <div className="arrow up" />
                }
            </button>
            <ul className={`${isActive ? "showDropDown" : "hideDropDown"}`} ref={ref} >
                <div className='droppedDiv'>
                    {props.options && props.options.map((option, index) => (
                        !option.placedInGrid &&
                        <div className='optionDiv' onClick={() => setSelectedJourno(option.id)} key={option.id}>
                            <div className='optionContent'>
                                <img className='optionImg' src={option.imgSrc} alt={option.name} id={option.id} key={index} />
                                <p className='optionName'>{option.name}</p>
                            </div>
                            {(option.id === props.activeJourno) ? <div className='selectedTick'>&#x2713;</div> : null}
                        </div>
                    ))}
                </div>
            </ul>
        </div>
    );
}