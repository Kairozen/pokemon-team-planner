import React from 'react';
import './Header.css';

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <span className="navbar-brand">Pokémon Team Planner</span>
                <a href="https://github.com/Kairozen/pokemon-team-planner">
                    <img alt="GitHub" className="icon invert" src="/assets/github.svg" />
                </a>
            </div>
        </nav>
    );
}