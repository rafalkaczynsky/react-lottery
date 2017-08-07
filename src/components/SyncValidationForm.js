import React from 'react'
import axios from 'axios';
import { Field, reduxForm } from 'redux-form'

import {Button, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Panel, HelpBlock} from 'react-bootstrap'

function readJSON(file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status == 200)
        return request.responseText;
};



// var query = { name: 'blablabla' }
// Model.update( query, { name: ' fewfewfew'}, option, callback)

// Model.findOne({ name: ' borne'}, function(err, doc){
//   doc.name = 'bkdsjkdasd'
//   doc.save()
//})

var vaucherJSON = JSON.parse(readJSON('http://localhost:3001/api/codes'));
var usersJSON = JSON.parse(readJSON('http://localhost:3001/api/users'));

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

function loadCommentsFromServer() {
    axios.get(this.props.url)
        .then(res => {
        this.setState({ data: res.data });
    })
 }

//replace the filler with:
function handleCommentSubmit(comment) {
 axios.post(this.props.url, comment)
 .then(res => {
 this.setState({ data: res });
 })
 .catch(err => {
 console.error(err);
 });
}


/*
 componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
 }
*/

class SyncValidationForm extends React.Component {

  render(){

    const { handleSubmit, pristine, reset, submitting, onSubmitForm } = this.props
    const submit = (values) =>{
 
      usersJSON.map((item ,indx)=> {
        if (item.email === values.email) {

          let header = 'This Email already exist'
          let paragraph = 'We are very sorry but you can play with us just one time'
           onSubmitForm(true, header, paragraph)
        } else if ((indx === (usersJSON.length-1)) && (item.email !== values.email)) {
            let user = values
            let randumNumber = Math.floor((Math.random() * 1000))
            let randomCode = vaucherJSON[randumNumber].code 
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

    return (
      <form onSubmit={handleSubmit(submit)}>
        <Field name="firstName" type="text" component={renderField} label="FirstName"/>
        <Field name="surname" type="text" component={renderField} label="Surname"/>
        <Field name="email" type="email" component={renderField} label="Email"/>
        <Field name="age" type="number" component={renderField} label="Age"/>
        <Panel>
          Some text , and more Lorem ipsum .Some text , and more Lorem ipsum Some text , and more Lorem ipsum  Some text , and more Lorem ipsum  Some text , and more Lorem ipsum  Some text , and more Lorem ipsum
          <Checkbox>I Agree</Checkbox>
        </Panel>
        <div>
          <Button type="submit" className="submitButton" disabled={submitting}  bsSize="large" active>Submit</Button>
        </div>
      </form>
  )
}
}

//renderTextField

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

export default reduxForm({
  form: 'syncValidation', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn // <--- warning function given to redux-form
})(SyncValidationForm)