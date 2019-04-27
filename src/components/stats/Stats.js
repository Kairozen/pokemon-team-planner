import React, { Component } from 'react';
import { render } from 'react-dom';
import { API } from '../params'
import './Stats.css';
import titleize from 'titleize';

export default class Stats extends Component {
    constructor() {
        super();
        this.state = {
            selectedPokemonNumber: 0,
            values: {
                'HP':0,
                'ATK':0,
                'DEF':0,
                'SPA':0,
                'SPD':0,
                'SPE':0,
            }
        };
    }

    render() {
        const values = this.state.values;
        const nbPokemon = this.state.selectedPokemonNumber;
        return (
            <div className="col-lg-3 col-md-4 col-12 right-border">
                <h3>STATS AVERAGE</h3>
                <div>
                    {values.map(([key,value]) =>
                        <Stat name={key} value={value} nbPokemon={nbPokemon}/>
                    )}
                </div>
            </div>
        );
    }
}