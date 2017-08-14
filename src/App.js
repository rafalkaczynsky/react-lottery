import React from 'react'

import {KaplanLotteryBox, MovieBox  } from './components'

import {Col} from 'react-bootstrap'

export default class App extends React.Component {
    constructor(props){
        super(props)

        this.state={
            movieUrl: '',
            title:'',
            allFields:{},
            autoPlay: false,
            callOutTitle: 'To crack the case simply fill in your details to reveal your pincode',
            callOutText: 'Prizes can be won every day until the 25th August so if you aren’t a lucky winner make sure you come back tomorrow to get another code.'
        }
    }

    handleAll(movieUrl,title,allFields, autoPlay,callOutTitle,callOutText) {
        this.setState({
            movieUrl: movieUrl,
            autoPlay: autoPlay,
            title: title,
            allFields:allFields,
            callOutTitle: callOutTitle,
            callOutText: callOutText
        })
    }
/***?utm_source=resultsweek.com&utm_medium=referral&utm_campaign=s17-5005b-apps-results-week&utm_content=[unique to link] */
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
                      <h2>It’s nearly results week! Crack the code to our accountant’s briefcase and win loads of fab prizes.</h2>
                  </Col>
                </Col>
                    <Col sm={12} md={5} xs={12} className="leftSideContent">

                            <p>The life of an accountant is an interesting one, you never know with who or where you might end up working. All businesses need an accountant and ours have been busy collecting prizes wherever they go. </p>
                            <br/>
                            <div className="alert alert-info">Crack the code to win prizes including
                            <ul className="prize-list">
                            <li><span className="glyphicon glyphicon-gift" ></span>Up to £100 cash</li>
                            <li><span className="glyphicon glyphicon-gift" ></span>Cinema tickets &</li>
                            <li><span className="glyphicon glyphicon-gift" ></span>Nando’s vouchers!</li>
                            </ul>
                            </div>
                            <h3>Whilst your here, why not unlock the start to your career….</h3>
                            <p>If you’re getting your results in August you may be thinking about what to do next. </p>
                            <br/>
                            <p> An Apprenticeship offers the best of both worlds, you can start earning straight away while still learning. </p>
                            <br/>
                            <p>We’ve got Apprenticeships available in accountancy, financial services, customer services and administration. </p>
                      {/*     <br/>
                             <p> Head over to our jobs board now and
                                <a href="https://kaplan.co.uk/apprenticeships/jobs-board?utm_source=resultsweek.com&utm_medium=referral&utm_campaign=s17-5005b-apps-results-week&utm_content=[apply-for-your-Apprenticeship]"> apply for your Apprenticeship.</a>
                            </p>

                            */}
                            <h3>What next?</h3>
                            <ul className="whatNextList">

                            <li className="panel">
                              <Col sm={2} md={2} xs={3}>
                                <span className="glyphicon glyphicon-envelope" ></span>
                                </Col>
                              <Col sm={10} md={10} xs={9}>
                                <p>  Get our monthly newsletter where we’ll send you the Apprenticeships available in your area
                                    <a className="buttonLink" href="https://kaplan.co.uk/apprenticeships/newsletter?utm_source=resultsweek.com&utm_medium=referral&utm_campaign=s17-5005b-apps-results-week&utm_content=[sign-up-now]"> Sign up now</a>
                                </p>
                              </Col>
                            </li>


