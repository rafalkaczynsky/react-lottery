import React from 'react'
import axios from 'axios';
import { Field, reduxForm } from 'redux-form'

import {PageHeader, Button, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Panel, HelpBlock} from 'react-bootstrap'

import {RenderMovie} from './'


var validCode = false
// code generator
var voucher_codes = require('voucher-code-generator');

// generate 1000 codes
var vaucherArray = voucher_codes.generate({
    length: 8,
    count: 1000,

});

function readJSON(file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status == 200)
        return request.responseText;
};
var baseurl = process.env.REACT_APP_API_URL + ":"+ process.env.REACT_APP_API_PORT

var vaucherJSON = JSON.parse(readJSON(baseurl + "/api/codes"));
var winningCodesJSON = JSON.parse(readJSON(baseurl +'/api/winning-codes'));
var users = JSON.parse(readJSON(baseurl +'/api/users'));
var AllWinners = JSON.parse(readJSON(baseurl +'/api/winners'));


// --------------------------- validation --------------------------
const validate = values => {
  const errors = {}
  if (!values.code) {
    errors.code = 'Required'
  } else if (values.code.length > 9) {
    errors.code = 'Your code is too long'
  } else if (values.code.length < 9) {
    errors.code = 'Your code is too short'
  } else if (validCode === false ) {
    errors.code = 'Code invalid, please double check your entry'
  } 

   //'please check your code

  return errors
}
// ------------------------- warnings ----------------------------------
const warn = values => {
  const warnings = {}

  return warnings
}

//renderTextField

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <FormGroup controlId="formValidationError2" bsSize="large" validationState={!touched ? null : error ? 'error' : warning ? 'warning' : 'success'}>
      <ControlLabel>
        {label}
      </ControlLabel>
      <FormControl {...input} placeholder={label} type={type} />
      <FormControl.Feedback />
      {touched &&
        ((error &&
          <HelpBlock>{error}</HelpBlock>
         ) ||
          (warning &&
         <HelpBlock>{warning}</HelpBlock>))}
   </FormGroup>


class LotteryContainer extends React.Component {

  render(){

    const { handleSubmit, pristine, reset, submitting, render, onWin} = this.props

    const submit = (values) => {

      let code = String(values.code)

      vaucherJSON.map((item)=> {
        if (item.code === code ){
          validCode = true
          if (item.winning === true) {
            winningCodesJSON.map((winnerCode, indx)=> {
              if (winnerCode.code === code) {
                // I removed && (winnerCode.claimed === false)
                //better perhaps to display text that says: this has already been claimged

                     //  ================================== WINN !!!!!!!!!!!! ===================================
                  // tell that is winn event and send proper url with movie to render
                  //........
                //  if(winnerCode.claimed != true){


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

                        onWin(true, winnerCode.url)  
                    }
                   })
            //     }//endif
            //     else{
            //       alert('this prize has already been claimed')
            //     }
              }
            })
          } else {
            onWin(true, '/videos/no-win.mp4')       // LOOSE :( !!!!!!!!!!!!!!!!!!!!!!!!!!
          }
        }
      })

      this.props.render(true)
  }

    return (
      <div>
        <PageHeader>Kaplan Prize Draw <br/><small>Enter your code to see if you have won!</small></PageHeader>

        <form onSubmit={handleSubmit(submit)}>
          <Field name="code" type="text" component={renderField} label="Your Code"/>
          <div>
            <Button type="submit" className="submitButton" disabled={submitting}  bsStyle="primary" bsSize="large" active>Submit</Button>
          </div>
          <small>
            You should have received a code when signing up to our newsletter <a href="/">here</a>. If you have subscribed but have not received email, <a href="mailto:admin@mediacabin.co.uk">please notify us now.</a>
          </small>
        </form>
      </div>
  )
}
}

export default reduxForm({
  form: 'syncValidation',
  validate,
  warn
})(LotteryContainer)
