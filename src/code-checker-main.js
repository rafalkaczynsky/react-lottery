import React, { Component } from 'react';

import {LotteryContainer, Header, RenderMovie} from './components'
import './App.css';


class CodeCheckerMain extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      lotteryFinished: false,
      winner: false,
      movieUrl: '',
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
            <div className="lotteryBox">
            {this.state.lotteryFinished && 
                <RenderMovie 
                  winner={this.state.winner}
                  movieUrl={this.state.movieUrl}
                />}
            {!this.state.lotteryFinished &&            
                <LotteryContainer 
                  url={this.props.url}
                  pollInterval={this.props.poll}
                  render={(checker)=> this.setState({
                    lotteryFinished: checker,           
                    })}       
                  onWin={(winner, movieUrl)=> this.setState({
                    winner: winner,
                    movieUrl: movieUrl
                  })}
                />
            }
            </div>  
        </div>
      </div>
    );
  }
}

export default CodeCheckerMain;