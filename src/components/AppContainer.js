import React, { Component } from 'react';
import Pokemon from './pokemon/Pokemon';
import Stats from './stats/Stats';
import './AppContainer.css';
import Types from './types/Types';

export default class AppContainer extends Component {
    constructor() {
        super();
        this.state = {
            movesTypes: [],
            pokemonsTypes: [],
            selectedPokemonNumber: 0,
            values: {
                'HP': 0,
                'ATK': 0,
                'DEF': 0,
                'SPA': 0,
                'SPD': 0,
                'SPE': 0,
            }
        }
    }

    moveTypesCallback = (num, dataFromChild) => {
        let newTypes = this.state.movesTypes;
        newTypes[num] = dataFromChild;
        this.setState({ movesTypes: newTypes });
    }

    pokemonTypesCallback = (num, dataFromChild) => {
        let newTypes = this.state.pokemonsTypes;
        newTypes[num] = dataFromChild;
        this.setState({ pokemonsTypes: newTypes });
    }

    statsCallback = (dataFromChild) => {
        // dataFromChild.addition will be -1 if we removed a pokemon, else 1
        let newSelectedPokemonNb;
        let newValues = this.state.values;
        Object.keys(dataFromChild).forEach(key => {
            if (key === 'addition')
                newSelectedPokemonNb = this.state.selectedPokemonNumber + dataFromChild.addition
            else
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
        const movesTypes = this.state.movesTypes;
        const pokemonsTypes = this.state.pokemonsTypes;
        return (
            <div className="container-fluid app">
                <div className="row">
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon statsCallback={this.statsCallback} num={0} moveTypesCallback={this.moveTypesCallback} pokemonTypesCallback={this.pokemonTypesCallback} />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon statsCallback={this.statsCallback} num={1} moveTypesCallback={this.moveTypesCallback} pokemonTypesCallback={this.pokemonTypesCallback} />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon statsCallback={this.statsCallback} num={2} moveTypesCallback={this.moveTypesCallback} pokemonTypesCallback={this.pokemonTypesCallback} />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon statsCallback={this.statsCallback} num={3} moveTypesCallback={this.moveTypesCallback} pokemonTypesCallback={this.pokemonTypesCallback} />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon statsCallback={this.statsCallback} num={4} moveTypesCallback={this.moveTypesCallback} pokemonTypesCallback={this.pokemonTypesCallback} />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon statsCallback={this.statsCallback} num={5} moveTypesCallback={this.moveTypesCallback} pokemonTypesCallback={this.pokemonTypesCallback} />
                    </div>
                </div>
                <div className="row">
                    <Stats selectedPokemonNumber={selectedPokemonNumber} values={values} />
                    <Types movesTypes={movesTypes} pokemonsTypes={pokemonsTypes} />
                </div>
            </div>
        );
    }
}
