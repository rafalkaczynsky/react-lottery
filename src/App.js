import React from 'react'

import {Header, KaplanLotteryBox, MovieBox  } from './components'

import {Col} from 'react-bootstrap'

export default class App extends React.Component {
    constructor(props){
        super(props)

        this.state={
            movieUrl: '',
            title:'',
            allFields:{},
            autoPlay: false,
            callOutText: 'To crack the case simply fill in your details to reveal your pincode. Prizes range from £100 cash to vouchers for Nandos, the cinema and even an escape room. Prizes can be won every day until the 25th August so if you aren’t a lucky winner make sure you come back tomorrow to get another code.'
        }
    }

    handleAll(movieUrl,title,allFields, autoPlay,callOutText) {
        this.setState({
            movieUrl: movieUrl,
            autoPlay: autoPlay,
            title: title,
            allFields:allFields,
            callOutText: callOutText
        })
    }

    render(){

        var baseurl = process.env.REACT_APP_API_URL + ":"+ process.env.REACT_APP_API_PORT + '/api/users'

        return(
        <div className="mainContainer">
          {/*  <Header />
            */}
         { /* <div className="mainImageContainer">
                <img src={require('./images/image.jpg')} width="100%" alt="mainPicture"/>
            </div>*/}
            <div className="maxWidthFrame" >
                <Col className="maxWidthContainer" sm={12} md={12} xs={12}>
                <Col sm={12} md={12} >
                  <Col  className="page-header">
                      <h2>Crack the code to our accountant’s briefcase and unlock the start to your career.</h2>
                  </Col>
                </Col>
                    <Col sm={12} md={5} xs={12} className="leftSideContent">

                            <p>The life of an accountant is an interesting one, you never know with who or where you might end up working. All businesses need an accountant and ours have been busy collecting prizes wherever they go. Crack the case to win cash prizes and vouchers.</p>
                            <h3>Could this be the start of your career?</h3>
                            <p>If you’re getting results in August you may be thinking about what to do next. An Apprenticeship offers the best of both worlds, you can start earning straight away while still learning. We’ve got loads of Apprenticeships available in accountancy, financial services, customer services and administration. Head over to our jobs board now and
                                <a href="https://kaplan.co.uk/apprenticeships/jobs-board"> apply for your Apprenticeship.</a>
                            </p>
                            <h3>What next?</h3>
                            <ul className="whatNextList">

                            <li>
                              <Col sm={2} md={2} xs={3}>
                                <span className="glyphicon glyphicon-envelope" ></span>
                                </Col>
                              <Col sm={10} md={10} xs={9}>
                                <p>
                                Sign up to receive our monthly newsletter where we’ll send you the Apprenticeships available in your area
                                    <a href="https://kaplan.co.uk/apprenticeships/newsletter"> Sign up now</a>
                                </p>
                              </Col>
                            </li>
                            <li>
                              <Col sm={2} md={2} xs={3}>
                                <span className="glyphicon glyphicon-question-sign"></span>
                                </Col>
                              <Col sm={10} md={10} xs={9}>
                              <p>
                                Want to know more about what it is like to be an Apprentice?
                                    <a href="https://kaplan.co.uk/apprenticeships/talent-academy/apprentice-stories"> Check out our apprentice stories. </a>
                              </p>
                              </Col>
                            </li>

                            <li>
                              <Col sm={2} md={2} xs={3}>
                                <span className="glyphicon glyphicon-education"></span>
                              </Col>
                              <Col sm={10} md={10} xs={9}>
                              <p>
                              Not sure whether an Apprenticeship or uni is the right choice for you?
                                  <a href="https://kaplan.co.uk/apprenticeships/talent-academy/infographics/detail/talent-academy/2016/07/08/apprenticeship-or-university-what-s-the-right-choice-for-me"> View our handy infographic to help you decide.</a>
                              </p>
                              </Col>
                            </li>

                            <li>
                              <Col sm={2} md={2} xs={3}>
                                <span className="glyphicon glyphicon-briefcase"></span>
                              </Col>
                              <Col sm={10} md={10} xs={9}>
                              <p>
                                Need help putting together your CV?
                                    <a href="https://kaplan.co.uk/apprenticeships/talent-academy/advice-and-tips/detail/talent-academy/2016/07/12/hints-and-tips-for-the-perfect-cv"> Read our CV tips</a>
                              </p>
                              </Col>
                            </li>

                            <li>
                              <Col sm={2} md={2} xs={3}>
                                <span className="glyphicon glyphicon-search"></span>
                              </Col>
                              <Col sm={10} md={10} xs={9}>
                              <p>
                                Want to know more about accountancy? Find out what it’s like to work as a
                                    <a href="https://kaplan.co.uk/apprenticeships/talent-academy/news/detail/talent-academy/2017/03/06/your-guide-to-starting-out-in-forensic-accounting"> forensic accountant helping out the courts or businesses </a>
                                        or a
                                    <a href="https://kaplan.co.uk/apprenticeships/talent-academy/news/detail/talent-academy/2017/03/06/interview-with-a-production-accountant"> production accountant working in the film industry</a>
                              </p>
                              </Col>
                            </li>
                            </ul>

                    </Col>

                    <Col sm={12} md={6} xs={12} className="rightSideContent pull-right">
                        <MovieBox
                            movieUrl={this.state.movieUrl}
                            autoPlay={this.state.autoPlay}
                            title={this.state.title}
                            allFields={this.state.allFields}
                            callOutText={this.state.callOutText}
                        />
                        <KaplanLotteryBox
                            url={baseurl}
                            pollInterval={2000}
                            handleAll={this.handleAll.bind(this)}
                            callOutText={this.state.callOutText}
                        />
                      <Col sm={2} md={2} xs={3}>
                        <div className="fb-share-button" data-href="http://resultsweek.com" data-layout="button" data-size="large" data-mobile-iframe="true">
                          <a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fresultsweek.com&amp;src=sdkpreparse">Share Now</a>
                        </div>
                        </Col>
                        <Col sm={2} md={2} xs={3}>
                        <a className="twitter-share-button"
                          href="https://twitter.com/intent/tweet?text=Crack%20the%20code%20to%20our%20accountant's%20briefcase%20and%20unlock%20the%20start%20to%20your%20career%20pic.twitter.com/CcOfr1gfbd"
                          data-size="large">
                        Tweet</a>
                        </Col>
                    </Col>
                </Col>
            </div>
        </div>
        )
    }
}
