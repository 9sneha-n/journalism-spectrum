import {React, useState, useRef, useEffect, useLayoutEffect} from 'react';
import './Spectrum.css';
import Row from './Row';
import HeaderGrid from './HeaderGrid';
import * as Constants from '../constants/constants';

export default function Spectrum({ ...props }) {
    const spectrumEl = useRef(null);
    const [leftPosition, setLeftPosition] = useState({top: 0, left:0});

    const [journalistsMatrix, setjournalistsMatrix] = useState(Array(6).fill(null).map(() => Array(6).fill(null).map(() => new Array())));

    const updateJournalist = (journoId, gridCol, gridRow) => {

        let journo = props.getJourno(journoId);
        let journalistsMatrixL = journalistsMatrix;

        console.log("Journalist Map before : " + JSON.stringify(journalistsMatrixL));
        //Remove Journalist from any other Grid if already added
        journalistsMatrixL.forEach((row, i) => {
            row.forEach((gridJournos, j) => {
                let journoToRemove = gridJournos.find(j => j.id === journo.id);
                if (journoToRemove) {
                    gridJournos.splice(gridJournos.findIndex(j => j.id === journo.id), 1);
                    console.log("Removing journo : " + JSON.stringify(journoToRemove) + " from row, col : " + i + j);
                }
            });
        });
        console.log("Journalist Map after removal : " + JSON.stringify(journalistsMatrixL));
        //Add journalist to specified Grid
        if (journalistsMatrixL[gridRow][gridCol].length === 0 || !journalistsMatrixL[gridRow][gridCol].find(j => j && j.id === journo.id)) {
            journalistsMatrixL[gridRow][gridCol].push(journo);
        }

        console.log("Journalist Map after addition : " + JSON.stringify(journalistsMatrixL));
        setjournalistsMatrix(journalistsMatrixL)
        //Remove from journalist list
        props.journoDropped(journoId);
    }

    useEffect(() => {
        const handleResize = () => {
        setLeftPosition({top:(spectrumEl.current.offsetHeight - spectrumEl.current.offsetTop)/2 + spectrumEl.current.offsetTop, 
                         left:(spectrumEl.current.offsetLeft + 115)});
        }

        window.addEventListener('resize', handleResize)
        handleResize();

    }, [setLeftPosition]);

    return (
        <div className='Spectrum' ref={spectrumEl}>
            <div className='left axisLabel' style={{top: leftPosition.top, left: leftPosition.left}}>LEFT</div>
            <div className='right axistLabel'>RIGHT</div> 

            {[...Array(Constants.NO_OF_ROWS)].map((value, index) => {

                return <Row key={index} 
                    row={index}
                    title={Constants.ROW_HEADERS[index]} 
                    journalistsMap={journalistsMatrix[index]} 
                    updateJournalist={(journoId, gridCol) => updateJournalist(journoId, gridCol, index)}
                     />
            }
            )}
            <div className=" Row">
                <HeaderGrid  title="" rowHeader="rowHeader" />
                {[...Array(Constants.NO_OF_COLS)].map((value, index) => {
                   return  <HeaderGrid key={index} title={Constants.COL_HEADERS[index]}/>
                }
                )}
            </div>
        </div>
    );
}
