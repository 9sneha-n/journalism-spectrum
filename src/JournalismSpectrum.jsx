import React from 'react';
import JournalistList from './JournalistList';
import SpectrumGrid from './SpectrumGrid';
import './JournalismSpectrum.css';
export default class JournalismSpectrum extends React.Component {
    JournalistDropped = () => {
    }
    render() {
        return (
            <div className="SpectrumBoard">
                <div className='h50'>
                    <h2 className='headline'>Journalism Spectrum</h2>
                </div>
                <JournalistList />
                <SpectrumGrid  JournalistDropped = {this.JournalistDropped}/>
                <div className='SubmitBar'>
                    <button className='SubmitButton'>Submit</button>
                </div>
            </div>
        );
    }
}