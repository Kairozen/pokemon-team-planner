import React from 'react';
import './Image.css'

export default function PokemonImage(props) {
    let pokemonName = props.name.replace(/-/g,'');
    if(pokemonName === "")
        return <img alt={pokemonName} className="pokemon-image" src='/assets/sprites/missingno.gif'/>
    else
        return <img alt={pokemonName} className="pokemon-image" src={'/assets/sprites/' + pokemonName + '.gif'}/>
}