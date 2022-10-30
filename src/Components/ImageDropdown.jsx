import React from 'react';
import './ImageDropdown.css';
import './Journalist.css'
import { useState, useRef, useEffect } from 'react';

export default function ImageDropdown({ ...props }) {

    const [isActive, setIsActive] = useState(false);
    const ref = useRef();

    // Close drop-down on outside click
    const clickOutside = (e) => {
        if (ref.current.contains(e.target)) {
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
        <div className='ImageDropdown' ref={ref}>
            <button className='dropdownButton' type="button" onClick={toggleOptions} >
                {props.activeJourno ?
                    <div>
                        Selected : <span style={{"color":"#EC2227"} }>{props.options.find(j => j.id === props.activeJourno).name}</span>
                    </div> 
                    : 
                    <div>Select Journalist</div>}
                {!isActive &&
                    <div className="arrow down" />
                }
                {isActive &&
                    <div className="arrow up" />
                }
            </button>
            <ul className={`${isActive ? "showDropDown" : "hideDropDown"}`}  >
                <div className='droppedDiv' >
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