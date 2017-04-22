import React from 'react';
import { Analytics } from '../actions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NavBar from './NavBar';

class Analytics extends React.Component {

  componentDidMount () {
    // Fetch genres for the filter
    // this.props.dispatch(fetchAnalytics(gameId));
  }

  render () {
    return (
      <div>
       <h4> Analytics </h4>
       <div> </div>
      </div>
    );
  }
}

export default Analytics;
