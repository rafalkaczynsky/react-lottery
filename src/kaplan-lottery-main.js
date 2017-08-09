import React, { Component } from 'react';

import {SyncValidationForm, Header} from './components'
import './App.css';

class RenderFeedback extends React.Component {
  render(){
    const {header, paragraph} = this.props
    return(
  
      <div className="FeedbackContainer">
        <h3>{header}</h3>
        <p>{paragraph}</p>
      </div>
    )
  }
}

class KaplanLotteryMain extends Component {
  constructor(props){
    super(props)

    this.state = {
      isFormSubmitted: false,
      header: '',
      paragraph: '',
    }
  }

  handleOnSubmitForm(isFormSubmitted, header, paragraph){
    this.setState({
      isFormSubmitted: isFormSubmitted,
      header: header,
      paragraph: paragraph
    })
  }

  render() {

    return (
      <div className="app">
        <Header />
        {this.state.isFormSubmitted && <RenderFeedback header={this.state.header} paragraph= {this.state.paragraph}/>}
        {!this.state.isFormSubmitted && (
          <div>
            <SyncValidationForm 
              url={this.props.url}
              pollInterval={this.props.poll}       
              onSubmitForm={this.handleOnSubmitForm.bind(this)}
            /> 
          </div>
        )}
      </div>
    );
  }
}

export default KaplanLotteryMain;
