import Grid from './Grid'
import HeaderGrid from './HeaderGrid';
import './Row.css';
import * as Constants from '../constants/constants';

export default function Row(props) {
    return (
        <div className="Row">
            <HeaderGrid title={props.title} />
            {[...Array(Constants.NO_OF_COLS)].map((j, i) => {
                return <Grid key={i} 
                    journalists={props.journalistsMap[i]} 
                    updateJournalist={(journoId) => props.updateJournalist(journoId, i)} 
                    lastColGrid={(i === Constants.NO_OF_COLS-1)? 'lastColGrid':''} 
                    firstRowGrid={props.row === 0 ? 'firstRowGrid' : '' } />
                }
            )}
        </div>
    );
}