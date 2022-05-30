import React from 'react';
import JournalistList from './JournalistList';
import './JournalismSpectrum.css';
import Spectrum from './Spectrum';
export default class JournalismSpectrum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    JournalistDropped = (droppedJourno) => {
        this.setState({journalists: this.state.journalists.filter(function(journo) { 
            return journo.id !== droppedJourno.id
        })});
    }
    render() {
        return (
            <div className="SpectrumBoard">
                <div className='h50'>
                    <h2 className='headline'>Journalism Spectrum</h2>
                </div>
                <JournalistList journalists={this.state.journalists} />
                <Spectrum JournoDropped =  {(placedJournalist) => this.JournalistDropped(placedJournalist)}  />
                <div className='SubmitBar'>
                    <button className='SubmitButton'>Submit</button>
                </div>
            </div>
        );
    }
}