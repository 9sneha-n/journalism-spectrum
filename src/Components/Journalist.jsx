import React from 'react';
import './Journalist.css';
export default function Journalist({ ...props }) {

    return (
        props.editMode ? 
        <div className={ 'JournoInEdit' }>
            <img className='JournoImg' src={props.imgSrc} alt={props.name} />
            <p className='JournoName'>{props.name}</p>
            <div className='crossIcon' onClick={() => props.removeJourno(props.id)} >&#10006;</div>
        </div>
        :
        <img className='JournoImgView' src={props.imgSrc} alt={props.name} />
    );
}