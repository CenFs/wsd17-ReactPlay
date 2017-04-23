import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { fetchGames, fetchGenres, addGame, analticsGame } from '../actions';
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
  alert(`Save cell ${cellName} with value ${cellValue}`);

  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': ' + row[prop] + '\n';
  }

  alert('Thw whole row :\n' + rowStr);
}

function onBeforeSaveCell(row, cellName, cellValue) {
  // You can do any validation on here for editing value,
  // return false for reject the editing
  return true;
}

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};


function onAfterInsertRow(row) {
  this.props.dispatch(addGame(row['name'], row['description'], row['genre'], row['price'], row['url']));
}

function analyticsFormatter (cell, row, enumObject, rowIndex) {
  return (
    <button className="btn btn-info"
      onClick={() => {
          // browserHistory.push(`/store/game/${row.gameid}`);
          this.props.dispatch(analticsGame(row.gameid));
        }} >
      Details
    </button>

  );
}

const options = {
  afterInsertRow: onAfterInsertRow   // A hook for after insert rows
};

class DevList extends React.Component {
  constructor(props) {
    super(props);
    this.analyticsFormatter = analyticsFormatter.bind(this);
    this.onAfterInsertRow = onAfterInsertRow.bind(this);
    this.options = {afterInsertRow:this.onAfterInsertRow};
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
        <BootstrapTable data={this.props.games} cellEdit={cellEditProp} insertRow={true} options={this.options} pagination>
            <TableHeaderColumn dataField='gameid' isKey={true} hidden hiddenOnInsert autoValue>Game ID</TableHeaderColumn>
            <TableHeaderColumn dataField='author' width='10%' hiddenOnInsert>Author</TableHeaderColumn>
            <TableHeaderColumn dataField='name' filter={{ type: 'TextFilter', delay: 200 }} width='20%'>Game Name</TableHeaderColumn>
            <TableHeaderColumn dataField='description' tdStyle={{ whiteSpace: 'normal' }}>Description</TableHeaderColumn>
            <TableHeaderColumn dataField='genre' filterFormatted dataFormat={enumFormatter} formatExtraData={ this.props.genreTypes }>Game Genre</TableHeaderColumn>
            <TableHeaderColumn dataField='price' dataSort={true} dataFormat={priceFormatter} width='10%'>Price</TableHeaderColumn>
            <TableHeaderColumn dataField='url'>URL</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.analyticsFormatter} editable={false}>Analytics</TableHeaderColumn>
        </BootstrapTable>
        
      <Button bsStyle="primary" onClick={()=>{
          this.setState({ lgShow: true });    
          this.props.dispatch(analticsGame('1'));}
      }>
        Launch modal
      </Button>
      
      <Analytics show={this.state.lgShow} onHide={lgClose} data={this.props.analytics} />
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

const mapStateToProps = (state) => ({
  games:state.games,
  genreTypes: transform_genres(state.genres),
  analytics:state.analytics
});

// connect the state of the application to Login component, so we can use dispatch at handleSubmit
export default connect(mapStateToProps)(DevList);