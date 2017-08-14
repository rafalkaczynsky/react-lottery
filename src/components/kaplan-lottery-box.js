import React, { Component } from 'react';
import {Col} from 'react-bootstrap'

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
      callOutTitle:'',
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
        <div id="arrow_box" className="arrow_box">
        <Col  className="page-header"> <h3> {this.props.callOutTitle} </h3> </Col>
        {this.props.callOutText}
        </div>
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
                callOutTitle={this.state.callOutTitle}
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
          <p><small>View the competition Terms and Conditions <a href="http://resultsweek.com/TsandCsRWKaplan.pdf" target="_blank"> here</a></small></p>

        </div>
      </div>
    );
  }
}

export default KaplanLotteryBox;
