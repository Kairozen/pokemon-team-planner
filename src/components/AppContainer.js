import React, { Component } from 'react';
import Pokemon from './pokemon/Pokemon';
import Stats from './stats/Stats';
import './AppContainer.css';
import LocalSaves from './localSaves/LocalSaves';
import Types from './types/Types';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

export default class AppContainer extends Component {
    constructor() {
        super();
        this.toggleModal = this.toggleModal.bind(this);
        this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
        this.importTeam = this.importTeam.bind(this);
        this.teamNameInput = React.createRef();
        this.state = {
            movesTypes: [],
            pokemonsTypes: [],
            pokemons: [],
            loadedPokemons: [],
            isModalOpened: false,
            selectedPokemonNumber: 0,
            statValues: {
                'HP': 0,
                'ATK': 0,
                'DEF': 0,
                'SPA': 0,
                'SPD': 0,
                'SPE': 0,
            }
        }
    }

    toggleModal = () => {
        this.setState({ isModalOpened: !this.state.isModalOpened });
    }

    moveTypesCallback = (num, dataFromChild) => {
        let newTypes = this.state.movesTypes;
        newTypes[num] = dataFromChild;
        this.setState({ movesTypes: newTypes });
    }

    loadTeamCallback = (key) => {
        let team = JSON.parse(localStorage.getItem(key));
        this.setState({loadedPokemons: team});
        ToastsStore.info("Team is loading, it will take some time...", 5000, "my-toast");
    }

    pokemonTypesCallback = (num, dataFromChild) => {
        let newTypes = this.state.pokemonsTypes;
        newTypes[num] = dataFromChild;
        this.setState({ pokemonsTypes: newTypes });
    }

    pokemonCallback = (num, pokemon) => {
        let newPokemons = this.state.pokemons;
        newPokemons[num] = pokemon;
        this.setState({ pokemons: newPokemons });
    }

    statsCallback = (dataFromChild) => {
        // dataFromChild.addition will be -1 if we removed a pokemon, else 1
        let newSelectedPokemonNb;
        let newstatValues = this.state.statValues;
        Object.keys(dataFromChild).forEach(key => {
            if (key === 'addition')
                newSelectedPokemonNb = this.state.selectedPokemonNumber + dataFromChild.addition
            else
                newstatValues[key] += dataFromChild[key];
        });
        this.setState({
            statValues: newstatValues,
            selectedPokemonNumber: newSelectedPokemonNb
        });
    }

    saveToLocalStorage() {
        let teamName = this.teamNameInput.current.value;
        if(this.state.pokemons.length === 0) {
            ToastsStore.error("You can't save an empty team", 3000, "my-toast");
        }
        else if(teamName === "" || localStorage.getItem(teamName)) {
            ToastsStore.error("Team name is empty or has already been saved", 3000, "my-toast");
        }
        else {
            localStorage.setItem(teamName, JSON.stringify(this.state.pokemons));
            ToastsStore.success("Team saved successfully !", 3000, "my-toast");
        }
    }

    importTeam(event) {
        try {
            let files = event.target.files;
            if(files.length) {
                let file = files.item(0);
                let reader = new FileReader();
                let self = this;
                reader.onload = (event) => {
                    let result = JSON.parse(event.target.result);
                    self.setState({loadedPokemons: result});
                    ToastsStore.info("Team is loading, it will take some time...", 5000, "my-toast");
                }
                reader.readAsText(file);
            }
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const selectedPokemonNumber = this.state.selectedPokemonNumber;
        const statValues = this.state.statValues;
        const movesTypes = this.state.movesTypes;
        const pokemonsTypes = this.state.pokemonsTypes;
        const loadedPokemons = this.state.loadedPokemons;
        return (
            <div className="lower">
                <div className="row">
                    <button className="col-md col-sm btn no-radius border-black lightgrey-background btn-outline-dark" onClick={this.toggleModal}>Saved Teams</button>
                    <div className="col-md col-sm upload-btn-wrapper btn-outline-dark btn no-radius lightgrey-background">
                        Import a team
                        <input onChange={this.importTeam} type="file" onClick={this.importTeam}/>
                    </div> 
                    <div className="col-md-1 hidden-sm-down"></div>
                    <input type="text" placeholder="Team Name" ref={this.teamNameInput} className="col-md col-sm team-name-input no-radius border-black form-control" />
                    <button onClick={this.saveToLocalStorage} className="col-md col-sm btn no-radius lightgrey-background btn-outline-dark">Save</button>
                    <ToastsContainer position={ToastsContainerPosition.TOP_CENTER} store={ToastsStore} />
                </div>
                <LocalSaves loadTeamCallback={this.loadTeamCallback} show={this.state.isModalOpened} toggle={this.toggleModal} />
                <div className="container-fluid lightgrey-background app">
                    <div className="row">
                        <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                            <Pokemon statsCallback={this.statsCallback} num={0} moveTypesCallback={this.moveTypesCallback}  pokemonToLoad={loadedPokemons[0]} pokemonTypesCallback={this.pokemonTypesCallback} pokemonCallback={this.pokemonCallback} />
                        </div>
                        <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                            <Pokemon statsCallback={this.statsCallback} num={1} moveTypesCallback={this.moveTypesCallback}  pokemonToLoad={loadedPokemons[1]} pokemonTypesCallback={this.pokemonTypesCallback} pokemonCallback={this.pokemonCallback} />
                        </div>
                        <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                            <Pokemon statsCallback={this.statsCallback} num={2} moveTypesCallback={this.moveTypesCallback}  pokemonToLoad={loadedPokemons[2]} pokemonTypesCallback={this.pokemonTypesCallback} pokemonCallback={this.pokemonCallback} />
                        </div>
                        <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                            <Pokemon statsCallback={this.statsCallback} num={3} moveTypesCallback={this.moveTypesCallback}  pokemonToLoad={loadedPokemons[3]} pokemonTypesCallback={this.pokemonTypesCallback} pokemonCallback={this.pokemonCallback} />
                        </div>
                        <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                            <Pokemon statsCallback={this.statsCallback} num={4} moveTypesCallback={this.moveTypesCallback}  pokemonToLoad={loadedPokemons[4]} pokemonTypesCallback={this.pokemonTypesCallback} pokemonCallback={this.pokemonCallback} />
                        </div>
                        <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                            <Pokemon statsCallback={this.statsCallback} num={5} moveTypesCallback={this.moveTypesCallback}  pokemonToLoad={loadedPokemons[5]} pokemonTypesCallback={this.pokemonTypesCallback} pokemonCallback={this.pokemonCallback} />
                        </div>
                    </div>
                    <div className="row">
                        <Stats selectedPokemonNumber={selectedPokemonNumber} values={statValues} />
                        <Types movesTypes={movesTypes} pokemonsTypes={pokemonsTypes} />
                    </div>
                </div>
            </div>
        );
    }
}
