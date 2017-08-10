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
      <div>
        <p className="arrow_box">To crack the case simply fill in your details to reveal your pincode. Enter this into the briefcase to see if you’re a winner. There will be prizes every day until **** so if you aren’t a lucky winner you can try again tomorrow.</p>

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
      </div>
    );
  }
}

export default KaplanLotteryBox;
