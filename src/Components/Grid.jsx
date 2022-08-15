import React from 'react';
import Journalist from './Journalist';
import './Grid.css';

export default function Grid({ ...props }) {

    const onGridClicked = () => {
        props.updateJournalist(props.row, props.col);
    }
    const computedClassnames = props.isHeader ? 'Grid HeaderGrid' : 'Grid ' + props.rightBorder + ' ' + props.topBorder;

    return (
        <div id={'Row' + props.row + 'Col' + props.col}
            className={computedClassnames.trimEnd()}
            onClick={(e) => onGridClicked(e)}
            >
            {props.isHeader ?
                <h4 className='GridHeading'>{props.title}</h4>
                :
                <div className='JournoCluster'>
                    {props.journalists && props.journalists.length > 0 && props.journalists.map(
                        (journo, index) => {
                            //Show only 4 journos, the rest will be shown on click of 'View all' button
                            if (index < 3 || props.editMode === true) {
                            return <Journalist key={index}
                                imgSrc={journo.imgSrc}
                                name={journo.name}
                                id={journo.id}
                                removeJourno={props.removeJourno}
                                editMode = {props.editMode} />
                            } else {
                                return <div>
                                    <div className='plusCount'>+{props.journalists.length - 4}</div>
                                    <a>View all</a>
                                </div>

                            }
                        })
                    }
                </div>
            }
        </div>
    )
}
