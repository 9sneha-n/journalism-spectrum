import React from 'react';
import './Spectrum.css';
import Row from './Row';
import HeaderGrid from './HeaderGrid';

export default class Spectrum extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            journalistsMatrix : Array(6).fill(null).map(() => Array(6).fill(null).map(() => new Array())),
        }
    }
    // TO DO : get from backend;
    getJournaData = (i) => {
        switch (i) {
            case 1: return { id: 1, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J1.jpg", name: "Manisha Pande" };
            case 2: return { id: 2, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J2.jpg", name: "Mehraj" };
            case 3: return { id: 3, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J3.jpg", name: "Abhinandan Sekhri" };
            case 4: return { id: 4, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J4.jpg", name: "Jayashree Arunachalam" };
            case 5: return { id: 5, imgSrc: "https://9sneha-n.github.io/journalism-spectrum-resc/journalists/J5.jpg", name: "Raman Kirpal" }
        }
    }

    updateJournalist = (journoId, gridCol, gridRow) => {

        let journo = this.getJournaData(journoId);
        let journalistsMatrixL = this.state.journalistsMatrix;

        console.log("Journalist Map before : " + JSON.stringify(journalistsMatrixL) );
        //Remove Journalist from any other Grid if already added
        journalistsMatrixL.forEach((row,i) => {
            row.forEach((gridJournos,j) => {
                let journoToRemove = gridJournos.find(j => j.id === journo.id);
                if(journoToRemove) {
                    gridJournos.splice(gridJournos.findIndex(j => j.id === journo.id),1);
                    console.log("Removing journo : " + JSON.stringify(journoToRemove) + " from row, col : " + i + j );
                }
            }); 
        });
        console.log("Journalist Map after removal : " +  JSON.stringify(journalistsMatrixL) );
        //Add journalist to specified Grid
        if( journalistsMatrixL[gridRow][gridCol].length === 0 || !journalistsMatrixL[gridRow][gridCol].find(j => j && j.id === journo.id) ) {
            journalistsMatrixL[gridRow][gridCol].push(journo);
        }

        console.log("Journalist Map after addition : " +  JSON.stringify(journalistsMatrixL) );
        this.setState({ journalistsMap: journalistsMatrixL})
        //Remove from journalist list
        this.props.JournoDropped(journo);
    }

    render() {
        return (
            <div className='Spectrum'>
                <Row key={0} title="Totalitarian" journalistsMap = {this.state.journalistsMatrix[0]} updateJournalist = {(journoId, gridCol) => this.updateJournalist(journoId, gridCol, 0)} />
                <Row key={1} title="Authoritarian" journalistsMap = {this.state.journalistsMatrix[1]}  updateJournalist = {(journoId, gridCol) => this.updateJournalist(journoId, gridCol, 1)} />
                <Row key={2} title="Statist" journalistsMap = {this.state.journalistsMatrix[2]}  updateJournalist = {(journoId, gridCol) => this.updateJournalist(journoId, gridCol, 2)} />
                <Row key={3} title="Liberalism" journalistsMap = {this.state.journalistsMatrix[3]}  updateJournalist = {(journoId, gridCol) => this.updateJournalist(journoId, gridCol, 3)} />
                <Row key={4} title="Libertarianism" journalistsMap = {this.state.journalistsMatrix[4]}  updateJournalist = {(journoId, gridCol) => this.updateJournalist(journoId, gridCol, 4)} />
                <Row key={5} title="Anarchism" journalistsMap = {this.state.journalistsMatrix[5]}  updateJournalist = {(journoId, gridCol) => this.updateJournalist(journoId, gridCol, 5)} />
                {/* TO DO : Write better code */}
                <div className=" Row">
                    <HeaderGrid title="" />
                    <HeaderGrid title="Communist" />
                    <HeaderGrid title="Socialist" />
                    <HeaderGrid title="Welfarist" />
                    <HeaderGrid title="Regulationist" />
                    <HeaderGrid title="Capitalist" />
                    <HeaderGrid title="Laissez Faire" />
                </div>
            </div>
        );
    }
}
