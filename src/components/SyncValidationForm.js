import React from 'react'
import axios from 'axios';
import { Field, reduxForm } from 'redux-form'

import {Button, FormGroup, Col, ControlLabel, FormControl, Checkbox, HelpBlock} from 'react-bootstrap'

var DatePicker = require("react-bootstrap-date-picker");

function readJSON(file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status === 200)
        return request.responseText;
};

function setUnique(vJSON){
  let newItem = false;
  let randumNumber = Math.floor((Math.random() * 1000))

  while (newItem === false){
    if(vJSON[randumNumber].used && vJSON[randumNumber].used === true){
      randumNumber = Math.floor((Math.random() * 1000))
    }else {
      newItem = true;
      return vJSON[randumNumber].code;
    }
  }
}

var baseurl = process.env.REACT_APP_API_URL + ":"+ process.env.REACT_APP_API_PORT

var vaucherJSON = JSON.parse(readJSON(baseurl +'/api/codes'));
var usersJSON = JSON.parse(readJSON(baseurl +'/api/users'));

// --------------------------- validation --------------------------
const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length > 15) {
    errors.FirstName = 'Must be 15 characters or less'
  }
  if (!values.surname) {
    errors.surname = 'Required'
  } else if (values.surname.length > 15) {
    errors.Surname = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.dob) {
    errors.dob = 'Required'
  }

  if (!values.postcode) {
    errors.postcode = 'Required'
  } else if (!/^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i.test(values.postcode)) {
    errors.postcode = 'Invalid Postcode'
  }

  return errors
}
// ------------------------- warnings ----------------------------------
const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <FormGroup controlId="formValidationError2" validationState={!touched ? null : error ? 'error' : warning ? 'warning' : 'success'}>
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

const renderCheckboxField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <FormGroup controlId="formValidationError2" validationState={!touched ? null : error ? 'error' : warning ? 'warning' : 'success'}>
      <Checkbox {...input} inline>
          {label}
      </Checkbox>
      <FormControl.Feedback />
      {touched &&
        ((error &&
          <HelpBlock>{error}</HelpBlock>
         ) ||
          (warning &&
         <HelpBlock>{warning}</HelpBlock>))}
   </FormGroup>


const renderDateInputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <FormGroup controlId="formValidationError2" validationState={!touched ? null : error ? 'error' : warning ? 'warning' : 'success'}>
      <ControlLabel>{label}</ControlLabel>
      <DatePicker id="datepicker"  {...input} dateFormat="DD/MM/YYYY" />
      <FormControl.Feedback />
      <div>
      {touched &&
        ((error &&
          <HelpBlock>{error}</HelpBlock>
         ) ||
          (warning &&
         <HelpBlock>{warning}</HelpBlock>))}
         </div>
   </FormGroup>



class SyncValidationForm extends React.Component {

  render(){

    const { handleSubmit, submitting, setFeedBack } = this.props

    const submit = (values) =>  {
      usersJSON.map((item ,indx)=> {

        var dateObj = new Date();

        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        let dateToday =   day + '/' + month + '/' + year

        if ((item.email === values.email) && (dateToday === item.lastPlay)){

          let header = 'Looks like you have already had a go today. Try again tomorrow'
          let paragraph = 'none'

           setFeedBack(true, header, paragraph)
        } else if (indx === (usersJSON.length -1)) {
            let user = values

            let randomCode = setUnique(vaucherJSON);
            user.userCode = randomCode

          //  user.userCode = 'IYz6-6Vd5'

            user.lastPlay = dateToday

            axios.post(this.props.url, user)
            .then(res => {

              let header = 'Your Code is:' + user.userCode
              let paragraph = "Enter it below to see if you have won!"
              setFeedBack(true, header, paragraph)
            })
            .catch(err => {
              console.error(err);
            });
            }
          return item
        })
    }
    const agreement = 'I consent to receiving updates from Kaplan. I understand that Kaplan will never sell my data and I consent to it being shared with selected third parties for the purposes of performing business services only. Please see our Privacy Policy for further details on how we handle your data. *'
    const radioLabel = 'Are you currently looking for an Apprenticeship?'

    return (
      <form className="formContainer" onSubmit={handleSubmit(submit)}>
        <Col sm={6} md={6} >
          <Field name="firstName" type="text" component={renderField} label="First Name"/>
        </Col>
        <Col sm={6} md={6} >
          <Field name="surname" type="text" component={renderField} label="Surname"/>
        </Col>
        <Col sm={12} md={12} >
          <Field name="email" type="email" component={renderField} label="Email"/>
        </Col>
        <Col sm={6} md={6} >
        <Field name="dob" type="number" component={renderDateInputField} label="Date of birth"/>
        </Col>
        <Col sm={6} md={6} >
        <Field name="postcode" type="text" component={renderField} label="Postcode"/>
        </Col>
        <Col className="form-group" sm={12} md={12} >
          <div>
            {radioLabel}
          </div>
          <Col sm={12} md={12} className="row radioButtons" >
          <label>
            <Field name="apprenticeship" component="input" type="radio" value="Yes"/>{' '} Yes
          </label>
          <label>
            <Field name="apprenticeship" component="input" type="radio" value="No" />{' '} No
          </label>
          <label>
            <Field name="apprenticeship" component="input" type="radio" value="Undecided" />{' '} Undecided
          </label>
          </Col>
        </Col>
        <Col sm={12} md={12} id="consent-area" >
          <Field className="consentField" name="consent" component={renderCheckboxField} label={agreement} type="checkbox"/>
        </Col>
        <Col sm={12} md={12}>
          <Button type="submit" className="submitButton" disabled={submitting} bsStyle="primary" bsSize="large" active>Submit</Button>
        </Col>
      </form>
      )
}
}

export default reduxForm({
  form: 'syncValidation',
  validate,
  warn
})(SyncValidationForm)
