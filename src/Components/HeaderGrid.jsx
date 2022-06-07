import React from 'react';
import './HeaderGrid.css';

export default function HeaderGrid({ ...props }) {
    return (
        <div className='HeaderGrid'>
            <h4>{props.title}</h4>
        </div>
    )
}
