import {React} from 'react';
import './Spectrum.css';
import Row from './Row';
import * as Constants from '../Constants/Constants';
import Grid from './Grid';

export default function Spectrum({  ...props }) {
    return (
        <div className='Spectrum'>
            <div className='xAxisLabel'>Social Spectrum Scale</div>
            <div className='yAxisLabel'>Political Scale</div>

            {[...Array(Constants.NO_OF_ROWS)].map((value, index) => {

                return <Row key={index} 
                    row={index}
                    title={Constants.ROW_HEADERS[index].value} 
                    journalistsMap={props.journalistsMatrix[index]} 
                    updateJournalist={(id, row, col) => props.updateJournalist(id, row, col)}
                   
                     />
            }
            )}
            
            <div className="Row">
                <Grid  title="" isHeader={true} row={'header'} col={'header'}   />
                {[...Array(Constants.NO_OF_COLS)].map((value, index) => {
                   return  <Grid key={index} title={Constants.COL_HEADERS[index].value} isHeader={true} row={'header'} col={'header'}/>
                }
                )}
            </div>
        </div>
    );
}
