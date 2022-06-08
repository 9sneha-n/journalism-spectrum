import React from 'react';
import ImageDropdown from './ImageDropdown';
import './JournalismSpectrum.css';
import Spectrum from './Spectrum';
import { useState, useEffect } from 'react';


export default function JournalismSpectrum() {
    const [journalists, setJournalists] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadJournos = () => {
            fetch('https://9sneha-n.github.io/journalism-spectrum-resc/journalistList.json', { method: 'GET' })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Something went wrong, Please try again later');
                })
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setJournalists(result.journalists);
                    },
                    (error) => {
                        setIsLoaded(true);
                        //TO DO : Error handling, track the error to tracking/logging backend
                        console.log("An error occured. " + error.message);
                        error.message = 'Something went wrong, Please try again later';
                        setError(error);
                    }
                ).catch((exception) => {
                    //TO DO : Error handling, track the error to tracking/logging backend
                    console.log("An exception occured. " + exception);
                    setIsLoaded(true);
                    setError(exception);
                })
        }
        loadJournos();
    }, []);
    const journalistDropped = (id) => {

        let placedJourno = journalists.find(j => j.id === id);
        placedJourno.placedInGrid = true;
        setJournalists([...journalists.filter((journo) => { return journo.id !== id }), placedJourno]);
    }

    const getJourno = (id) => {
        return journalists.find(j => j.id === id);
    }


    if (!isLoaded) {
        //TO DO : Replace with loading.gif
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <div className="SpectrumBoard">
                <div className='h100'>
                    <h2 className='headline'>Journalism Spectrum</h2>
                </div>
                <div className='SpectrumContainer' style={{ display: 'flex', height: "100%" }}>
                    <ImageDropdown options={journalists} />
                    <Spectrum journoDropped={(placedJournalist) => journalistDropped(placedJournalist)} getJourno={(id) => getJourno(id)} />
                </div>
                <div className='SubmitBar'>
                    <button className='SubmitButton'>Submit</button>
                </div>
            </div>
        );
    }
}