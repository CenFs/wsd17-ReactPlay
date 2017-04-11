import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { fetchGenres } from '../actions';

const games = [{id: 1, name: "BrowserQuest", price: 3.99, desc: "A Massively Multiplayer Adventure", genre:0, url:"http://browserquest.mozilla.org/"},
{id:2, name:"HEXGL", price:5.99, desc: "A futuristic, fast-paced racing game", genre:1, url:"http://hexgl.bkcore.com/play/"},
{id:3, name:"HEXGL 2", price:6.99, desc: "A new, fast-paced racing game", genre:3, url:"http://hexgl.bkcore.com/play/"},
{id:4, name:"HEXGL 3", price:6.99, desc: "A new, fast-paced racing game", genre:3, url:"http://hexgl.bkcore.com/play/"},
{id:5, name:"HEXGL 4", price:6.99, desc: "A new, fast-paced racing game", genre:2, url:"http://hexgl.bkcore.com/play/"},
{id:6, name:"HEXGL 5", price:6.99, desc: "A new, fast-paced racing game", genre:1, url:"http://hexgl.bkcore.com/play/"},
{id:7, name:"HEXGL 6", price:6.99, desc: "A new, fast-paced racing game", genre:0, url:"http://hexgl.bkcore.com/play/"},
{id:8, name:"HEXGL 7", price:6.99, desc: "A new, fast-paced racing game", genre:3, url:"http://hexgl.bkcore.com/play/"},
{id:9, name:"HEXGL 8", price:6.99, desc: "A new, fast-paced racing game", genre:2, url:"http://hexgl.bkcore.com/play/"},
{id:10, name:"HEXGL 9", price:6.99, desc: "A new, fast-paced racing game", genre:2, url:"http://hexgl.bkcore.com/play/"},
{id:11, name:"HEXGL 10", price:6.99, desc: "A new, fast-paced racing game", genre:1, url:"http://hexgl.bkcore.com/play/"},]


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
      genreTypes: {}
    };
  }
  
  componentDidMount() {
    // Get genres for the filter
    return fetch('/api/genres')
      .then(x=>x.json())
      .then(y=> {
        var genres = {}
        for (var i = 0; i < y.genrelist.length; ++i) {
          // id-1 so we dont miss one genre
          genres[y.genrelist[i].genreid-1] = y.genrelist[i].name;
        }
        this.setState({genreTypes:genres})
      });
    }
  
  render () {
    return (
      <div>
        <BootstrapTable data={games} pagination>
            <TableHeaderColumn dataField='id' isKey={true} width='10%'>Game ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name' filter={{ type: 'TextFilter', delay: 200 }} width='20%'>Game Name</TableHeaderColumn>
            <TableHeaderColumn dataField='desc' tdStyle={{ whiteSpace: 'normal' }}>Description</TableHeaderColumn>
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
