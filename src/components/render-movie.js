import React from 'react'

export default class RenderMovie extends React.Component {

    render(){

        const {movieUrl, autoPlay} = this.props

        const movie = movieUrl !== '' ? movieUrl : 'http://138.68.170.17/videos/no-win.mp4'

        return(
                <video id="video-box" poster="/images/still.jpg" src={movie} autoPlay={autoPlay} >
                      <source src={movie} type="video/mp4"/>
                        Your browser does not support HTML5 video.
                </video>
        )
    }
}
