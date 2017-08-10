import React from 'react'

export default class RenderMovie extends React.Component {

    render(){

        const {movieUrl, autoPlay} = this.props

        const movie = movieUrl !== '' ? movieUrl : '/videos/no-win.mp4'

        return(
                <video src={movie} autoPlay={autoPlay} >
                      <source src={movie} type="video/mp4"/>
                        Your browser does not support HTML5 video.
                </video>
        )
    }
}
