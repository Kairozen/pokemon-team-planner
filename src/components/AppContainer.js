import React, { Component } from 'react';
import Pokemon from './pokemon/Pokemon';
import Stats from './stats/Stats';
import './AppContainer.css';

export default class AppContainer extends Component {
    constructor() {
        super();
        this.state = {
            movesTypes: [],
            selectedPokemonNumber: 0,
            values: {
                'HP':0,
                'ATK':0,
                'DEF':0,
                'SPA':0,
                'SPD':0,
                'SPE':0,
            }
        }
    }
    moveTypesCallback = (num,dataFromChild) => {
        let newTypes = this.state.movesTypes;
        newTypes[num] = dataFromChild;
        this.setState({movesTypes:newTypes});
        console.log(this.state.movesTypes);
    }

    statsCallback = (dataFromChild) => {
        // dataFromChild.addition will be -1 if we removed a pokemon, else 1
        let newSelectedPokemonNb = this.state.selectedPokemonNumber + dataFromChild.addition;
        let newValues = this.state.values;
        Object.keys(dataFromChild).map(key => {
            if(key !== 'addition')
                newValues[key] += dataFromChild[key];
        });
        this.setState({
            values: newValues,
            selectedPokemonNumber: newSelectedPokemonNb
        });
    }

    render() {
        const selectedPokemonNumber = this.state.selectedPokemonNumber;
        const values = this.state.values;

        return (
            <div className="container-fluid app">
                <div className="row">
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon statsCallback={this.statsCallback} num={0} moveTypesCallback={this.moveTypesCallback} />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon statsCallback={this.statsCallback} num={1} moveTypesCallback={this.moveTypesCallback} />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon statsCallback={this.statsCallback} num={2} moveTypesCallback={this.moveTypesCallback} />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon statsCallback={this.statsCallback} num={3} moveTypesCallback={this.moveTypesCallback} />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon statsCallback={this.statsCallback} num={4} moveTypesCallback={this.moveTypesCallback} />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon statsCallback={this.statsCallback} num={5} moveTypesCallback={this.moveTypesCallback} />
                    </div>
                </div>
                <div className="row">
                    <Stats selectedPokemonNumber={selectedPokemonNumber} values={values}/>
                </div>
            </div>
        );
    }
}
