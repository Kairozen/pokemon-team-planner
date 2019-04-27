import React, { Component } from 'react';
import titleize from 'titleize';
import {render} from 'react-dom';
import './Move.css';

export default class Move extends Component {
    constructor() {
        super();
        this.state = {
            selectedMove: null
        };
    }

    render() {
        const moves = this.props.moves;

        return (
            <select className="form-control move">
                <option key="" value=""></option>
                {moves.map((move) => 
                    <option key={move.move.name} value={move.move.name}>{titleize(move.move.name)}</option>
                )}
            </select>
        );
    }
}