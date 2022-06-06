import React from 'react';
import './Journalist.css';
export default class Journalist  extends React.Component {

    OnJournalistDragged = (evt, id) => {
        console.log("Journo Drag started  for : "+  id);
        evt.dataTransfer.setData("JournoId", id);
    }
    render() {
        console.log("Journalist Rendering :  id " + this.props.id + " name :" + this.props.name + " img =" + this.props.imgSrc);
        return (
            <div className='JournalistDiv draggable' 
                onDragStart={(e) => this.OnJournalistDragged(e, this.props.id)} >
                <img className='JournalistImage' src={this.props.imgSrc} alt={this.props.name} />
                {this.props.name}
            </div>
        );
    }
}