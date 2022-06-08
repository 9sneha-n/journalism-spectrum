import React from 'react';
import './HeaderGrid.css';

export default function HeaderGrid({ ...props }) {
    return (
        <div className={'HeaderGrid ' + props.rowHeader}>
            <h4 className='GridHeading'>{props.title}</h4>
        </div>
    )
}
