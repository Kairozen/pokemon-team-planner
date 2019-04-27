import React, { Component } from 'react';
import Pokemon from './pokemon/Pokemon'
import { render } from 'react-dom';
import './AppContainer.css'

export default class AppContainer extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="container app">
                <div className="row">
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon />
                    </div>
                    <div className="pokemon col-lg-4 col-md-6 col-sm-12 col-12">
                        <Pokemon />
                    </div>
                </div>
            </div>
        );
    }
}
