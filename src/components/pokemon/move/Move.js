import React, { Component } from 'react';
import titleize from 'titleize';
import './Move.css';
import { API } from '../../params'
import Moveinfo from './moveinfo/Moveinfo';

export default class Move extends Component {
    constructor() {
        super();
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering: false,
            selectedMove: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleMouseHover() {
        this.setState({ isHovering: !this.state.isHovering })
    }

    // Returns the object to send to the parent for changing attack type
    moveTypesToSendToParent(oldType, newType) {
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
            this.setState({ isHovering: false, selectedMove: null });
            this.props.moveTypesCallback(this.moveTypesToSendToParent(oldType, newType));
        }
        else {
            // Fetch data of the move
            const API_ROUTE = "move/" + event.target.value;
            fetch(API + API_ROUTE)
                .then(res => res.json())
                .then((data) => {
                    this.setState({ isHovering: false, selectedMove: data });
                    if (data.damage_class.name !== "status") {
                        newType = data.type.name;
                    }
                    this.props.moveTypesCallback(this.moveTypesToSendToParent(oldType, newType));
                })
                .catch(console.log);
        }
    }

    render() {
        const moves = this.props.moves;
        const selectedMove = this.state.selectedMove;
        const typeClass = (selectedMove) ? ("select-" + selectedMove.type.name) : ("select-no-type");
        return (
            <React.Fragment>
                <select onMouseEnter={this.handleMouseHover}
                    onMouseLeave={this.handleMouseHover}
                    onChange={this.handleChange} className={"form-control move " + typeClass}>
                    <option className="white" key="" value=""></option>
                    {moves.map((move) =>
                        <option key={move.move.name} value={move.move.name}>{titleize(move.move.name)}</option>
                    )}
                </select>
                {
                    selectedMove &&
                    <Moveinfo isVisible={this.state.isHovering} move={selectedMove} />
                }
            </React.Fragment>
        );
    }
}