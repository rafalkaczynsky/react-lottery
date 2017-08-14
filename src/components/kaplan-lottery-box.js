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
      callOutText:'',
      movieUrl: '',
      title:'',
      allFields:{},
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
      <div>
        <p className="arrow_box">{this.props.callOutText}</p>
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
                callOutText={this.state.callOutText}
                title={this.state.title}
                allFields={this.state.allFields}
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
      </div>
    );
  }
}

export default KaplanLotteryBox;
