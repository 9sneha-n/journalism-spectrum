import React from 'react';
import './Journalist.css';
export default function Journalist({ ...props }) {

    const OnJournalistDragged = (evt, id) => {
        evt.dataTransfer.setData("JournoId", id);
    }

    return (
        <div className='JournalistDiv draggable'
            onDragStart={(e) => OnJournalistDragged(e, props.id)} >
            <img className='JournalistImage' src={props.imgSrc} alt={props.name} />
            {props.name}
        </div>
    );
}