import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageDropdown from '../Components/ImageDropdown';
import Spectrum from '../Components/Spectrum';
import Legend from '../Components/Legend';
import * as Constants from '../Constants/constants'
import './JournalismSpectrumQuiz.css';

export default function JournalismSpectrumQuiz() {
    const [journalists, setJournalists] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [activeJournoId, setActiveJournoId] = useState(null);
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
    }, []);

    const getJourno = (id) => {
        return journalists.find(j => j.id === id);
    }
    const updateJournalist = (gridRow, gridCol) => {

        let journo = getJourno(activeJournoId);
        if (journo) //If a journo is selected 
        {
            //Add journalist to specified Grid
            journalistsMatrix[gridRow][gridCol].push(journo);
            //Remove from journalist list
            journo.placedInGrid = true;
            //after the journalists is placed in the grid, unset as active journo.
            setActiveJournoId(null);
        }
    }
    const removeJourno = (id, row, col) => {
        journalistsMatrix[row][col].splice(journalistsMatrix[row][col].findIndex(j => j.id === id), 1);
        let journo = getJourno(id);
        journo.placedInGrid = false;
        setJournalists([...journalists.filter((journo) => { return journo.id !== id }), journo]);
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
                throw new Error('Something went wrong, Please try again later');
            })
            .then(
                (result) => {
                    setIsLoaded(true);
                    console.log("Submit Quiz, Result : " + result);
                    navigate("/journalism-spectrum");
                },
                (error) => {
                    setIsLoaded(true);
                    console.log("Submit Quiz, Error : " + error);
                    setError('Something went wrong, Please try again later');
                })
            .catch((exception) => {
                setIsLoaded(true);
                console.log("Submit Quiz, Exception : " + exception);
                setError('Something went wrong, Please try again later');
            })
    }
    if (!isLoaded) {
        //TO DO : Replace with loading.gif
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error}</div>;
    } else {
        return (
            <div className="TakeQuizRoot">
                <div className='TakeQuizHeader'>
                    <h2 className='Title'>{Constants.TitleText}</h2>
                    <p className='Subtitle'>{Constants.SubtitleText}</p>
                </div>
                <div className='JournoDropdownDiv'>
                    {Constants.JournoDropDownLabel}
                    <ImageDropdown options={journalists} setActiveJourno={setActiveJournoId} activeJourno={activeJournoId} />
                </div>
                <div className='SpectrumDiv'>
                    <Spectrum
                        journalistsMatrix={journalistsMatrix}
                        updateJournalist={(row, col) => updateJournalist(row, col)}
                        removeJourno={(id, row, col) => removeJourno(id, row, col)}
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