import React from 'react';
import "@fontsource/work-sans";
import "@fontsource/inter";
import './JournalismSpectrumResults.css';
import Spectrum from '../Components/Spectrum';
import { useState, useEffect } from 'react';
import * as Constants from '../Constants/constants'
import { useNavigate } from 'react-router-dom';
import Legend from '../Components/Legend';

export default function JournalismSpectrumResults() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [journalistsMatrix] = useState(Array(6).fill(null).map(() => Array(6).fill(null).map(() => new Array())));
    const navigate = useNavigate();

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
                        journalistsMatrix.forEach((row, r_index) => {
                            row.forEach((grid, c_index) => {
                                let journosInGrid = result.journalists
                                    .filter((journalist) => {
                                        let roundedAvgWeightX = (journalist.avg_weightX < 0) ? Math.floor(journalist.avg_weightX) : Math.ceil(journalist.avg_weightX);
                                        let roundedAvgWeightY = (journalist.avg_weightY < 0) ? Math.floor(journalist.avg_weightY) : Math.ceil(journalist.avg_weightY);
                                        //If the average weight is exactly zero, then we place the journalist in the first positive grid in respective axis.
                                        if (roundedAvgWeightX === 0) roundedAvgWeightX++;
                                        if (roundedAvgWeightY === 0) roundedAvgWeightY++;

                                        if (roundedAvgWeightX === Constants.COL_HEADERS[c_index].weight
                                            && roundedAvgWeightY === Constants.ROW_HEADERS[r_index].weight) {
                                            return { id: journalist.id, name: journalist.name, imgSrc: journalist.imgSrc };
                                        } else 
                                            return null;
                                    });

                                if (journosInGrid.length > 0)
                                    journosInGrid.forEach(j => {
                                        grid.push({ id: j.id, name: j.name, imgSrc: j.imgSrc });
                                    });
                            });
                        });
                    },
                    (error) => {
                        setIsLoaded(true);
                        //TO DO : Error handling, track the error to tracking/logging backend
                        console.log("An error occured. " + error.message);
                        setError('Something went wrong, Please try again later');
                    }
                ).catch((exception) => {
                    //TO DO : Error handling, track the error to tracking/logging backend
                    console.log("An exception occured. " + exception);
                    setIsLoaded(true);
                    setError('Something went wrong, Please try again later');
                })
        }
        loadJournos();
    }, [journalistsMatrix]);

    const takeQuiz = () => {
        navigate("/journalism-spectrum/takequiz");
    }
    if (!isLoaded) {
        //TO DO : Replace with loading.gif
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error}</div>;
    } else {
        return (
            <div className='ResultsRoot'>
                <div className='ResultsHeaderBanner'>
                    <div className='ResultsHeader'>
                        <div className='HeaderTitles'>
                            <h2 className='Title'>{Constants.TitleText}</h2>
                            <p className='Subtitle'>{Constants.SubtitleText}</p>
                        </div>
                        <div className='HeaderImageDiv'>
                            <img className='HeaderImg' src='./header-image' alt=''/>
                        </div>
                    </div>
                </div>
                <div className='SubHeading'>
                    <h2 className='Title'>{Constants.SubheadingText}</h2>
                    <p className='Subtitle'>{Constants.SubheadingSubtitleText}</p>
                </div>
                <div className='SpectrumDiv'>
                    <Spectrum journalistsMatrix={journalistsMatrix} editMode={false}/>
                </div>
                <div className='SubmitBar'>
                    <button className='SubmitButton' onClick={takeQuiz} >Try it yourself</button>
                </div>
                <div className='LegendDiv'>
                <Legend />
                </div>
            </div>
        );
    }
}