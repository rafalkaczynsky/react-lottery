import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, BrowserRouter} from 'react-router-dom'
import KaplanLotteryMain from './kaplan-lottery-main'
import CodeCheckerMain from './code-checker-main'

class KaplanLottery extends React.Component{


    render(){
        var baseurl = process.env.REACT_APP_API_URL + ":"+ process.env.REACT_APP_API_PORT + '/api/users'
        return(
            <KaplanLotteryMain
                url={baseurl}
                pollInterval={2000}
            />
        )
    }
}

class CodeChecker extends React.Component {
    render(){
        var baseurl = process.env.REACT_APP_API_URL + ":"+ process.env.REACT_APP_API_PORT + '/api/users'
        return(
            <CodeCheckerMain
                url={baseurl}
                pollInterval={2000}
            />
        )
    }
}

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
        <div>
            <Route exact path='/' component={KaplanLottery} />
            <Route path='/checker' component={CodeChecker} />
        </div>
    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
