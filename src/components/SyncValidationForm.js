import React from 'react'
import axios from 'axios';
import { Field, reduxForm } from 'redux-form'

import {Button, FormGroup, Col, ControlLabel, FormControl, Checkbox, HelpBlock, PageHeader} from 'react-bootstrap'

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

// var query = { name: 'blablabla' }
// Model.update( query, { name: ' fewfewfew'}, option, callback)

// Model.findOne({ name: ' borne'}, function(err, doc){
//   doc.name = 'bkdsjkdasd'
//   doc.save()
//})

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
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }

  if (!values.postcode) {
    errors.postcode = 'Required'
  } else if (!/^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i.test(values.postcode)) {
    errors.postcode = 'Invalid Postcode'
  }


  if (!values.consent) {
    errors.consent= 'Required'
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



class SyncValidationForm extends React.Component {

  render(){

    const { handleSubmit, submitting, onSubmitForm } = this.props


    const submit = (values) =>  {

      usersJSON.map((item ,indx)=> {
        if (item.email === values.email) {

          let header = 'Oops, looks like you have already subscribed'
          let paragraph = 'We are very sorry but you can only play this once'
           onSubmitForm(true, header, paragraph)
        } else if ((indx === (usersJSON.length -1)) && (item.email !== values.email)) {
            let user = values
            //let newItem = false;
            //let randumNumber = Math.floor((Math.random() * 1000))
            let randomCode = setUnique(vaucherJSON);

            user.userCode = randomCode
              // user.userCode = "P47E-Xknk"
            axios.post(this.props.url, user)
            .then(res => {

                let header = 'Form submitted successfully!'
                let paragraph = "Email with Voucher Code has been sent to " + values.email + ". Check your email and good luck!!!"
                 onSubmitForm(true, header, paragraph)
            })
            .catch(err => {
              console.error(err);
            });
            }
        })
    }
    const agreement = 'I consent to receiving updates from Kaplan. I understand that Kaplan will never sell my data and I consent to it being shared with selected third parties for the purposes of performing business services only. Please see our Privacy Policy for further details on how we handle your data. *'
    return (
      <form className="formContainer" onSubmit={handleSubmit(submit)}>
        <Col sm={12} md={12} >
          <PageHeader>Kaplan Newsletter <br/> <small>Subscribe to be entered into our prize draw</small></PageHeader>
        </Col>
        <Col sm={6} md={6} >
          <Field name="firstName" type="text" component={renderField} label="FirstName"/>
        </Col>
        <Col sm={6} md={6} >
          <Field name="surname" type="text" component={renderField} label="Surname"/>
        </Col>
        <Col sm={12} md={12} >
          <Field name="email" type="email" component={renderField} label="Email"/>
        </Col>
        <Col sm={6} md={6} >
        <Field name="age" type="number" component={renderField} label="Age"/>
        </Col>
        <Col sm={6} md={6} >
        <Field name="postcode" type="text" component={renderField} label="Postcode"/>
        </Col>
        <Col sm={12} md={12} >

          <Field className="consentField" name="consent" component={renderCheckboxField} label={agreement} type="checkbox"/>
        </Col>
        <div>
          <Button type="submit" className="submitButton" disabled={submitting} bsStyle="primary" bsSize="large" active>Submit</Button>
        </div>
      </form>
  )
}
}

export default reduxForm({
  form: 'syncValidation', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn // <--- warning function given to redux-form
})(SyncValidationForm)
