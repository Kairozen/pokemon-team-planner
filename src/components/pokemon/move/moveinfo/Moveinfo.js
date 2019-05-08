import React from 'react';
import './Moveinfo.css';
import Type from '../../../types/type/Type';
import titleize from 'titleize';
export default function Moveinfo(props) {
    const moveinfoClass = (props.isVisible) ? ('moveinfo-visible') : ('moveinfo-hidden');
    const damageClassImage = './assets/' + props.move.damage_class.name + '.png';
    let effect = props.move.effect_entries[0].effect.replace("$effect_chance", props.move.effect_chance);

    return (
        <div className={"moveinfo-container " + moveinfoClass}>
            <h6>
                {titleize(props.move.name)}
                <div style={{ float: 'right' }}>
                    <Type type={props.move.type.name} />
                </div>
            </h6>
            <div className="row">
                <div className="moveinfo-data col-5">
                    <table>
                        <tbody>
                            <tr>
                                <th><img alt={props.move.damage_class.name} src={damageClassImage} /></th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>Power</th>
                                <th className='center'>{(props.move.power) ? (props.move.power) : ('--')}</th>
                            </tr>
                            <tr>
                                <th>Accuracy</th>
                                <th className='center'>{(props.move.accuracy) ? (props.move.accuracy) : ('--')}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="moveinfo-data col-7">
                    <p>
                        {effect}
                    </p>
                </div>
            </div>
        </div >
    );
}