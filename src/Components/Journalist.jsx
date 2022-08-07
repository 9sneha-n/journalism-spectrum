import React from 'react';
import './Journalist.css';
export default function Journalist({ ...props }) {

    // JournoInDropdown, JournoInEdit, JournoInView are 3 states of a journo

    const OnJournalistDragged = (evt, id) => {
        evt.dataTransfer.setData("JournoId", id);
    }

    //For Mobile devices, handle touch events
    const OnJournalistTouchEnd = (evt, id) => {

        let changedTouch = evt.changedTouches[0];
        let elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);

        //A journalist can be dropped on top of another journalist in a Grid. 
        //Handle this case, let the new journalist be dropped inside the Grid.
        if(elem.className.includes('JournalistDiv')){
            elem = elem.parentElement.parentElement;
        } else if (elem.className.includes('JournalistImage')) {
            elem = elem.parentElement.parentElement.parentElement;
        } 

        //Make sure the element where the journalist is dropped is a Grid. 
        if (elem.className.includes('Grid')) {

            //Extract row and column from grid id.
            const row = parseInt(elem.id.charAt(3));
            const col = parseInt(elem.id.charAt(7));
    
            props.updateJournalist(id, row, col);
        } 
    }

    return (
        props.journoState !== 'JournoInView'  ? 
        <div className={ props.journoState + ' draggable' }
            onDragStart={(e) => OnJournalistDragged(e, props.id)} 
            onTouchEnd={(e) => OnJournalistTouchEnd(e, props.id)}
            >
            <img className='JournoImg' src={props.imgSrc} alt={props.name} />
            <p className='JournoName'>{props.name}</p>
        </div>
        :
        <img className='JournoImgView' src={props.imgSrc} alt={props.name} />
    );
}