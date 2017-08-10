import React, { Component } from 'react';

import {RenderMovie} from '../components'
import '../App.css';

class MovieBox extends Component {

  render() {

    const { movieUrl, autoPlay } = this.props

    return (
        <div className="MovieBox">
            <RenderMovie 
                movieUrl={movieUrl}
                autoPlay={autoPlay}
              />
        </div>  

    );
  }
}

export default MovieBox;
