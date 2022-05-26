import React from 'react';
import './Journalist.css';
export default class Journalist  extends React.Component {
    constructor(props) {
        super(props);
    }
    OnJournalistDragged = (evt, id) => {
        console.log("Drag started for : "+  id);
        evt.dataTransfer.setData("id", id);
    }
    render() {
        return (
            <div className='JournalistDiv draggable' onDragStart={(e) => this.OnJournalistDragged(e,this.props.id)} >
                <img className='JournalistImage' src={this.props.imgSrc} alt={this.props.name} />
            </div>
        );
    }
}