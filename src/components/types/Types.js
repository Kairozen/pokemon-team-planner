import React, { Component } from 'react';
import Type from '../types/type/Type';
import './Types.css';
import * as TypeRelations from './type_relations';

export default class Types extends Component {
    constructor() {
        super();
        this.state = {
            lastMovesTypes: []
        }
    }

    getInitialWeaknesses() {
        let weaknesses = {};
        TypeRelations.typesList.forEach(element => {
            weaknesses[element] = 0;
        });
        return weaknesses;
    }

    getInitialStrengths() {
        let strengths = {};
        TypeRelations.typesList.forEach(element => {
            strengths[element] = 0;
        });
        return strengths;
    }

    calcWeaknesses() {
        let weaknesses = this.getInitialWeaknesses();
        this.props.pokemonsTypes.forEach(pokemonTypes => {
            let firstTypeWeaknesses = (pokemonTypes[0])?(TypeRelations.typesWeaknesses[pokemonTypes[0]]):([]);
            let secondTypeWeaknesses = (pokemonTypes[1])?(TypeRelations.typesWeaknesses[pokemonTypes[1]]):([]);
            let firstTypeResists = (pokemonTypes[0])?(TypeRelations.typesResists[pokemonTypes[0]]):([]);
            let secondTypeResists = (pokemonTypes[1])?(TypeRelations.typesResists[pokemonTypes[1]]):([]);
            firstTypeWeaknesses = firstTypeWeaknesses.filter((weakness) => !secondTypeResists.includes(weakness));
            secondTypeWeaknesses = secondTypeWeaknesses.filter((weakness) => !firstTypeResists.includes(weakness));
            let pokeWeaknesses = new Set([...firstTypeWeaknesses, ...secondTypeWeaknesses]);
            pokeWeaknesses.forEach(type => weaknesses[type]++);
        })
        return weaknesses;
    }

    calcStrengths() {
        let strengths = this.getInitialStrengths();
        let alreadyDoneTypes = [];
        this.props.movesTypes.forEach(pokemonMoveTypes => {
            alreadyDoneTypes = [];
            pokemonMoveTypes.forEach(type => {
                let strengthsOfType = TypeRelations.typesStrengths[type];
                strengthsOfType.forEach(strength => {
                    if (!alreadyDoneTypes.includes(strength)) {
                        strengths[strength]++;
                        alreadyDoneTypes.push(strength);
                    }
                })
            })
        });
        return strengths;
    }

    render() {
        let weaknesses = this.calcWeaknesses();
        let strengths = this.calcStrengths();

        return (
            <div className="col-lg-9 col-md-8 col-12 type-table-container">
                <div className="row">
                    <div className="col type-table">
                        <h3>STRENGTHS</h3>
                        <div className="type-list">
                            {Object.keys(strengths).map((type) =>
                                <div key={type} className="typecont">
                                    <Type type={type} />
                                    <span className='number-type'>{strengths[type]}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col type-table">
                        <h3>WEAKNESSES</h3>
                        <div className="type-list">
                            {Object.keys(weaknesses).map((type) =>
                                <div key={type} className="typecont">
                                    <Type type={type} />
                                    <span className='number-type'>{weaknesses[type]}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}