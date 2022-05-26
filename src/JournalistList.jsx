import React from 'react';
import './JournalistList.css';
import Journalist from './Journalist';



export default  class JournalistList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridTitleVisibility: 'hidden',
                    // TO DO : Fetch from server
            journalists :  [
                { id: 1, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J1.jpg", name: "Manisha Pande" },
                { id: 2, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J2.jpg", name: "Mehraj" },
                { id: 3, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J3.jpg", name: "Abhinandan Sekhri" },
                { id: 4, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J4.jpg", name: "Jayashree Arunachalam" },
                { id: 5, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J5.jpg", name: "Raman Kirpal" },
            ],
        };
    }

    // JournalistDropped = (id) => {
    //    console.log("TO DO : Remove journalist") 
    // }
    render() {
        console.log(this.state.journalists);
        return (
            <div>
                <p className='description'>Drag and drop  journalists within the spectrum :  </p>
                <div className='JournalistListDiv'>
                    {
                    this.state.journalists.map(
                        (journo, index) => (
                            <Journalist key={index} imgSrc={journo.imgSrc} name={journo.name} id={journo.id}/>
                        ))
                    }
                </div>
            </div>
        )
    }
}