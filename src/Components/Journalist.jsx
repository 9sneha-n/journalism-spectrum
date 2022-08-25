import React from 'react';
import './Journalist.css';
export default function Journalist({ ...props }) {

    const onCrossClick = (e) => {
        e.stopPropagation();
        props.removeJourno();
    }

    return (
        props.editMode ? 
        <div className={ 'JournoInEdit' }>
            <img className='JournoImg' src={props.imgSrc} alt={props.name} />
            <p className='JournoName'>{props.name}</p>
            <div className='crossIcon' onClick={(e) => onCrossClick(e)}>&#10006;</div>
        </div>
        :
        <img className='JournoImgView' src={props.imgSrc} alt={props.name} />
    );
}