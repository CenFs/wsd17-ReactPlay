import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { fetchGames, fetchGenres } from '../actions';


function priceFormatter (cell, row) {
  return `<i class='glyphicon glyphicon-euro'></i> ${cell}`;
}

//  function onClickSelected(cell, row, rowIndex){
//   console.log(cell, row, rowIndex);
// }

function urlFormatter (cell, row, enumObject, rowIndex) {
  // return `<Link to='/store/game/1'> ${cell} </Link>`;
  return (
    <button type="button" 
      onClick={() => {
        console.log(cell, row, rowIndex);
        browserHistory.push(`/store/game/${row.gameid}`);
        }}>
      Play
    </button>
  );
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
// <TableHeaderColumn dataField='genre' filter={{ type: 'SelectFilter', options: genreType, condition: 'eq'}}>Game Genre</TableHeaderColumn>
// <TableHeaderColumn dataField='genre'>Game Genre</TableHeaderColumn>

class GameList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // Fetch genres for the filter
    this.props.dispatch(fetchGenres());
    this.props.dispatch(fetchGames());
  }
  
  render () {
    return (
      <div>
        <BootstrapTable data={this.props.games} pagination>
            <TableHeaderColumn dataField='gameid' isKey={true} width='10%'>Game ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name' filter={{ type: 'TextFilter', delay: 200 }} width='20%'>Game Name</TableHeaderColumn>
            <TableHeaderColumn dataField='description' tdStyle={{ whiteSpace: 'normal' }}>Description</TableHeaderColumn>
            <TableHeaderColumn dataField='genre' filterFormatted dataFormat={ enumFormatter } formatExtraData={ this.props.genreTypes }
              filter={ { type: 'SelectFilter', options: this.props.genreTypes } }>Game Genre</TableHeaderColumn>
            <TableHeaderColumn dataField='price' dataSort={true} dataFormat={priceFormatter} width='10%'>Price</TableHeaderColumn>
            <TableHeaderColumn dataField='url' dataFormat={urlFormatter}>Buy or Play</TableHeaderColumn>
        </BootstrapTable>
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
  genreTypes: transform_genres(state.genres)
});

// connect the state of the application to Login component, so we can use dispatch at handleSubmit
export default connect(mapStateToProps)(GameList);
