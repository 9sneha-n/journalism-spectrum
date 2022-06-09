import React from 'react';
import './Journalist.css';
export default function Journalist({ ...props }) {

    const OnJournalistDragged = (evt, id) => {
        evt.dataTransfer.setData("JournoId", id);
    }

    //For Mobile devices, handle touch events
    const OnJournalistTouchEnd = (evt, id) => {

        let changedTouch = evt.changedTouches[0];
        let elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);

        //Make sure the element where the journalist is dropped is a Grid. 
        //If its dropped anywhere else, ignore.
        if (elem.className.includes('Grid')) {

            //Extract row and column from grid id.
            const row = parseInt(elem.id.charAt(3));
            const col = parseInt(elem.id.charAt(7));
    
            props.updateJournalist(id, row, col);
        }
    }

    return (
        <div className='JournalistDiv draggable'
            onDragStart={(e) => OnJournalistDragged(e, props.id)} 
            onTouchEnd={(e) => OnJournalistTouchEnd(e, props.id)}
            >
            <img className='JournalistImage' src={props.imgSrc} alt={props.name} />
            {props.name}
        </div>
    );
}