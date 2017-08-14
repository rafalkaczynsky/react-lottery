import React, { Component } from 'react';

import {RenderMovie} from '../components'
import '../App.css';

class MovieBox extends Component {

  render() {

    const { movieUrl, autoPlay, allFields,callOutText,callOutTitle } = this.props

    return (
        <div className="MovieBox">
            <RenderMovie
                movieUrl={movieUrl}
                callOutText={callOutText}
                callOutTite={callOutTitle}
                autoPlay={autoPlay}
                allFields={allFields}
              />

        </div>

    );
  }
}

export default MovieBox;
