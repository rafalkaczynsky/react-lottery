import React, { Component } from 'react';

import {SyncValidationForm, LotteryContainer} from './'
import '../App.css';


class KaplanLotteryBox extends Component {
  constructor(props){
    super(props)

    this.state = {
      isFormSubmitted: false,
      header: '',
      paragraph: '',
      movieUrl: '',
      autoPlay: false,
    }
  }

  handleSetFeedBack(isFormSubmitted, header, paragraph){
    this.setState({
      isFormSubmitted: isFormSubmitted,
      header: header,
      paragraph: paragraph,
      autoPlay: true
    })
  }

  render() {

    return (
      <div className="app">
        {this.state.isFormSubmitted && 
            <LotteryContainer 
              url={this.props.url}
              pollInterval={this.props.poll}
              render={(checker)=> this.setState({
                lotteryFinished: checker,           
              })}       

              header={this.state.header}
              paragraph={this.state.paragraph}
              movieUrl={this.state.movieUrl}
              autoPlay={this.state.autoPlay}
              handleAll={this.props.handleAll}
            />          
        }
        {!this.state.isFormSubmitted && (
            <SyncValidationForm 
              url={this.props.url}
              pollInterval={this.props.poll}       
              setFeedBack={this.handleSetFeedBack.bind(this)}
            /> 
        )}
      </div>
    );
  }
}

export default KaplanLotteryBox;
