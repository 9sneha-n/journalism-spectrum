import React from 'react';
import Journalist from './Journalist';
import './Grid.css';

export default function Grid({ ...props }) {

    const onJournalistDraggedOver = (evt) => {
        //Do not allow drops in headings
        if (!props.isHeading)
            evt.preventDefault();
    }

    const onJournalistDropped = (e) => {
        let id = parseInt(e.dataTransfer.getData("JournoId"));
        console.log("Journo Dropped: " + id);
        props.updateJournalist(id);
    }

    return (
        <div className={'Grid '+ props.rightBorder + ' ' + props.topBorder}
            onDragOver={(e) => onJournalistDraggedOver(e)}
            onDrop={(e) => onJournalistDropped(e)}>
            {/* <h4>{this.props.title}</h4> */}
            <div className='JournoCluster'>
                {props.journalists && props.journalists.length > 0 && props.journalists.map(
                    (journo, index) => {
                        if (journo)
                            return <Journalist key={index} imgSrc={journo.imgSrc} name={journo.name} id={journo.id} />
                    })
                }
            </div>
        </div>
    )
}