                           <li className="panel">
                             <Col sm={2} md={2} xs={3}>
                               <span className="glyphicon glyphicon-briefcase"></span>
                             </Col>
                             <Col sm={10} md={10} xs={9}>
                             <p> Head over to our jobs board now and apply for your Apprenticeship.
                                <a className="buttonLink" href="https://kaplan.co.uk/apprenticeships/jobs-board?utm_source=resultsweek.com&utm_medium=referral&utm_campaign=s17-5005b-apps-results-week&utm_content=[apply-for-your-Apprenticeship]"> Apply now</a>
                            </p>
                             </Col>
                           </li>
                        {/*
                            <li className="panel">
                              <Col sm={2} md={2} xs={3}>
                                <span className="glyphicon glyphicon-question-sign"></span>
                                </Col>
                              <Col sm={10} md={10} xs={9}>
                              <p>
                                Want to know more about what it is like to be an Apprentice?
                                    <a href="https://kaplan.co.uk/apprenticeships/talent-academy/apprentice-stories?utm_source=resultsweek.com&utm_medium=referral&utm_campaign=s17-5005b-apps-results-week&utm_content=[check-out-our-apprentice-stories]"> Check out our apprentice stories. </a>
                              </p>
                              </Col>
                            </li>

                            <li className="panel">
                              <Col sm={2} md={2} xs={3}>
                                <span className="glyphicon glyphicon-education"></span>
                              </Col>
                              <Col sm={10} md={10} xs={9}>
                              <p>
                              Not sure whether an Apprenticeship or uni is the right choice for you?
                                  <a href="https://kaplan.co.uk/apprenticeships/talent-academy/infographics/detail/talent-academy/2016/07/08/apprenticeship-or-university-what-s-the-right-choice-for-me?utm_source=resultsweek.com&utm_medium=referral&utm_campaign=s17-5005b-apps-results-week&utm_content=[view-our-handy-infographic-to-help-you-decide]"> View our handy infographic to help you decide.</a>
                              </p>
                              </Col>
                            </li>

                            <li className="panel">
                              <Col sm={2} md={2} xs={3}>
                                <span className="glyphicon glyphicon-briefcase"></span>
                              </Col>
                              <Col sm={10} md={10} xs={9}>
                              <p>
                                Need help putting together your CV?
                                    <a href="https://kaplan.co.uk/apprenticeships/talent-academy/advice-and-tips/detail/talent-academy/2016/07/12/hints-and-tips-for-the-perfect-cv?utm_source=resultsweek.com&utm_medium=referral&utm_campaign=s17-5005b-apps-results-week&utm_content=[read-our-cv-tips]"> Read our CV tips</a>
                              </p>
                              </Col>
                            </li>

                            <li className="panel">
                              <Col sm={2} md={2} xs={3}>
                                <span className="glyphicon glyphicon-search"></span>
                              </Col>
                              <Col sm={10} md={10} xs={9}>
                              <p>
                                Want to know more about accountancy? Find out what it’s like to work as a
                                    <a href="https://kaplan.co.uk/apprenticeships/talent-academy/news/detail/talent-academy/2017/03/06/your-guide-to-starting-out-in-forensic-accounting?utm_source=resultsweek.com&utm_medium=referral&utm_campaign=s17-5005b-apps-results-week&utm_content=[forensic-accountant-helping-out-the-courts-or-businesses]"> forensic accountant helping out the courts or businesses </a>
                                        or a
                                    <a href="https://kaplan.co.uk/apprenticeships/talent-academy/news/detail/talent-academy/2017/03/06/interview-with-a-production-accountant?utm_source=resultsweek.com&utm_medium=referral&utm_campaign=s17-5005b-apps-results-week&utm_content=[production-accountant-working-in-the-film-industry]"> production accountant working in the film industry</a>
                              </p>
                              </Col>
                            </li>
                            */}
                            </ul>
                    </Col>

                    <Col sm={12} md={6} xs={12} className="rightSideContent pull-right">
                        <MovieBox
                            movieUrl={this.state.movieUrl}
                            autoPlay={this.state.autoPlay}
                            title={this.state.title}
                            allFields={this.state.allFields}
                            callOutText={this.state.callOutText}
                            callOutTitle={this.state.callOutTitle}
                        />
                        <KaplanLotteryBox
                            url={baseurl}
                            pollInterval={2000}
                            handleAll={this.handleAll.bind(this)}
                            callOutText={this.state.callOutText}
                            callOutTitle={this.state.callOutTitle}
                        />
                      <Col sm={2} md={2} xs={3}>
                        <div className="fb-share-button" data-href="http://resultsweek.com" data-layout="button" data-size="large" data-mobile-iframe="true">
                          <a className="fb-xfbml-parse-ignore" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fresultsweek.com&amp;src=sdkpreparse?utm_source=resultsweek.com&utm_medium=referral&utm_campaign=s17-5005b-apps-results-week&utm_content=[share-Now]">Share Now</a>
                        </div>
                        </Col>
                        <Col sm={2} md={2} xs={3}>
                        <a className="twitter-share-button"
                          href="https://twitter.com/intent/tweet?text=Crack%20the%20code%20to%20our%20accountant's%20briefcase%20and%20unlock%20the%20start%20to%20your%20career%20pic.twitter.com/CcOfr1gfbd?utm_source=resultsweek.com&utm_medium=referral&utm_campaign=s17-5005b-apps-results-week&utm_content=[tweet]"
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
