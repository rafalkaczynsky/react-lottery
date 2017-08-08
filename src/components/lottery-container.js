import React from 'react'
import axios from 'axios';
import { Field, reduxForm } from 'redux-form'

import {PageHeader, Button, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Panel, HelpBlock} from 'react-bootstrap'

import {RenderMovie} from './'


 var attempts = 3
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

var vaucherJSON = JSON.parse(readJSON('http://localhost:3001/api/codes'));
var winningCodesJSON = JSON.parse(readJSON('http://localhost:3001/api/winning-codes'));
var users = JSON.parse(readJSON('http://localhost:3001/api/users'));
var AllWinners = JSON.parse(readJSON('http://localhost:3001/api/winners'));


// --------------------------- validation --------------------------
const validate = values => {
  const errors = {}
  if (!values.code) {
    errors.code = 'Required'
  } else if (values.code.length > 9) {
    errors.code = 'Must be 10 characters but is more now'
  } else if (values.code.length < 9) {
    errors.code = 'Must be 10 charackters but is less now'
  }

  return errors
}
// ------------------------- warnings ----------------------------------
const warn = values => {
  const warnings = {}
  if (attempts <= 3) {
    warnings.code = 'You have ' + attempts + 'left.'
  }
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
      let validCode = false
      let code = String(values.code)

      vaucherJSON.map((item)=> {
        if (item.code === code ){
          validCode = true
          if (item.winning === true) {
            winningCodesJSON.map((winnerCode, indx)=> {
              if ((winnerCode.code === code) && (winnerCode.claimed === false)) {
                     //  ================================== WINN !!!!!!!!!!!! ===================================
                  onWin(true, winnerCode.url)  // tell that is winn event and send proper url with movie to render
                  alert('tada')
                  //........
                   let winnerItem = {}
                   //check user by check code entered // temp I used email
                   users.map((user , indx) => {
                   if (user.userCode === code){           
                        //update winningCodes - set winnerCode.claimed  = true
                        axios.post('http://localhost:3001/api/winning-codes', winnerCode)
                        .then(res => {
                            // .....   
                        }).catch(err => {
                             console.error(err);
                        });  

                        winnerItem.user = user
                        winnerItem.winnerCode = winnerCode

                        //save user to winners    
                        axios.post('http://localhost:3001/api/winners', winnerItem)
                        .then(res => {
                             // .....   
                        }).catch(err => {
                            console.error(err);
                        });  
                    }
                   })
              } 
            })
          } else {
            onWin(true, '/videos/no-win.mp4')       // LOOSE :( !!!!!!!!!!!!!!!!!!!!!!!!!!
          }
        } 
      })

      if (validCode === false) {
          alert('invalid code!!!')
          attempts --
        } else null               // INVALID CODE TYPED 

      this.props.render(true)
  }

    return (
      <div>
        <PageHeader>Example page header <small>Subtext for header</small></PageHeader>
        <form onSubmit={handleSubmit(submit)}>
          <Field name="code" type="text" component={renderField} label="Your Code"/>
          <div>
            <Button type="submit" className="submitButton" disabled={submitting}  bsStyle="primary" bsSize="large" active>Submit</Button>
          </div>
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

