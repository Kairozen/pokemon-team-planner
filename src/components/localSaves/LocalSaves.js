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

    exportJsonToFile(key) {
        let dataString = localStorage.getItem(key);
        let exportFileName = key + '.json';
        let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataString);
        
        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileName);
        linkElement.click();
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
                                    <div className="col-6 team-name">
                                        <p>
                                            {key}
                                        </p>
                                    </div>
                                    <button onClick={() => this.exportJsonToFile(key)} className="col-2 btn btn-info no-radius">Export</button>
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