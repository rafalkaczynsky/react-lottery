import React from 'react'
import axios from 'axios';
import { reduxForm } from 'redux-form'

import {PageHeader, Button, Col} from 'react-bootstrap'

var validCode = false
var userValidation = false

function readJSON(file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status === 200)
        return request.responseText;
};
function doTheVideo(){
  window.location.hash = 'video-box';
  document.getElementsByTagName('video')[0].play();
  document.getElementById('arrow_box').setAttribute('class','arrow_box hide-me');
  setTimeout(function () {
      document.getElementById('arrow_box').setAttribute('class','arrow_box fade-me-in');
  }, 5000);
};
var baseurl = process.env.REACT_APP_API_URL + ":"+ process.env.REACT_APP_API_PORT

var vaucherJSON = JSON.parse(readJSON(baseurl + "/api/codes"));
var winningCodesJSON = JSON.parse(readJSON(baseurl +'/api/winning-codes'));
var users = JSON.parse(readJSON(baseurl +'/api/users'));
//var AllWinners = JSON.parse(readJSON(baseurl +'/api/winners'));

// --------------------------- validation --------------------------
const validate = values => {
  const errors = {}

   validCode = false
   userValidation = false

   vaucherJSON.map((item)=> {
        if (item.code === values.code ){
          validCode = true
          return validCode
        }
        return item
   })

   users.map((user , indx) => {
      if (user.userCode === values.code){
        userValidation = true
        return userValidation
      }
      return user
  })

  if (!values.code) {
    errors.code = 'Required'
  } else if (values.code.length > 9) {
    errors.code = 'Your code is too long'
  } else if (values.code.length < 9) {
    errors.code = 'Your code is too short'
  } else if (validCode === false ) {
    errors.code = 'Code invalid, please double check your entry'
  } //else if (userValidation === false){
   // errors.code = 'This code is not assign to you'  }

   else {
   vaucherJSON.map((item)=> {
        if (item.code === values.code ){
          if (item.winning === true) {
            winningCodesJSON.map((winnerCode, indx)=> {
              if ((winnerCode.code === item.code) && (winnerCode.claimed === true)){
                  errors.code = 'This has been already claimed'
                  return errors.code
              }
                return winnerCode
            })
              return item.winning
          }
            return item.code
        }
          return item
   })

  }

  return errors
}
// ------------------------- warnings ----------------------------------
const warn = values => {
  const warnings = {}

  return warnings
}

class LotteryContainer extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      codeValue: String,
    }
  }

  componentDidMount(){
       document.getElementById('fliper').setAttribute('class','flipAnimationContainer lotteryContainer');
  }

  render(){

    const { handleSubmit, submitting, handleAll, header, paragraph} = this.props

    const submit = (values) => {

      //let code = String(values.code)
      let code = document.getElementById('checkCodeInput').value;
      vaucherJSON.map((item)=> {
        if (item.code === code ){
          validCode = true
          if (item.winning === true) {
            winningCodesJSON.map((winnerCode, indx)=> {
              if ((winnerCode.code === code) && (winnerCode.claimed === false)){
                     //  WINN !!!!!!!!!!!!
                  let callOutTitleNew = "You have won " + winnerCode.title


                  let callOutTextNew =winnerCode.description + " We have your details on record, we will be in touch shortly to tell you how to claim your prize"
                  doTheVideo();
                   handleAll(winnerCode.url,winnerCode.title,winnerCode, true, callOutTitleNew, callOutTextNew)
                   let winnerItem = {}
                   //check user by check code entered
                   users.map((user , indx) => {
                   if (user.userCode === code){
                        //update winningCodes - set winnerCode.claimed  = true
                        axios.post(baseurl+'/api/winning-codes', winnerCode)
                        .then(res => {
                            // .....
                        }).catch(err => {
                             console.error(err);
                        });

                        winnerItem.user = user
                        winnerItem.winnerCode = winnerCode

                        //save user to winners
                        axios.post(baseurl+'/api/winners', winnerItem)
                        .then(res => {

                             // .....
                        }).catch(err => {
                            console.error(err);
                        });
                    } return user
                   })
              }
                  return winnerCode
            })
          } else {
             // LOOSE :( !!!!!!!!!!!!!!!!!!!!!!!!!!
             let callOutTitleNew = "Unlucky!"
             let callOutTextNew = "You haven't won anything this time but you can still try again tomorrow"

            handleAll('http://138.68.170.17/videos/no-win.mp4',"Maybe next time",{}, true,callOutTitleNew, callOutTextNew)
            doTheVideo();
          }
        }

        return item
      })

      this.props.render(true)
  }

    return (
      <Col  id="fliper" className="lotteryContainer"  sm={12} md={12} xs={12} >
        <PageHeader className="pageHeader">{header}<br/></PageHeader>
        {paragraph !== "none" &&
        <form onSubmit={handleSubmit(submit)}>
          <input id="checkCodeInput" type="hidden" name="code" value={header.substring(13)}  />
          <div>
            <Button type="submit" className="submitButton" disabled={submitting}  bsStyle="primary" bsSize="large" active><small>Click here to see if you have won!</small></Button>
          </div>
        </form>
        }
      </Col>
  )
}
}

export default reduxForm({
  form: 'syncValidation',
  validate,
  warn
})(LotteryContainer)
