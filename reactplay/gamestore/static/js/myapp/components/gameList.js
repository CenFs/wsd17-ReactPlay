import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { fetchGenres } from '../actions';


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
        browserHistory.push(`/store/game/${row.id}`);
        }}>
      Play
    </button>
  )
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
    this.state = {
      genreTypes: {},
      games: []
    };
  }
  
  componentDidMount() {
    // Fetch genres for the filter
    fetch('/api/genres')
      .then(x=>x.json())
      .then(y=> {
        var genres = {};
        for (var i = 0; i < y.genrelist.length; ++i) {
          genres[i] = y.genrelist[i].name;
        }
        this.setState({genreTypes:genres});
      });
    
    // Fetch games from the API
    fetch('/api/games', {
      credentials: 'include',
      method:'get'})
      .then(x=>x.json())
      .then(y=> {
        var gamelist = [];
        for (var i = 0; i < y.gamelist.length; ++i) {
          gamelist[i] = y.gamelist[i];
        }
        this.setState({games:gamelist});
      })
    
    }
  
  render () {
    return (
      <div>
        <BootstrapTable data={this.state.games} pagination>
            <TableHeaderColumn dataField='gameid' isKey={true} width='10%'>Game ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name' filter={{ type: 'TextFilter', delay: 200 }} width='20%'>Game Name</TableHeaderColumn>
            <TableHeaderColumn dataField='description' tdStyle={{ whiteSpace: 'normal' }}>Description</TableHeaderColumn>
            <TableHeaderColumn dataField='genre' filterFormatted dataFormat={ enumFormatter } formatExtraData={ this.state.genreTypes }
              filter={ { type: 'SelectFilter', options: this.state.genreTypes } }>Game Genre</TableHeaderColumn>
            <TableHeaderColumn dataField='price' dataSort={true} dataFormat={priceFormatter} width='10%'>Price</TableHeaderColumn>
            <TableHeaderColumn dataField='url' dataFormat={urlFormatter}>Buy or Play</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default GameList;
