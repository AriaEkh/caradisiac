import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class App extends Component {
  state = {
    fixedHeader: true,
    fixedFooter: true,
    showRowHover: true,
    showCheckboxes: false,
    height: '600px',
    data : []
  };

  componentDidMount(){
    fetch('/suv')
    .then((res)=> res.json())
    .then((json)=>{
      this.setState({data : json.hits.hits})
    })
  }
  render() {
    var data = this.state.data.map(model => 
    <TableRow>
      <TableRowColumn>{model._source.brand}</TableRowColumn>
      <TableRowColumn>{model._source.volume}</TableRowColumn>
      <TableRowColumn>{model._source.name}</TableRowColumn>
    </TableRow>)
    return (
      <Table
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedfooter={this.state.fixedFooter}>
        <TableHeader
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow>
            <TableHeaderColumn
              colSpan="4"
              style={{ textAlign: 'center'}}>
              Available Models
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Brand</TableHeaderColumn>
            <TableHeaderColumn>Volume</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={this.state.showCheckboxes}
          showRowHover={this.state.showRowHover}>
          {data}
        </TableBody>
      </Table>
    );
  }
}

export default App;