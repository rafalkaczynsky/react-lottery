import React from 'react'

export default class RenderMovie extends React.Component {

    render(){

        const {movieUrl} = this.props

        return(
                <video src={movieUrl} autoPlay={true} loop >
                      <source src={movieUrl} type="video/mp4"/>
                        Your browser does not support HTML5 video.
                </video>
        )
    }
}
