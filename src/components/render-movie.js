import React from 'react'

export default class RenderMovie extends React.Component {

    render(){

        const {movieUrl} = this.props

        return(
            <div >
                <video  width="400">
                    <source src={movieUrl}  type="video/mp4"/>
                    <source src={movieUrl}  type="video/ogg"/>
                        Your browser does not support the video tag.
                </video>
            </div>
        )
    }
}