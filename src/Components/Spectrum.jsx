import {React} from 'react';
import './Spectrum.css';
import Row from './Row';
import HeaderGrid from './HeaderGrid';
import * as Constants from '../Constants/Constants';

export default function Spectrum({  ...props }) {
    return (
        <div className='Spectrum'>

            {[...Array(Constants.NO_OF_ROWS)].map((value, index) => {

                return <Row key={index} 
                    row={index}
                    title={Constants.ROW_HEADERS[index].value} 
                    journalistsMap={props.journalistsMatrix[index]} 
                    updateJournalist={(id, row, col) => props.updateJournalist(id, row, col)}
                   
                     />
            }
            )}
            <div className=" Row">
                <HeaderGrid  title="" rowHeader="rowHeader" />
                {[...Array(Constants.NO_OF_COLS)].map((value, index) => {
                   return  <HeaderGrid key={index} title={Constants.COL_HEADERS[index].value}/>
                }
                )}
            </div>
        </div>
    );
}
