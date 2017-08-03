import React, { Component } from 'react';
import {PageHeader} from 'react-bootstrap'

import {SyncValidationForm} from './components'
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <PageHeader>Example page header <small>Subtext for header</small></PageHeader>
        <SyncValidationForm 
          url={this.props.url}
          pollInterval={this.props.poll}        
        />  
      </div>
    );
  }
}

export default App;
