import React from 'react';
import './Stat.css';

/**
 * Returns the rgb() string for the color that should be used for the progressbar.
 * @param statNumber The number corresponding to the stat for which you want the color.
 */
function getColorString(statNumber) {
    return 'rgb('+ ((255 - statNumber - 50 < 0) ? (0) : (255 - statNumber - 50)) + ',' + (((statNumber + 50) > 255) ? (255) : (statNumber + 50))  + ',0)';
}

export default function Stat(props) {
    let stat_value = props.value;
    let stat_percentage = ((stat_value/255)*100);
    let style = {
        width: stat_percentage+'%',
        backgroundColor: getColorString(stat_value)
    };
    return (
        <div className="progress">
            <span className="stat-name">{props.name}</span>
            <div className="progress-bar" 
                role="progressbar"
                title={props.name + ' : ' + props.value}
                style={style}>
            </div>
        </div>
    );
}