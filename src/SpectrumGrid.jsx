import React from 'react';
import Journalist from './Journalist';
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
        //Do not allow drops in headings
        if (!this.props.isHeading)
            evt.preventDefault();
    }
    //TO DO : get from backend;
    getJournaData = (i) => {
        switch (i) {
            case "1": return { id: 1, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J1.jpg", name: "Manisha Pande" };
            case "2": return { id: 2, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J2.jpg", name: "Mehraj" };
            case "3": return { id: 3, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J3.jpg", name: "Abhinandan Sekhri" };
            case "4": return { id: 4, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J4.jpg", name: "Jayashree Arunachalam" };
            case "5": return { id: 5, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J5.jpg", name: "Raman Kirpal" };

        }
    }

    onJournalistDropped = (e) => {
        let id = e.dataTransfer.getData("id");
        let journo = this.getJournaData(id);
        this.setState({ journalists: [...this.state.journalists, journo] })
        console.log(journo);
        this.props.droppedJourno(id);
    }

    render() {
        return (
            <div className='Grid'
                onMouseEnter={this.makeTitleVisible}
                onMouseLeave={this.makeTitleHidden}
                onDragOver={(e) => this.onJournalistDraggedOver(e)}
                onDrop={(e) => this.onJournalistDropped(e)}>
                <h4>{this.props.title}</h4>
                <div className='JournoCluster'>
                    {this.state.journalists.map(
                        (journo, index) => {
                            console.log(journo);
                            return <Journalist key={index} imgSrc={journo.imgSrc} name={journo.name} id={journo.id} />
                        })
                    }
                </div>
            </div>
        )
    }
}

function Row(props) {
    return (
        <div className="Row">
            <Grid title={props.type} isHeading="true" />
            {[...Array(6)].map((x,i) => 
                <Grid key={i} droppedJourno={(droppedJourno) => props.JournoDropped(droppedJourno)} />
            )}
        </div>
    );
}

export default class SpectrumGrid extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='SpectrumGrid'>
                <Row type="Totalitarian" JournoDropped = {(droppedJourno) => this.props.JournoDropped(droppedJourno)} />
                <Row type="Authoritarian" JournoDropped = {(droppedJourno) => this.props.JournoDropped(droppedJourno)} />
                <Row type="Statist" JournoDropped = {(droppedJourno) => this.props.JournoDropped(droppedJourno)} />
                <Row type="Liberalism" JournoDropped = {(droppedJourno) => this.props.JournoDropped(droppedJourno)} />
                <Row type="Libertarianism" JournoDropped = {(droppedJourno) => this.props.JournoDropped(droppedJourno)} />
                <Row type="Anarchism" JournoDropped = {(droppedJourno) => this.props.JournoDropped(droppedJourno)} />
                {/* TO DO : Write better code */}
                <div className=" Row">
                    <Grid isHeading="true" title="" />
                    <Grid isHeading="true" title="Communist" />
                    <Grid isHeading="true" title="Socialist" />
                    <Grid isHeading="true" title="Welfarist" />
                    <Grid isHeading="true" title="Regulationist" />
                    <Grid isHeading="true" title="Capitalist" />
                    <Grid isHeading="true" title="Laissez Faire" />
                </div>
            </div>
        );
    }
}
