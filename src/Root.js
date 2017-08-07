import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, BrowserRouter} from 'react-router-dom'
import KaplanLotteryMain from './kaplan-lottery-main'


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

class xxx extends React.Component {
    render(){
        return(
            <div>
                dsdsadsdsadadd
            </div>
        )
    }
}

const Root = ({ store }) => (
  <Provider store={store}>
<BrowserRouter>
  <div>
    <Route path='/about' component={KaplanLottery} />
    <Route path='/contact' component={xxx} />
  </div>
</BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root