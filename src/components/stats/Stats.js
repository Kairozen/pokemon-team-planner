import React, { Component } from 'react';
import Stat from './stat/Stat';
import './Stats.css';

export default class Stats extends Component {
    render() {
        const values = this.props.values;
        const nbPokemon = this.props.selectedPokemonNumber;
        return (
            <div className="col-lg-3 col-md-4 col-12 right-border">
                <h3>STATS AVERAGE</h3>
                <div>
                    {Object.keys(values).map(key =>
                        <Stat key={key} name={key} value={(nbPokemon === 0) ? (0) : (values[key] / nbPokemon)} />
                    )}
                </div>
            </div>
        );
    }
}