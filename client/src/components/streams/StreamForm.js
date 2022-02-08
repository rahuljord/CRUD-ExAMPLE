import React from 'react';
import { Field , reduxForm } from 'redux-form'
 
class StreamForm extends React.Component {

  renderError({ error , touched }) {
    if ( touched && error ) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      )
    }
  }


  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : '' }`;
    return (
      <div className={className}>
        <label>{label}</label>
      <input {...input} autoComplete='off' />
      {this.renderError(meta)}
      {/* <label>{meta.error}</label> */}
      </div>

      // <input 
      // onChange={formProps.input.onChange}
      // value={formProps.input.value}
      // />
    )
  }
  onSubmit = (formValues) => {
    // console.log(`formValues`, formValues)
    // console.log('propsform', this.props);
    this.props.onSubmit(formValues);

  }

  render() {
   
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter description" />
        <button className='ui button primary'>submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
const errors = {};
if(!formValues.title){
  errors.title = "you must enter a title";
}
if(!formValues.description){
  errors.description = "you must enter a description"
}

 return errors;
}

export default  reduxForm({
  form : 'streamForm',
  validate : validate
})(StreamForm);
