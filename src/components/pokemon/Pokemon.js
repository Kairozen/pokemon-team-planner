import React, { Component } from 'react';
import PokemonImage from './image/Image';
import Type from '../types/type/Type';
import Move from './move/Move';
import { render } from 'react-dom';
import { API } from '../params'
import './Pokemon.css';
import titleize from 'titleize';

const API_ROUTE = "pokemon?limit=964";

export default class Pokemon extends Component {

    constructor() {
        super();
        this.state = {
            pokemons: [],
            selectedPokemon: null,
            moves: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const API_ROUTE = "pokemon?limit=964";
        fetch(API + API_ROUTE)
            .then(res => res.json())
            .then((data) => {
                this.setState({ pokemons: data.results })
            })
            .catch(console.log);
    }
    // This code is fucking disgusting but didn't find another way to do it
    handleChange(event) {
        // Fetch data of 1 pokemon
        const API_ROUTE = "pokemon/" + event.target.value;
        fetch(API + API_ROUTE)
            .then(res => res.json())
            .then((data) => {
                this.setState({ selectedPokemon: data });
                // Get their evolutionary line to fill moves
                let tmpPokemon = this.state.selectedPokemon;
                let finalMoves = tmpPokemon.moves;
                let species = {};
                fetch(API + "pokemon-species/" + tmpPokemon.species.name)
                    .then(res => res.json())
                    .then((data) => {
                        species = data;
                        if (!species.evolves_from_species)
                            this.setState({ moves: finalMoves });
                        else {
                            fetch(API + "pokemon/" + species.evolves_from_species.name)
                                .then(res => res.json())
                                .then((data) => {
                                    tmpPokemon = data;
                                    finalMoves = finalMoves
                                        .concat(tmpPokemon.moves)
                                        .filter((move, index, self) =>
                                            index === self.findIndex((m) => (
                                                m.move.name === move.move.name
                                            ))
                                        )
                                    this.setState({ moves: finalMoves });
                                })
                                .catch(console.log);
                        }
                    })
                    .catch(console.log);
            })
            .catch(console.log);
    }

    render() {
        const selectedPokemon = this.state.selectedPokemon;
        // Sort pokemons by names
        const pokemons = this.state.pokemons.sort((a, b) => {
            if (a.name > b.name) return 1;
            else return -1;
        })
        // Sort pokemon moves by names
        const moves = this.state.moves.sort((a, b) => {
            if (a.move.name > b.move.name) return 1;
            else return -1;
        });
        // Pokemon types
        let types = [];
        if (selectedPokemon) {
            types = selectedPokemon.types.sort((a, b) => {
                return a.slot - b.slot;
            });
        }

        return (
            <div className="box">
                <div className="row">
                    <div className="col-5">
                        <PokemonImage name={(selectedPokemon) ? (selectedPokemon.name) : ""} />
                        <select onChange={this.handleChange} className="form-control species-name">
                            <option key="" value=""></option>
                            {pokemons.map((pokemon) =>
                                <option key={pokemon.name} value={pokemon.name}>{titleize(pokemon.name)}</option>
                            )}
                        </select>
                        <div className="types">
                            {types.map((type) =>
                                <Type key={type.type.name} type={type.type.name} />
                            )}
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="moves">
                            <Move moves={moves} />
                            <Move moves={moves} />
                            <Move moves={moves} />
                            <Move moves={moves} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
