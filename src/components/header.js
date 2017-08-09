import React from 'react';

import Image from '../images/kaplan-icon-trans.png';

export default class Header extends React.Component {
    render(){
        return(
            <div className="header">
                <img src={Image} alt="kaplan logo" className="headerLogo"/>
            </div>
        )
    }
}