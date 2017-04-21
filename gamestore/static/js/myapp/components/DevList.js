import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import React from 'react';
import ReactDOM from 'react-dom';

const games = [{id: 1, name: "BrowserQuest", price: 3.99, desc: "A Massively Multiplayer Adventure", url:"http://browserquest.mozilla.org/"},
{id:2, name:"HEXGL", price:5.99, desc: "A futuristic, fast-paced racing game", url:"http://hexgl.bkcore.com/play/"},
{id:3, name:"HEXGL 2", price:6.99, desc: "A new, fast-paced racing game", url:"http://hexgl.bkcore.com/play/"},
{id:4, name:"HEXGL 3", price:6.99, desc: "A new, fast-paced racing game", url:"http://hexgl.bkcore.com/play/"},
{id:5, name:"HEXGL 4", price:6.99, desc: "A new, fast-paced racing game", url:"http://hexgl.bkcore.com/play/"},
{id:6, name:"HEXGL 5", price:6.99, desc: "A new, fast-paced racing game", url:"http://hexgl.bkcore.com/play/"},
{id:7, name:"HEXGL 6", price:6.99, desc: "A new, fast-paced racing game", url:"http://hexgl.bkcore.com/play/"},
{id:8, name:"HEXGL 7", price:6.99, desc: "A new, fast-paced racing game", url:"http://hexgl.bkcore.com/play/"}
]

function priceFormatter (cell, row) {
  return `<i class='glyphicon glyphicon-euro'></i> ${cell}`;
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

// add new game
function addGame(game_name, game_desc, genre_id, game_price, game_url) {
    return fetch('/api/games/', {
                credentials: 'include',
                method:'post',
                body: JSON.stringify({
                    gamename: game_name,
                    description: game_desc,
                    genreid: genre_id,
                    price: game_price,
                    url: game_url
                })
            })
            .then(x=>x.json())
            .then(result=>{
                // TODO: add result game to table
                console.log(result);
            });
}

function onAfterInsertRow(row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  //alert('The new row is:\n ' + newRowStr);
    addGame("test", "desc", 1, 13, "asdf");
}

const options = {
  afterInsertRow: onAfterInsertRow   // A hook for after insert rows
};

class DevList extends React.Component {
  render () {
    return (
      <div>
        <BootstrapTable data={games} cellEdit={cellEditProp} insertRow={true} options={options} pagination>
            <TableHeaderColumn dataField='id' isKey={true} width='10%'>Game ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name' filter={{ type: 'TextFilter', delay: 200 }} width='20%'>Game Name</TableHeaderColumn>
            <TableHeaderColumn dataField='desc' tdStyle={{ whiteSpace: 'normal' }}>Description</TableHeaderColumn>
            <TableHeaderColumn dataField='price' dataSort={true} dataFormat={priceFormatter} width='10%'>Price</TableHeaderColumn>
            <TableHeaderColumn dataField='url'>URL</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default DevList;
