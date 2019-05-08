import React from 'react';
import './Pokemoninfo.css';
import Type from '../../types/type/Type';
import titleize from 'titleize';
import Stat from '../../stats/stat/Stat';
import * as TypeRelations from '../../types/type_relations';

function getInitialWeaknessesAndResists() {
    let weaknesses = {};
    TypeRelations.typesList.forEach(element => {
        weaknesses[element] = 0;
    });
    return weaknesses;
}

function calcWeaknessesAndResists(types) {
    let weaknessesAndResists = getInitialWeaknessesAndResists();
    let firstTypeWeaknesses = (types[0]) ? (TypeRelations.typesWeaknesses[types[0].type.name]) : ([]);
    let secondTypeWeaknesses = (types[1]) ? (TypeRelations.typesWeaknesses[types[1].type.name]) : ([]);
    let firstTypeResists = (types[0]) ? (TypeRelations.typesResistsWithoutImmunities[types[0].type.name]) : ([]);
    let secondTypeResists = (types[1]) ? (TypeRelations.typesResistsWithoutImmunities[types[1].type.name]) : ([]);
    let firstTypeImmunities = (types[1]) ? (TypeRelations.typesImmunities[types[0].type.name]) : ([]);
    let secondTypeImmunities = (types[1]) ? (TypeRelations.typesImmunities[types[1].type.name]) : ([]);
    let pokeWeaknesses = firstTypeWeaknesses.concat(secondTypeWeaknesses);
    let pokeResists = firstTypeResists.concat(secondTypeResists);
    let pokeImmunities = firstTypeImmunities.concat(secondTypeImmunities);
    pokeImmunities.forEach(type => weaknessesAndResists[type] = 'immune');
    pokeWeaknesses.forEach(type => {
        if (weaknessesAndResists[type] !== 'immune')
            weaknessesAndResists[type]++;
    });
    pokeResists.forEach(type => {
        if (weaknessesAndResists[type] !== 'immune')
            weaknessesAndResists[type]--;
    });
    let result = {
        doubleWeaknesses: [],
        weaknesses: [],
        neutral: [],
        resists: [],
        doubleResists: [],
        immunities: []
    }
    Object.keys(weaknessesAndResists).forEach((type) => {
        if (weaknessesAndResists[type] === 'immune')
            result.immunities.push(type);
        else if (weaknessesAndResists[type] === 2)
            result.doubleWeaknesses.push(type);
        else if (weaknessesAndResists[type] === 1)
            result.weaknesses.push(type);
        else if (weaknessesAndResists[type] === -1)
            result.resists.push(type);
        else if (weaknessesAndResists[type] === -2)
            result.doubleResists.push(type);
        else
            result.neutral.push(type);
    });
    return result;
}

function getStats(rawStats) {
    let stats = {
        'HP': rawStats[5].base_stat,
        'ATK': rawStats[4].base_stat,
        'DEF': rawStats[3].base_stat,
        'SPA': rawStats[2].base_stat,
        'SPD': rawStats[1].base_stat,
        'SPE': rawStats[0].base_stat
    };
    return stats;
}

export default function render(props) {
    const pokemoninfoClass = (props.isVisible) ? ('pokemoninfo-visible') : ('pokemoninfo-hidden');
    const types = props.types;
    const stats = getStats(props.pokemon.stats);
    const weaknessesAndResists = calcWeaknessesAndResists(types);
    return (
        <div className={"pokemoninfo-container " + pokemoninfoClass}>
            <h6>
                {titleize(props.pokemon.species.name)}
                <div style={{ float: 'right' }}>
                    {
                        types.map((type) =>
                            <Type key={type.type.name} type={type.type.name} />
                        )
                    }
                </div>
            </h6>
            <div className="row">
                <div className="pokemoninfo-data col-xl-5 col-md-12">
                    {
                        Object.keys(stats).map((key) =>
                            <Stat key={key} name={key} value={stats[key]} />
                        )
                    }
                </div>
                <div className="pokemoninfo-data pokemoninfo-type-relations col-xl-7 col-md-12">
                    {
                        weaknessesAndResists.doubleResists.length > 0 &&
                        <React.Fragment>
                            <h5>Strongly resists</h5>
                            <div>
                                    {weaknessesAndResists.doubleResists.map(type => 
                                        <Type key={type} type={type} />
                                    )}
                            </div>
                        </React.Fragment>
                    }
                    {
                        weaknessesAndResists.resists.length > 0 &&
                        <React.Fragment>
                            <h5>Resists</h5>
                            <div>
                                    {weaknessesAndResists.resists.map(type => 
                                        <Type key={type} type={type} />
                                    )}
                            </div>
                        </React.Fragment>
                    }
                    {
                        /* weaknessesAndResists.neutral.length > 0 &&
                        <React.Fragment>
                            <h5>Neutral</h5>
                            <div>
                                    {weaknessesAndResists.neutral.map(type => 
                                        <Type key={type} type={type} />
                                    )}
                            </div>
                        </React.Fragment> */
                    }
                    {
                        weaknessesAndResists.weaknesses.length > 0 &&
                        <React.Fragment>
                            <h5>Weak to</h5>
                            <div>
                                    {weaknessesAndResists.weaknesses.map(type => 
                                        <Type key={type} type={type} />
                                    )}
                            </div>
                        </React.Fragment>
                    }
                    {
                        weaknessesAndResists.doubleWeaknesses.length > 0 &&
                        <React.Fragment>
                            <h5>Very weak to</h5>
                            <div>
                                    {weaknessesAndResists.doubleWeaknesses.map(type => 
                                        <Type key={type} type={type} />
                                    )}
                            </div>
                        </React.Fragment>
                    }
                    {
                        weaknessesAndResists.immunities.length > 0 &&
                        <React.Fragment>
                            <h5>Immune to</h5>
                            <div>
                                {weaknessesAndResists.immunities.map(type => 
                                    <Type key={type} type={type} />
                                )}
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
        </div>
    );
}