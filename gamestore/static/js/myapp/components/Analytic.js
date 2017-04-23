import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Modal, Button } from 'react-bootstrap';

const Analytics = React.createClass({
  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Analytics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Sales Info:</h4>
          <BootstrapTable data={ this.props.data }>
          <TableHeaderColumn dataField='id' isKey>No.</TableHeaderColumn>
          <TableHeaderColumn dataField='username' dataSort={true}>User Name</TableHeaderColumn>
          <TableHeaderColumn dataField='purchase_price' dataSort={true}>Purchase Price</TableHeaderColumn>
          <TableHeaderColumn dataField='purchase_date' dataSort={true}>Product Date</TableHeaderColumn>
          </BootstrapTable>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

export default Analytics;
