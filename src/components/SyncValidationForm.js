import React from 'react'
import axios from 'axios';
import { Field, reduxForm } from 'redux-form'

import {Button, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Panel, HelpBlock} from 'react-bootstrap'

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

    const { handleSubmit, pristine, reset, submitting } = this.props

    const submit = (values) =>{
      console.log(values.firstName, values.email)
      let comment = values
      axios.post(this.props.url, comment)
        .then(res => {
        this.setState({ data: res });
      })
      .catch(err => {
      console.error(err);
    });
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
