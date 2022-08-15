import React from 'react';
import Journalist from './Journalist';
import './Grid.css';
import { MAX_JOURNO_CIRCLE_IN_GRID } from '../Constants/Constants';
export default function Grid({ ...props }) {

    const showViewAll = (props.editMode === false && props.journalists.length > MAX_JOURNO_CIRCLE_IN_GRID) ? true : false;

    const onGridClicked = () => {
        props.updateJournalist(props.row, props.col);
    }

    const computedClassnames = props.isHeader ? 'Grid HeaderGrid' : 'Grid ' + props.rightBorder + ' ' + props.topBorder;

    return (
        <div id={'Row' + props.row + 'Col' + props.col}
            className={computedClassnames.trimEnd()}
            onClick={(e) => onGridClicked(e)}>
            {props.isHeader ?
                <h4 className='GridHeading'>{props.title}</h4>
                :
                <div className='JournoCluster'>
                    {props.journalists && props.journalists.length > 0 && props.journalists.map(
                        (journo, index) => {

                            //Show only MAX_JOURNO_CIRCLE_IN_GRID journos, the rest will be shown on click of 'View all' button
                            if (index < MAX_JOURNO_CIRCLE_IN_GRID || props.editMode === true) {
                                return <Journalist key={index}
                                    imgSrc={journo.imgSrc}
                                    name={journo.name}
                                    id={journo.id}
                                    removeJourno={props.removeJourno}
                                    editMode={props.editMode} />
                            }
                        })
                    }
                    {showViewAll ?
                        <div className='plusCount'>+{props.journalists.length - MAX_JOURNO_CIRCLE_IN_GRID}</div>
                        :
                        null
                    }
                    <div className='viewAll'  style={{ display: showViewAll ? 'block' : 'none' }} onClick={() => {alert(JSON.stringify(props.journalists))}}>View all</div>
                </div>
            }
        </div>
    )
}
