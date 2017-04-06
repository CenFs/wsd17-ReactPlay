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
{id:8, name:"HEXGL 7", price:6.99, desc: "A new, fast-paced racing game", url:"http://hexgl.bkcore.com/play/"},
{id:9, name:"HEXGL 8", price:6.99, desc: "A new, fast-paced racing game", url:"http://hexgl.bkcore.com/play/"},
{id:10, name:"HEXGL 9", price:6.99, desc: "A new, fast-paced racing game", url:"http://hexgl.bkcore.com/play/"},
{id:11, name:"HEXGL 10", price:6.99, desc: "A new, fast-paced racing game", url:"http://hexgl.bkcore.com/play/"},]

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

class DevList extends React.Component {
  render () {
    return (
      <div>
        <BootstrapTable data={games} cellEdit={cellEditProp} insertRow={true} pagination>
            <TableHeaderColumn dataField='id' isKey={true} width='10%'>Game ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name' filter={{ type: 'TextFilter', delay: 200 }} width='20%'>Game Name</TableHeaderColumn>
            <TableHeaderColumn dataField='desc' tdStyle={{ whiteSpace: 'normal' }}>Description</TableHeaderColumn>
            <TableHeaderColumn dataField='price' dataSort={true} dataFormat={priceFormatter} width='10%'>Game Price</TableHeaderColumn>
            <TableHeaderColumn dataField='url'>URL</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default DevList;
