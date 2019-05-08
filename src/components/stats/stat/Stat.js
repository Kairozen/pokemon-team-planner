import React from 'react';
import './Stat.css';

/**
 * Returns the rgb() string for the color that should be used for the progressbar.
 * @param statNumber The number corresponding to the stat for which you want the color.
 */
function getColorString(statNumber) {
    return 'rgb(' + ((255 - statNumber - 50 < 0) ? (0) : (255 - statNumber - 50)) + ',' + (((statNumber + 50) > 255) ? (255) : (statNumber + 50)) + ',0)';
}

function RoundAndFix(n, d) {
    var m = Math.pow(10, d);
    return Math.round(n * m) / m;
}

export default function Stat(props) {
    let stat_value = props.value;
    let stat_percentage = ((stat_value / 255) * 100);
    let style = {
        width: stat_percentage + '%',
        backgroundColor: getColorString(stat_value)
    };
    return (
        <React.Fragment>
            <div className="row">
                <div className="progress col-10">
                    <span className="stat-name">{props.name}</span>
                    <div className="progress-bar"
                        role="progressbar"
                        title={props.name + ' : ' + RoundAndFix(props.value, 1)}
                        style={style}>
                    </div>
                </div>
                <div className="col-2 stat-value">{RoundAndFix(props.value, 1)}</div>
            </div>
        </React.Fragment>
    );
}