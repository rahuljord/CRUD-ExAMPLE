import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import _ from 'underscore'



 
const StreamFormDms = (props) => {
const [division, setDivision] = useState([])
const fetchDivisionApi = async () => {
  const resp = await axios.get(
    "http://hyddevsrv/GlobalServices/api/Divisions/GetDivisions"
  );
  // console.log(`resp`, resp.data)
  setDivision(resp.data);
  // console.log(`resp`, resp.data);
};
useEffect(()=>{
  fetchDivisionApi()
}, [])


const divisonFilter = _.map(division, function(item){
  return { label : item.code, value : item.name }
})

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
 
  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const DropdownAdapter = ({ input, ...rest }) => (
    
    <Dropdown {...input} {...rest} />
  );

  // const DropdownAdapter = (props) =>{
  //   console.log(`props`, props.input)
    
  // }
 
  const onSubmit = (formValues) => {
    // props.onSubmit(formValues);
    console.log(`formValues`, formValues)
  };
 
  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={(formValues) => {
        const errors = {};

        if (!formValues.title) {
          errors.title = "You must enter a title";
        }

        if (!formValues.description) {
          errors.description = "You must enter a description";
        }

        return errors;
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="ui form error">
          <Field name="title" component={renderInput} label="Enter Title" />
          <Field
            name="description"
            component={renderInput}
            label="Enter Description"
          />
          <Field
            name="state"
            component={DropdownAdapter}
            options={divisonFilter}
            placeholder="Select divison:"
          />
          <button className="ui button primary">Submit</button>
        </form>
      )}
    />
  );
};
 
export default StreamFormDms;