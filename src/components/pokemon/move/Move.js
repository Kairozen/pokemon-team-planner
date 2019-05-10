import React, { Component } from 'react';
import titleize from 'titleize';
import './Move.css';
import { API } from '../../params'
import Moveinfo from './moveinfo/Moveinfo';

export default class Move extends Component {
    constructor() {
        super();
        this.handleMouseHoverIn = this.handleMouseHoverIn.bind(this);
        this.handleMouseHoverOut = this.handleMouseHoverOut.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.moveSelectRef = React.createRef();
        this.state = {
            isHovering: false,
            selectedMove: null
        };
    }

    componentWillMount() {
        this.props.loadMoveInChild(this.loadMove.bind(this), this.props.num);
    }

    loadMove() {
        if(this.props.moveToLoad) {
            this.moveSelectRef.current.value = this.props.moveToLoad;
            this.moveChange(this.props.moveToLoad);
        }
    }

    componentDidUpdate(prevProps) {
        let moveToLoad = this.props.moveToLoad;
        if(prevProps.moves.length !== 0 && this.props.moves.length === 0) {
            this.moveSelectRef.current.value = "";
            this.moveChange("");
            this.setState({selectedMove: null});
        }
        if(prevProps.moveToLoad && moveToLoad && (prevProps.moveToLoad === moveToLoad))
            return;
    }

    handleMouseHoverOut() {
        this.setState({ isHovering: false })
    }

    handleMouseHoverIn() {
        this.setState({ isHovering: true })
    }

    // Returns the object to send to the parent for changing attack type
    moveTypesToSendToParent(oldType, newType) {
        let dataFromChild = {
            old: oldType,
            new: newType
        }
        return dataFromChild;
    }

    moveChange(name) {
        let oldType = null;
        let newType = null;
        // Remove types from previous move in parent component
        if (this.state.selectedMove && this.state.selectedMove.damage_class.name !== "status") {
            oldType = this.state.selectedMove.type.name;
        }
        if (name === "") {
            this.setState({ isHovering: false, selectedMove: null });
            this.props.moveTypesCallback(this.moveTypesToSendToParent(oldType, newType));
            this.props.selectedMoveCallback(this.props.num, null);
        }
        else {
            // Fetch data of the move
            const API_ROUTE = "move/" + name;
            fetch(API + API_ROUTE)
                .then(res => res.json())
                .then((data) => {
                    this.setState({ isHovering: false, selectedMove: data });
                    if (data.damage_class.name !== "status") {
                        newType = data.type.name;
                    }
                    this.props.moveTypesCallback(this.moveTypesToSendToParent(oldType, newType));
                    this.props.selectedMoveCallback(this.props.num, data.name);
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
        this.moveChange(event.target.value);
    }

    render() {
        const moves = this.props.moves;
        const selectedMove = this.state.selectedMove;
        const typeClass = (selectedMove) ? ("select-" + selectedMove.type.name) : ("select-no-type");
        return (
            <React.Fragment>
                <select ref={this.moveSelectRef} onMouseEnter={this.handleMouseHoverIn}
                    onMouseLeave={this.handleMouseHoverOut}
                    onChange={this.handleChange} className={"form-control move " + typeClass}>
                    <option className="white" key="" value=""></option>
                    {moves.map((move) =>
                        <option className="white" key={move.move.name} value={move.move.name}>{titleize(move.move.name)}</option>
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