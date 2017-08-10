import React from 'react'

import {Header, KaplanLotteryBox, MovieBox  } from './components'

import {Col} from 'react-bootstrap'

export default class App extends React.Component {
    constructor(props){
        super(props)

        this.state={
            movieUrl: '',
            autoPlay: false
        }
    }

    handleAll(movieUrl, autoPlay) {
        this.setState({
            movieUrl: movieUrl,
            autoPlay: autoPlay
        })    
    }

    render(){

        var baseurl = process.env.REACT_APP_API_URL + ":"+ process.env.REACT_APP_API_PORT + '/api/users'

        return(
            <div className="mainContainer">
                <Header />
                <div className="mainImageContainer">
                    <img src={require('./images/image.jpg')} width="100%" alt="mainPicture"/>
                </div>
                <Col sm={12} md={12} xs={12}>
                    <Col sm={6} md={6} xs={12} className="leftSideContent">
                     
                            <h3>Crack the code to our accountant’s briefcase and unlock the start to your career.</h3>
                            <p>The life of an accountant is an interesting one, you never know with who or where you might end up working. All businesses need an accountant and ours have been busy collecting prizes wherever they go.</p>
                            <p>To crack the case simply fill in your details to reveal your pincode. Enter this into the briefcase to see if you’re a winner. There will be prizes every day until **** so if you aren’t a lucky winner you can try again tomorrow.</p>          
                            <h3>Could this be the start of your career?</h3>             
                            <p>If you’re getting results in August you may be thinking about what to do next. An Apprenticeship offers the best of both worlds, you can start earning straight away while still learning. We’ve got loads of Apprenticeships available in accountancy, financial services, customer services and administration. Head over to our jobs board now and 
                                <a href="https://kaplan.co.uk/apprenticeships/jobs-board">apply for your Apprenticeship.</a>
                            </p>    
                            <h3>What next?</h3>     
                            <p>Sign up to receive our monthly newsletter where we’ll send you the Apprenticeships available in your area
                                <a href="https://kaplan.co.uk/apprenticeships/newsletter">Sign up now</a>
                            </p>               

                            <p>Want to know more about what it's like to be an Apprentice?
                                <a href="https://kaplan.co.uk/apprenticeships/talent-academy/apprentice-stories">Check out our apprentice stories. </a>
                            </p>

                            <p>Not sure whether an Apprenticeship or uni is the right choice for you?
                                <a href="https://kaplan.co.uk/apprenticeships/talent-academy/infographics/detail/talent-academy/2016/07/08/apprenticeship-or-university-what-s-the-right-choice-for-me">? View our handy infographic to help you decide.</a>
                            </p>

                            <p>Need help putting together your CV?
                                <a href="https://kaplan.co.uk/apprenticeships/talent-academy/advice-and-tips/detail/talent-academy/2016/07/12/hints-and-tips-for-the-perfect-cv">Read our CV tips</a>
                            </p>

                            <p>Want to know more about accountancy? Find out what it’s like to work as a
                                <a href="https://kaplan.co.uk/apprenticeships/talent-academy/news/detail/talent-academy/2017/03/06/your-guide-to-starting-out-in-forensic-accounting"> forensic accountant helping out the courts or businesses</a>
                                    or a
                                <a href="https://kaplan.co.uk/apprenticeships/talent-academy/news/detail/talent-academy/2017/03/06/interview-with-a-production-accountant"> production accountant working in the film industry</a>
                            </p>
        
                    </Col>
                    <Col sm={6} md={6} xs={12} className="rightSideContent">
                        <MovieBox 
                            movieUrl={this.state.movieUrl}
                            autoPlay={this.state.autoPlay}
                        />
                        <KaplanLotteryBox
                            url={baseurl}
                            pollInterval={2000}
                            handleAll={this.handleAll.bind(this)}
                        />            
                    </Col>
                </Col>
            </div>
        )
    }
}



