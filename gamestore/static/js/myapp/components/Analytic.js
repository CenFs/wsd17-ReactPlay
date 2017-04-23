import React from 'react';
// import { Analytics } from '../actions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Modal, Button } from 'react-bootstrap';
import NavBar from './NavBar';

const Analytics = React.createClass({
  render() {
    console.log(this.props);
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Analytics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Sales Info:</h4>
          <div>{JSON.stringify(this.props.data)}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

export default Analytics;
