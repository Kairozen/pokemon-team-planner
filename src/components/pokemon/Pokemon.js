import React, { Component } from 'react';
import PokemonImage from './image/Image';
import Type from '../types/type/Type';
import Move from './move/Move';
import Pokemoninfo from './pokemoninfo/Pokemoninfo';
import { API } from '../params';
import './Pokemon.css';
import titleize from 'titleize';

export default class Pokemon extends Component {

    constructor() {
        super();
        this.handleMouseHoverOut = this.handleMouseHoverOut.bind(this);
        this.handleMouseHoverIn = this.handleMouseHoverIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.pokemonSelectRef = React.createRef();
        this.loadMoveFunctions = [];
        this.state = {
            pokemons: [],
            isHovering: false,
            selectedPokemon: null,
            moves: [],
            loadedMoves: [],
            selectedMoves: [],
            selectedMovesTypes: [],
            pokemonTypes: []
        };
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

    componentDidUpdate(prevProps) {
        let pokemonToLoad = this.props.pokemonToLoad;
        if (prevProps.pokemonToLoad && pokemonToLoad && (prevProps.pokemonToLoad.name === pokemonToLoad.name))  {
            return;
        }
        /* if (!pokemonToLoad && this.state.selectedPokemon) {
            this.pokemonSelectRef.current.value = "";
            this.pokemonChange("");
        } */
        if (pokemonToLoad && (!this.state.selectedPokemon || this.state.selectedPokemon.name !== pokemonToLoad.name)) {
            this.pokemonSelectRef.current.value = pokemonToLoad.name;
            this.pokemonChange(pokemonToLoad.name);
            this.setState({ loadedMoves: pokemonToLoad.moves });
        }
    }

    // Display pokemon informations when hovering in
    handleMouseHoverIn() {
        this.setState({ isHovering: true })
    }
    // Remove pokemon information when hovering out
    handleMouseHoverOut() {
        this.setState({ isHovering: false })
    }

    // Callback for children so they send the types of the moves
    moveTypesCallback = (moveTypes) => {
        let newMoveTypes = this.state.selectedMovesTypes;
        if (moveTypes.old) {
            newMoveTypes = newMoveTypes.filter((type) => {
                return type !== moveTypes.old;
            });
        }
        if (moveTypes.new && !newMoveTypes.includes(moveTypes.new)) {
            newMoveTypes.push(moveTypes.new);
        }
        this.setState({
            selectedMovesTypes: newMoveTypes
        });
        this.props.moveTypesCallback(this.props.num, newMoveTypes);
    }

    acceptLoadInChild(childFunction, num) {
        this.loadMoveFunctions[num] = childFunction;
    }

    selectedMoveCallback = (num, move) => {
        let newSelectedMoves = this.state.selectedMoves;
        if (move) {
            newSelectedMoves[num] = move;
        }
        this.setState({ selectedMoves: newSelectedMoves });
        this.props.pokemonCallback(this.props.num, this.pokemonToSendToParent());
    }

    // Returns the object to send to the parent for changing stats
    // Adding is -1 if we remove stats, and is 1 if we add stats
    statsToSendToParent(adding) {
        let datafromChild = {
            'addition': 1 * adding,
            'HP': this.state.selectedPokemon.stats[5].base_stat * adding,
            'ATK': this.state.selectedPokemon.stats[4].base_stat * adding,
            'DEF': this.state.selectedPokemon.stats[3].base_stat * adding,
            'SPA': this.state.selectedPokemon.stats[2].base_stat * adding,
            'SPD': this.state.selectedPokemon.stats[1].base_stat * adding,
            'SPE': this.state.selectedPokemon.stats[0].base_stat * adding
        };
        return datafromChild;
    }

    // Send data of a pokemon and its selected moves to the parent
    pokemonToSendToParent() {
        let pokemon = {};
        let moves = [];
        if (this.state.selectedPokemon) {
            pokemon.name = this.state.selectedPokemon.name;
            this.state.selectedMoves.forEach(move => {
                if (move) {
                    moves.push(move);
                }
            });
            pokemon.moves = moves;
        }
        return pokemon;
    }

    // This code is fucking disgusting but didn't find another way to do it
    pokemonChange(name) {
        // Remove stats from previous pokemon in parent component
        if (this.state.selectedPokemon)
            this.props.statsCallback(this.statsToSendToParent(-1));
        if (name === "") {
            this.setState({
                selectedPokemon: null,
                isHovering: false,
                moves: [],
                selectedMovesTypes: []
            });
            // Send empty pokemon to parent
            this.props.pokemonCallback(this.props.num, null);
            // Reset types to send to parent component
            this.props.pokemonTypesCallback(this.props.num, []);
            // Reset moves to send to parent component
            this.props.moveTypesCallback(this.props.num, []);
        }
        else {
            // Fetch data of 1 pokemon
            const API_ROUTE = "pokemon/" + name;
            fetch(API + API_ROUTE)
                .then(res => res.json())
                .then((data) => {
                    this.setState({
                        moves: [],
                        selectedPokemon: data,
                        selectedMovesTypes: [],
                        isHovering: false
                    });
                    // Send empty pokemon to parent
                    this.props.pokemonCallback(this.props.num, this.pokemonToSendToParent());
                    // Reset types to send to parent component
                    let types = [];
                    data.types.forEach(type => types.push(type.type.name));
                    this.props.pokemonTypesCallback(this.props.num, types);
                    // Reset moves
                    this.props.moveTypesCallback(this.props.num, []);
                    // Get stats and send to parents
                    this.props.statsCallback(this.statsToSendToParent(1));
                    // Get their evolutionary line to fill moves
                    let tmpPokemon = this.state.selectedPokemon;
                    let finalMoves = tmpPokemon.moves;
                    let species = {};
                    fetch(API + "pokemon-species/" + tmpPokemon.species.name)
                        .then(res => res.json())
                        .then((data) => {
                            species = data;
                            if (!species.evolves_from_species) {
                                this.setState({ moves: finalMoves });
                                for(let i = 0; i < this.loadMoveFunctions.length; ++i) {
                                    this.loadMoveFunctions[i]();
                                }
                            }
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
                                        for(let i = 0; i < this.loadMoveFunctions.length; ++i) {
                                            this.loadMoveFunctions[i]();
                                        }
                                        //this.loadMoveInChild();
                                    })
                                    .catch(console.log);
                            }
                        })
                        .catch(console.log);
                })
                .catch(console.log);
        }
    }

    handleChange(event) {
        // Prevent from spamming API calls
        event.persist();
        event.target.setAttribute('disabled', 'disabled');
        setTimeout(() => {
            event.target.removeAttribute('disabled');
        }, 500);
        this.pokemonChange(event.target.value);
    }

    render() {
        const selectedPokemon = this.state.selectedPokemon;
        const loadedMoves = this.state.loadedMoves;
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
            <React.Fragment>
                <div className="box">
                    <div className="row">
                        <div onMouseEnter={this.handleMouseHoverIn}
                            onMouseLeave={this.handleMouseHoverOut}
                            className="col-5">
                            <PokemonImage name={(selectedPokemon) ? (selectedPokemon.name) : ""} />
                            <select ref={this.pokemonSelectRef} onChange={this.handleChange} className="form-control species-name">
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
                                <Move moves={moves} loadMoveInChild={this.acceptLoadInChild.bind(this)} moveToLoad={loadedMoves[0]} selectedMoveCallback={this.selectedMoveCallback} num={0} moveTypesCallback={this.moveTypesCallback} />
                                <Move moves={moves} loadMoveInChild={this.acceptLoadInChild.bind(this)} moveToLoad={loadedMoves[1]} selectedMoveCallback={this.selectedMoveCallback} num={1} moveTypesCallback={this.moveTypesCallback} />
                                <Move moves={moves} loadMoveInChild={this.acceptLoadInChild.bind(this)} moveToLoad={loadedMoves[2]} selectedMoveCallback={this.selectedMoveCallback} num={2} moveTypesCallback={this.moveTypesCallback} />
                                <Move moves={moves} loadMoveInChild={this.acceptLoadInChild.bind(this)} moveToLoad={loadedMoves[3]} selectedMoveCallback={this.selectedMoveCallback} num={3} moveTypesCallback={this.moveTypesCallback} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    selectedPokemon &&
                    <Pokemoninfo isVisible={this.state.isHovering} pokemon={selectedPokemon} types={types} />
                }
            </React.Fragment>
        );
    }
}
