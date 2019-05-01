import React from 'react';
import './Type.css';

export default function Type(props) {
    return (
        <div className="type">
            <div className={props.type}>{props.type.toUpperCase()}</div>
        </div>
    );
}