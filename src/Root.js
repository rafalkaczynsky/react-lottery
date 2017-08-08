import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, BrowserRouter} from 'react-router-dom'
import KaplanLotteryMain from './kaplan-lottery-main'
import CodeCheckerMain from './code-checker-main'

class KaplanLottery extends React.Component{

    render(){
        return(
            <KaplanLotteryMain 
                url='http://localhost:3001/api/users'
                pollInterval={2000}
            />
        )
    }
}

class CodeChecker extends React.Component {
    render(){
        return(
            <CodeCheckerMain 
                url='http://localhost:3001/api/users'
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
            <Route path='/code-checker' component={CodeChecker} />
        </div>
    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root