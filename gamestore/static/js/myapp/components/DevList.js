import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { fetchGames, fetchGenres, addGame, updateGame, analticsGame } from '../actions';
import Analytics from './Analytic'
import { Button } from 'react-bootstrap';

function priceFormatter (cell, row) {
  return `<i class='glyphicon glyphicon-euro'></i> ${cell}`;
}

function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}
function genreTypeFormatter(cell, row, enumObject) {
  if (enumObject[row.genre] && enumObject[row.genre].name)
  {
    return enumObject[row.genre].name;
  }
  return cell;
}

function onAfterSaveCell(row, cellName, cellValue) {

  if (row['scorelist'])
    delete row['scorelist'];

  this.props.dispatch(updateGame(row['gameid'], row));
}


function onAfterInsertRow(row) {
  this.props.dispatch(addGame(row['name'], row['description'], row['genre'], row['price'], row['url']));
}

function analyticsFormatter (cell, row, enumObject, rowIndex) {
  return (
    <button className="btn btn-info"
      onClick={() => {
          // browserHistory.push(`/store/game/${row.gameid}`);
          this.props.dispatch(analticsGame(row.gameid));
          this.setState({ lgShow: true });    
        }} >
      Details
    </button>

  );
}

class DevList extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    this.analyticsFormatter = analyticsFormatter.bind(this);
    this.onAfterInsertRow = onAfterInsertRow.bind(this);
    this.onAfterSaveCell = onAfterSaveCell.bind(this);
    this.options = {afterInsertRow:this.onAfterInsertRow};
    this.cellEditProp = {mode: 'click',
                         blurToSave: true,
                         afterSaveCell: this.onAfterSaveCell};
    this.state = {smShow: false, lgShow: false};
  }

  componentDidMount() {
    // Fetch genres for the filter
    this.props.dispatch(fetchGenres());
    this.props.dispatch(fetchGames());
  }

  render () {
    // will change in redux way
    let smClose = () => this.setState({ smShow: false });
    let lgClose = () => this.setState({ lgShow: false });
    
    return (    
      <div>
        <BootstrapTable data={this.props.games} cellEdit={this.cellEditProp} insertRow={true} options={this.options} pagination>
            <TableHeaderColumn dataField='gameid' isKey={true} hidden hiddenOnInsert autoValue>Game ID</TableHeaderColumn>
            <TableHeaderColumn dataField='author' width='10%' hiddenOnInsert editable={false}>Author</TableHeaderColumn>
            <TableHeaderColumn dataField='name' filter={{ type: 'TextFilter', delay: 200 }} width='20%'>Game Name</TableHeaderColumn>
            <TableHeaderColumn dataField='description' tdStyle={{ whiteSpace: 'normal' }}>Description</TableHeaderColumn>
            <TableHeaderColumn dataField='genre' filterFormatted dataFormat={enumFormatter} formatExtraData={ this.props.genreTypes }>Game Genre</TableHeaderColumn>
            <TableHeaderColumn dataField='price' dataSort={true} dataFormat={priceFormatter} width='10%'>Price</TableHeaderColumn>
            <TableHeaderColumn dataField='url'>URL</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.analyticsFormatter} editable={false}>Analytics</TableHeaderColumn>
        </BootstrapTable>
        <Analytics show={this.state.lgShow} onHide={lgClose} data={this.props.analytics}/>
      </div>
    );
  }
}

function transform_genres(arr)
{
  var genres = {};
  for (var i = 0; i < arr.length; ++i) 
  {
    genres[i] = arr[i].name;
  }
  return genres;
}

// transform the current Redux store state into the props
const mapStateToProps = (state) => ({
  games:state.games,
  genreTypes: transform_genres(state.genres),
  analytics:state.analytics
});

// connect the state of the application to Login component, so we can use dispatch at handleSubmit
export default connect(mapStateToProps)(DevList);