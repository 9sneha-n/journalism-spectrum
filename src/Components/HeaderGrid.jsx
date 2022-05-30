import React from 'react';
import './HeaderGrid.css';

export default class HeaderGrid extends React.Component {
    render() {
        return (
            <div className='HeaderGrid'>
                <h4>{this.props.title}</h4>
            </div>
        )
    }
}
