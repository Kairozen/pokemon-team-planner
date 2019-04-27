import React from 'react';
import titleize from 'titleize';
import './Type.css';

export default function Type(props) {
    return <div className="type"><div className={props.type}>{titleize(props.type)}</div></div>
}