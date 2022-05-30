import React from 'react';
import './JournalistList.css';
import Journalist from './Journalist';

export default  class JournalistList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridTitleVisibility: 'hidden',
        };
    }

    render() {
        return (
            <div>
                <p className='description'>Drag and drop  journalists within the spectrum :  </p>
                <div className='JournalistListDiv'>
                    {
                    this.props.journalists.map(
                        (journo, index) => (
                            <Journalist key={index} imgSrc={journo.imgSrc} name={journo.name} id={journo.id}/>
                        ))
                    }
                </div>
            </div>
        )
    }
}