import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './LocalSaves.css';
export default class LocalSaves extends React.Component {
    constructor() {
        super();
        this.state = {
            savedTeamsKeys: Object.keys(localStorage)
        }
    }

    deleteSavedTeam(key) {
        let tmp = this.state.savedTeamsKeys;
        tmp.filter(e => e !== key);
        localStorage.removeItem(key);
        this.setState({ savedTeamsKeys: tmp });
    }

    render() {
        let savedTeams = Object.keys(localStorage);

        return (
            <Modal isOpen={this.props.show} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                    List of saved teams
                </ModalHeader>
                <ModalBody>
                    {
                        (savedTeams.length === 0) ?
                            (<p>You don't have any saved team.</p>) :
                            (savedTeams.map((key) =>
                                <div key={key} className="row team-line">
                                    <div className="col-8 team-name">
                                        <p>
                                            {key}
                                        </p>
                                    </div>
                                    <button onClick={() => this.props.loadTeamCallback(key)} className="col-2 btn btn-dark no-radius">Load</button>
                                    <button onClick={() => this.deleteSavedTeam(key)} className="col-2 btn btn-danger no-radius">Delete</button>
                                </div>)
                            )
                    }
                </ModalBody>
            </Modal>
        );
    }
}