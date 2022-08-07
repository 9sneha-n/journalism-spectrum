import React from 'react';
import ImageDropdown from '../Components/ImageDropdown';
import './JournalismSpectrum.css';
import Spectrum from '../Components/Spectrum';
import { useState, useEffect } from 'react';
import * as Constants from '../Constants/Constants'
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Legend from '../Components/Legend';

export default function JournalismSpectrum() {
    const [journalists, setJournalists] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [journalistsMatrix, setjournalistsMatrix] = useState(Array(6).fill(null).map(() => Array(6).fill(null).map(() => new Array())));
    const navigate = useNavigate();
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
    const updateJournalist = (journoId, gridRow, gridCol) => {

        let journo = getJourno(journoId);
        let journalistsMatrixL = journalistsMatrix;


        //Remove Journalist from any other Grid if already added
        journalistsMatrixL.forEach((row, i) => {
            row.forEach((gridJournos, j) => {
                let journoToRemove = gridJournos.find(j => j.id === journo.id);
                if (journoToRemove) {
                    gridJournos.splice(gridJournos.findIndex(j => j.id === journo.id), 1);
                }
            });
        });

        //Add journalist to specified Grid
        if (journalistsMatrixL[gridRow][gridCol].length === 0 || !journalistsMatrixL[gridRow][gridCol].find(j => j && j.id === journo.id)) {
            journalistsMatrixL[gridRow][gridCol].push(journo);
        }

        setjournalistsMatrix(journalistsMatrixL)
        //Remove from journalist list
        journalistDropped(journoId);
    }


    const handleSubmit = () => {

        let journalists = [];
        journalistsMatrix.forEach((row, r_index) => {
            row.forEach((grid, c_index) => {
                grid.forEach(journalist => {
                    let ratedJournalist = {};
                    ratedJournalist.id = journalist.id;
                    ratedJournalist.name = journalist.name;
                    ratedJournalist.weightX = Constants.COL_HEADERS[c_index].weight;
                    ratedJournalist.weightY = Constants.ROW_HEADERS[r_index].weight;
                    ratedJournalist.imgSrc = journalist.imgSrc;
                    journalists.push(ratedJournalist);
                });
            });
        });

        setIsLoaded(false);
        //On submit, post to server
        fetch(Constants.POST_JOURNALIST_SPECTRUM_API, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ journalists: journalists })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Error");
            })
            .then(
                (result) => {
                    setIsLoaded(true);
                    navigate("/journalism-spectrum");
                },
                (error) => {
                    setIsLoaded(true);
                    error.message = "Error";
                    setError(error);
                })
            .catch((exception) => {
                setIsLoaded(true);
                setError(exception);
            })
    }
    if (!isLoaded) {
        //TO DO : Replace with loading.gif
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <div className="TakeQuizRoot">
                <div className='TakeQuizHeader'>
                    <h2 className='Title'>Journalism Spectrum</h2>
                    <p className='Subtitle'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, velit necessitatibus laborum corporis nostrum numquam voluptas repellendus temporibus aliquid, odit inventore, molestiae ex ut eius mollitia quam nesciunt! Voluptates, illum!</p>
                </div>
                <div className='JournoDropdownDiv'>
                    Choose a journalist you want to place on the grid: 
                    <ImageDropdown options={journalists} updateJournalist={(id, row, col) => updateJournalist(id, row, col)} />
                </div>
                <div className='SpectrumDiv'>
                    <Spectrum
                        journalistsMatrix={journalistsMatrix}
                        updateJournalist={(id, row, col) => updateJournalist(id, row, col)}
                        editMode={true} />
                </div>
                <div className='SubmitBar'>
                    <button className='SubmitButton' onClick={handleSubmit} >Submit</button>
                </div>
                <div className='LegendDiv'>
                    <Legend />
                </div>
            </div>
        );
    }
}