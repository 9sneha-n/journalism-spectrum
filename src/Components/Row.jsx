import Grid from './Grid'
import HeaderGrid from './HeaderGrid';
import './Row.css';
import * as Constants from '../constants/constants';

export default function Row(props) {
    return (
        <div className="Row">
            <HeaderGrid title={props.title} rowHeader="rowHeader"/>
            {[...Array(Constants.NO_OF_COLS)].map((j, i) => {
                return <Grid key={i} 
                    journalists={props.journalistsMap[i]} 
                    updateJournalist={(journoId) => props.updateJournalist(journoId, i)} 
                    rightBorder={(i === Constants.NO_OF_COLS-1 || i === 2)? 'rightBorder':''} //Add right border for the last col& an extra border between the middle cols.
                    topBorder={props.row === 0 || props.row === 3? 'topBorder' : '' } /> //Add top border for first row & an extra border between the middle rows.
                }
            )}
        </div>
    );
}