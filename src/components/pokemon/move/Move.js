import React, { Component } from 'react';
import titleize from 'titleize';
import './Move.css';
import { API } from '../../params'

export default class Move extends Component {
    constructor() {
        super();
        this.state = {
            selectedMove: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    // Returns the object to send to the parent for changing attack type
    moveTypesToSendToParent(oldType,newType) {
        let dataFromChild = {
            old: oldType,
            new: newType
        }
        return dataFromChild;
    }

    handleChange(event) {
        // Prevent from spamming API calls
        event.persist();
        event.target.setAttribute('disabled', 'disabled');
        setTimeout(() => {
            event.target.removeAttribute('disabled');
        }, 500);
        let oldType = null;
        let newType = null;
        // Remove types from previous move in parent component
        if (this.state.selectedMove && this.state.selectedMove.damage_class.name !== "status") {
            oldType = this.state.selectedMove.type.name;
        }
        if (event.target.value === "") {
            console.log(oldType,newType)
            this.setState({ selectedMove: null });
            this.props.moveTypesCallback(this.moveTypesToSendToParent(oldType,newType));
        }
        else {
            // Fetch data of the move
            const API_ROUTE = "move/" + event.target.value;
            fetch(API + API_ROUTE)
                .then(res => res.json())
                .then((data) => {
                    this.setState({ selectedMove: data });
                    if(data.damage_class.name !== "status") {
                        newType = data.type.name;
                    }
                    this.props.moveTypesCallback(this.moveTypesToSendToParent(oldType,newType));
                })
                .catch(console.log);
        }
    }

    render() {
        const moves = this.props.moves;

        return (
            <select onChange={this.handleChange} className="form-control move">
                <option key="" value=""></option>
                {moves.map((move) =>
                    <option key={move.move.name} value={move.move.name}>{titleize(move.move.name)}</option>
                )}
            </select>
        );
    }
}