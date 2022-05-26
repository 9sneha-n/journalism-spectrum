import React from 'react';
import Journalist  from './Journalist';
import './SpectrumGrid.css';

export const Grid = class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridTitleVisibility: 'none',
            journalists: [],
        };
    }

    makeTitleVisible = () => {
        // this.setState({ gridTitleVisibility: 'block' });
    }

    makeTitleHidden = () => {
        // this.setState({ gridTitleVisibility: 'none' });
    }
    onJournalistDraggedOver = (evt) => {
        evt.preventDefault();
    }
    //TO DO : get from backend;
    getJournaData = (i) => {
        switch(i) {
            case "1" : return { id: 1, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J1.jpg", name: "Manisha Pande" };
            case "2" : return { id: 2, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J2.jpg", name: "Mehraj" };
            case "3" : return { id: 3, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J3.jpg", name: "Abhinandan Sekhri" };
            case "4" : return { id: 4, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J4.jpg", name: "Jayashree Arunachalam" };
            case "5" : return { id: 5, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J5.jpg", name: "Raman Kirpal" };

        }
    }

    onJournalistDropped = (e, data) => {
        console.log("Dropped" + data);
        let id = e.dataTransfer.getData("id");

        let  journo = this.getJournaData(id);
        this.setState({journalists : [...this.state.journalists, journo]})
        console.log(journo);
        this.props.JournalistDroppedInGrid(id);
    }

    render() {
        return (
            <div className={this.props.value + ' Grid' } 
            onMouseEnter={this.makeTitleVisible} 
            onMouseLeave={this.makeTitleHidden}
            onDragOver={(e) => this.onJournalistDraggedOver(e)} 
            onDrop={(e) => this.onJournalistDropped(e, "complete")}>
                <p
                    style={{ display: this.state.gridTitleVisibility }}>
                    {this.props.title}
                </p>
                <div className='JournoCluster'>
                { this.state.journalists.map(
                    (journo, index) => {
                        console.log(journo);
                        return <Journalist key={index} imgSrc={journo.imgSrc} name={journo.name} id={journo.id}/>
                    })
                }
                </div>
            </div>
        )
    }
}

export default class SpectrumGrid extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='SpectrumGrid'>
                <div className="Totalitarian Row">
                    <label className='yAxisLabel'>Totalitarian</label>
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} title="Marxist Leninism" JournalistDropped={this.props.JournalistDropped} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} title="Juche" />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} value="Welfarist" title="Bismarkism" />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} title="Fascism" />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} title="Absolute Monarchism" />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} title="National Capitalism" />
                </div>

                <div className="Authoritarian Row">
                    <label className='yAxisLabel'>Authoritarian</label>
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} value="Welfarist" />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                </div>

                <div className="Statist Row">
                    <label className='yAxisLabel'>Statist</label>
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} value="Welfarist" />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                </div>

                <div className="Liberalism Row">
                    <label className='yAxisLabel'>Liberalism</label>
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)}  value="Welfarist"/>
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                </div>

                <div className="Libertarianism Row">
                    <label className='yAxisLabel'>Libertarianism</label>
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} value="Welfarist" />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                </div>

                <div className="Anarchism Row">
                    <label className='yAxisLabel'>Anarchism</label>
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} value="Welfarist Grid" />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                    <Grid JournalistDroppedInGrid={(droppedJourno) => this.props.JournalistDroppedInSpectrumGrid(droppedJourno)} />
                </div>

                <div className=" Row">
                    <label className='yAxisLabel' >  </label>
                    <div className='xAxis'><label className='xAxisLabel' > Communist</label></div>
                    <div className='xAxis'><label className='xAxisLabel' >Socialist </label></div>
                    <div className='xAxis'><label className='xAxisLabel' > Welfarist</label></div>
                    <div className='xAxis'><label className='xAxisLabel' > Reguslationist</label></div>
                    <div className='xAxis'><label className='xAxisLabel' >Capitalist </label></div>
                    <div className='xAxis'><label className='xAxisLabel' >Laissez Faire </label></div>
                </div>

            </div>
        );
    }
}
