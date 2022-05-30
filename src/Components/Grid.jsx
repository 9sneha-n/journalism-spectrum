import React from 'react';
import Journalist from './Journalist';
import './Grid.css';

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
    }

    onJournalistDraggedOver = (evt) => {
        //Do not allow drops in headings
        if (!this.props.isHeading)
            evt.preventDefault();
    }

    onJournalistDropped = (e) => {
        
        let id = parseInt(e.dataTransfer.getData("JournoId"));
        console.log("Journo Dropped: "+  id);
        this.props.updateJournalist(id);
    }

    render() {
        return (
            <div className='Grid'
                onDragOver={(e) => this.onJournalistDraggedOver(e)}
                onDrop={(e) => this.onJournalistDropped(e)}>
                <h4>{this.props.title}</h4>
                <div className='JournoCluster'>
                    {this.props.journalists && this.props.journalists.length > 0  && this.props.journalists.map(
                        (journo, index) => {
                            if(journo)
                                return <Journalist key={index} imgSrc={journo.imgSrc} name={journo.name} id={journo.id} />
                        })
                    }
                </div>
            </div>
        )
    }
}
