import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import React from 'react';
import ReactDOM from 'react-dom';

const games = [{id: 1, name: "BrowserQuest", price: 3.99, desc: "A Massively Multiplayer Adventure", url:"http://browserquest.mozilla.org/"},
{id:2, name:"HEXGL", price:5.99, desc: "A futuristic, fast-paced racing game", url:"http://hexgl.bkcore.com/play/"},
{id:3, name:"HEXGL 2", price:6.99, desc: "A new, fast-paced racing game", url:"http://hexgl.bkcore.com/play/"}]

function priceFormatter (cell, row) {
  return `<i class='glyphicon glyphicon-euro'></i> ${cell}`;
}

class GameList extends React.Component {
  render () {
    return (
      <div>
        <BootstrapTable data={games}>
            <TableHeaderColumn dataField='id' isKey={true} >Game ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name' filter={{ type: 'TextFilter', delay: 200 }}>Game Name</TableHeaderColumn>
            <TableHeaderColumn dataField='desc' >Description</TableHeaderColumn>
            <TableHeaderColumn dataField='price' dataSort={true} dataFormat={ priceFormatter }>Game Price</TableHeaderColumn>
            <TableHeaderColumn dataField='url'>URL</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default GameList;
