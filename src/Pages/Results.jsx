import React from 'react';
import './JournalismSpectrum.css';
import Spectrum from '../Components/Spectrum';
import { useState, useEffect } from 'react';
import * as Constants from '../Constants/Constants'

export default function ResultsPage() {
    // const [journalistsInSpectrum, setJournalistsInSpectrum] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [journalistsMatrix, setjournalistsMatrix] = useState(Array(6).fill(null).map(() => Array(6).fill(null).map(() => new Array())));

    useEffect(() => {
        const loadJournos = () => {
            fetch('http://localhost:3001/spectrum_journalists/', { method: 'GET' })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Something went wrong, Please try again later');
                })
                .then(
                    (result) => {
                        setIsLoaded(true);
                        //TO DO : Handle case when math.floor() results to 0.
                        journalistsMatrix.forEach((row, r_index) => {
                            row.forEach((grid, c_index) => {
                                let journosInGrid = result.journalists
                                    .filter(j => Math.floor(j.avg_weightX) === Constants.COL_HEADERS[c_index].weight
                                        && Math.floor(j.avg_weightY) === Constants.ROW_HEADERS[r_index].weight);
                                if(journosInGrid.length > 0)
                                    journosInGrid.forEach(j => {
                                        grid.push({id: j.id,name: j.name,imgSrc: j.imgSrc});
                                    });
                                    
                            });
                        });
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

    const takeQuiz = () => {

        // navigate(Constants.RESULTS_RUOTE);


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
                <div>
                    <h2 className='headline'>Journalism Spectrum</h2>
                </div>
                <Spectrum journalistsMatrix={journalistsMatrix} />
                <div className='SubmitBar'>
                    <button className='SubmitButton' onClick={takeQuiz} >Take the Quiz!</button>
                </div>
            </div>
        );
    }
}