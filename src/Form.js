import React, { Component } from 'react';
import styled, { css }  from "styled-components";
import Gugi from "./fonts/Gugi-Regular.ttf";
import InlineSVG from "svg-inline-react";
import { Field, reduxForm } from 'redux-form';
import { keyframes } from "styled-components";

const Svg = styled(InlineSVG)`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
`;

const Label = styled.label`
  position: relative;
`;

const FormStyle = styled.form`
  font-family: sans-serif;
  background-color: #faf3cf;
  color: #000080;
  border-style: none;
  width: 550px;
  height: 500px;
  border-radius: 8px;
  font-size: 22px;
  margin: 0 auto;
`;

const borderAnimation = keyframes`
from {border-bottom: 2px solid  #dcd8c8;}

to {border-bottom: 2px solid  #025278;}
`;

const Input = styled.input `
  background-color: #faf3cf;
  padding: 15px 60px;
  width: 530px;
  margin-left: 10px;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid  #dcd8c8;
  box-sizing: border-box;

  &:focus{animation: ${borderAnimation} 2s 1 forwards;}

  &:invalid {
  box-shadow: none;
}

  ${props => props.error && css`
    &:focus{animation: ${borderAnimation} 0s ;}
    border-bottom: 2px solid  red;
  `}

`;



const SignUpWrapper = styled.div `
  margin: 0 auto;
  width: 100%;
`;

const SignUpHeader = styled.h3 `
  padding-top: 20px;
  padding-bottom: 10px;
  font-family: 'Gugi';
  src: url(${Gugi});
  text-align: center;
  font-size: 40px;
  margin-bottom: 20px;
  color: #025278;
`;

const SignUpButton = styled.button `
  border: none;
  background-color: #025278;
  color: #faf3cf;
  margin-left: 25px;
  margin-top: 40px;
  border-radius: 3px;
  padding: 0.25em 1em;
  width: 500px;
  font-size: 30px;
    &:hover  {
      border: 2px solid #c9d7d8;
    }
`;
const InputWrapper = styled.div `
  margin: 0 auto;
  width: 100%;
`;

const ErrorWrapper = styled.div `
  padding-left: 70px;
  padding-top: 5px;
  font-size: 14px;
`;

const validate = values => {
    const errors = {}
    if (!values.fullname) {
      errors.fullname = 'This field is required'
    } else if (values.fullname.length < 2) {
      errors.fullname = 'Minimum be 2 characters or more'
    }
    if (!values.email) {
      errors.email = 'This field is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.password) {
      errors.password = 'This field is required'
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(values.password)) {
      errors.password = 'Minimum 8 characters, at least one letter, one number and one special character'
    }
    if (values.confirm_password !== values.password) {
      errors.confirm_password = 'Incorrect password'
    }
    return errors
  }


class Form extends Component {

  nameField = ({ input, type, autoFocus, meta: { touched, error, warning } }) => (
    <span>
      {
        (input.value.length === 0  ||  input.value.length >= 2) ?
         <Input {...input} placeholder={"full name"} type={type} maxLength={50} autoFocus={autoFocus} /> :
         <Input {...input} placeholder={"full name"} type={type} maxLength={50} error/>
      }
      {
        touched && ((error && <ErrorWrapper>{error}</ErrorWrapper>) || (warning && <ErrorWrapper>{warning}</ErrorWrapper>))
      }
    </span>
  );

  emailField = ({ input, type, meta: { touched, error, warning } }) => (
    <span>
    {
      (input.value.length > 0  &&  (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.value))) ?
       <Input {...input} placeholder={"email address"} type={type} maxLength={50} error /> :
       <Input {...input} placeholder={"email address"} type={type} maxLength={50} />
    }
    {
      touched && ((error && <ErrorWrapper>{error}</ErrorWrapper>) || (warning && <ErrorWrapper>{warning}</ErrorWrapper>))
    }
    </span>
  );

  passwordField = ({ input, type, meta: { touched, error, warning } }) => (
    <span>
      {
        (input.value.length > 0  &&  (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(input.value))) ?
        <Input {...input} placeholder={"password"} type={type} maxLength={50}  error /> :
        <Input {...input} placeholder={"password"} type={type} maxLength={50} />
      }
      {
        touched && ((error && <ErrorWrapper>{error}</ErrorWrapper>) || (warning && <ErrorWrapper>{warning}</ErrorWrapper>))
      }
    </span>
  );

  confirmPasswordField = ({ input, type, meta: { touched, error, warning } }) => (
    <span>
      <Input {...input} placeholder={"repeat your password"} type={type} maxLength={50} />
      {
        touched && ((error && <ErrorWrapper>{error}</ErrorWrapper>) || (warning && <ErrorWrapper>{warning}</ErrorWrapper>))
      }
    </span>
  );

    render() {
        const {handleSubmit, submitting} = this.props;
        const submit = (values) => console.log(values);

        return (
            <FormStyle onSubmit={handleSubmit(submit)}>
              <SignUpHeader>Sign Up to Your Account</SignUpHeader>
              <SignUpWrapper>
                <InputWrapper>
                  <Label>
                    <Svg src={require(`!raw-loader!./icons/user.svg`)} raw={true}/>
                    <Field name="fullname" type="text" id="fullname" component={this.nameField} autoFocus={true} />
                  </Label>
                </InputWrapper>

                <InputWrapper>
                  <Label>
                    <Svg src={require(`!raw-loader!./icons/envelope.svg`)} raw={true}/>
                    <Field name="email" type="email" id="email" component={this.emailField}/>
                  </Label>
               </InputWrapper>

               <InputWrapper>
                 <Label>
                   <Svg src={require(`!raw-loader!./icons/key.svg`)} raw={true}/>
                   <Field name="password" type="password" id="password" component={this.passwordField}/>

                 </Label>
               </InputWrapper>

               <InputWrapper>
                 <Label>
                   <Svg src={require(`!raw-loader!./icons/padlock.svg`)} raw={true}/>
                   <Field name="confirm_password" type="password" id="confirm-password" component={this.confirmPasswordField} />
                 </Label>
                </InputWrapper>
              </SignUpWrapper>
              <SignUpButton type="submit" disabled={submitting}>Sign Up</SignUpButton>
            </FormStyle>
        );
    }
}
Form = reduxForm({
    form: 'signup',
    validate, // имя формы в state (state.form.signup)
})(Form);

export default Form;