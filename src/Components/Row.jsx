import {React} from 'react';
import Grid from './Grid'
import HeaderGrid from './HeaderGrid';
import './Row.css';
import * as Constants from '../Constants/Constants';

export default function Row({...props}) {
    return (
        <div className="Row" >
            
            <HeaderGrid title={props.title} rowHeader="rowHeader"/>
            {[...Array(Constants.NO_OF_COLS)].map((j, i) => {
                
                return <Grid key={i} 
                    col={i}
                    row={props.row}
                    journalists={props.journalistsMap[i]} 
                    updateJournalist={(id, row, col) => props.updateJournalist(id, row, col)}
                    rightBorder={(i === Constants.NO_OF_COLS-1) ? 'rightBorder' : ((i === 2)? 'yAxisLine':'')} //Add right border for the last col& an extra border between the middle cols.
                    topBorder={(props.row === 0) ? 'topBorder' : ((props.row === 3) ? 'xAxisLine' : '' )} /> //Add top border for first row & an extra border between the middle rows.
                }
            )}
        </div>
    );
}