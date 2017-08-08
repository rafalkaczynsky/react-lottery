import React from 'react'

export default class RenderMovie extends React.Component {

    render(){

        const {movieUrl} = this.props

        return(
            <div>
                <video className="video-container video-container-overlay" src="no-win.mp4" autoPlay={true} loop >
                      <source src="no-win.mp4" type="video/mp4"/>
                      <source src="no-win.ogg" type="video/ogg"/>
                        Your browser does not support HTML5 video.
                </video>
            </div>
        )
    }
}