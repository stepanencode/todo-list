import React, { Component } from 'react';
import styled, { css }  from "styled-components";
import Gugi from "./fonts/Gugi-Regular.ttf";
import InlineSVG from "svg-inline-react";
import { Field, reduxForm, Form, formValueSelector } from 'redux-form';
import { keyframes } from "styled-components";
import img from "./signup-background.jpeg";
import woman from "./woman.svg";
import man from "./man.png";
import { connect } from 'react-redux'

const SignupBackground = styled.div`
  overflow: hidden;
  min-height: 100vh;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  z-index: 1;
    &:before {
     content: url(${img});
     z-index:-1;
     position: absolute;
     top: 0;
     left: 0;
     opacity: 0.8;
   }
`;

const Svg = styled(InlineSVG)`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);

  ${props => props.right && css`
    position: absolute;
    top: 50%;
    left: 495px;
    transform: translateY(-50%);
  `}

  ${props => props.none && css`
    display: none;
  `}
`;

const Label = styled.label`
  position: relative;

  ${props => props.male && css`
    width: 60px;
    height: 60px;
    background: blue;
    display: inline-block;
    background: url(${man});
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    margin-top: 5px;
    margin-left: 10px;
  `}

  ${props => props.female && css`
    width: 60px;
    height: 60px;
    background: url(${woman});
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    margin-top: 5px;
    margin-left: 10px;
  `}
`;

const FormStyle = styled.div`
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
    border-bottom: 2px solid  #FF6347;
  `}

  ${props => props.radio && css`
    opacity: 0.3;
    width: 5px;
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
    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Incorrect password'
    }
    return errors
  }


class ReduxForm extends Component {

  constructor(props) {
  super(props);
  this.state = {
    isShowPassword: false,
    isShowConfirmPassword: false
  };
}

handleClickPassword = () => {
  this.setState({
    isShowPassword: !this.state.isShowPassword
  });
  console.log("click")
};

handleClickConfirmPassword = () => {
  this.setState({
    isShowConfirmPassword: !this.state.isShowConfirmPassword
  });
  console.log("click")
};

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

  genderField = ({ input, type }) => (
    <span>
      <Input {...input}  type={type} radio />
    </span>
  )

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
        (input.value.length > 0  &&  (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(input.value)) ) ?
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
    {
      (input.value.length > 0  &&  (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(input.value)) ) ?
      <Input {...input} placeholder={"repeat your password"} type={type} maxLength={50} error /> :
      <Input {...input} placeholder={"repeat your password"} type={type} maxLength={50} />
    }

      {
        touched && ((error && <ErrorWrapper>{error}</ErrorWrapper>) || (warning && <ErrorWrapper>{warning}</ErrorWrapper>))
      }
    </span>
  );

    render() {
        const {handleSubmit, submitting, pristine, passwordValue, confirmPasswordValue} = this.props;
        const submit = (values) => console.log(values);

        return (
          <SignupBackground>
            <FormStyle>
            <Form onSubmit={handleSubmit(submit)}>
              <SignUpHeader>Sign Up to Your Account</SignUpHeader>
              <SignUpWrapper>
                <InputWrapper>
                  <Label>
                    <Svg src={require(`!raw-loader!./icons/user.svg`)} raw={true}/>
                    <Field name="fullname" type="text" id="fullname" component={this.nameField} autoFocus={true} />
                  </Label>
                </InputWrapper>

                <div>

          <Label male><Field name="gender" component={this.genderField} type="radio" value="male"/></Label>
          <Label female><Field name="gender" component={this.genderField} type="radio" value="female"/></Label>
        </div>




                <InputWrapper>
                  <Label>
                    <Svg src={require(`!raw-loader!./icons/envelope.svg`)} raw={true}/>
                    <Field name="email" type="email" id="email" component={this.emailField}/>
                  </Label>
               </InputWrapper>

               <InputWrapper>
                 <Label>
                   <Svg src={require(`!raw-loader!./icons/key.svg`)} raw={true}/>
                  {
                     (this.state.isShowPassword) ?
                     <Field name="password" type="text" id="password" component={this.passwordField} /> :
                     <Field name="password" type="password" id="password" component={this.passwordField} />
                   }
                   {
                     ((passwordValue && passwordValue.length > 0)) ?
                     <div>
                       {
                         (this.state.isShowPassword) ?
                         <Svg right='true' src={require(`!raw-loader!./icons/show-password-monkey.svg`)} raw={true} onMouseUp={this.handleClickPassword} /> :
                         <Svg right='true' src={require(`!raw-loader!./icons/hide-password-monkey.svg`)} raw={true} onMouseDown={this.handleClickPassword} />
                       }
                     </div> :
                     null
                   }
                 </Label>
               </InputWrapper>

               <InputWrapper>
                 <Label>
                 <Svg src={require(`!raw-loader!./icons/padlock.svg`)} raw={true}/>
                 {
                    (this.state.isShowConfirmPassword) ?
                    <Field name="confirmPassword" type="text" id="confirm-password" component={this.confirmPasswordField} /> :
                    <Field name="confirmPassword" type="password" id="confirm-password" component={this.confirmPasswordField} />
                  }
                  {
                    ((confirmPasswordValue && confirmPasswordValue.length > 0)) ?
                    <div>
                      {
                        (this.state.isShowConfirmPassword) ?
                        <Svg right='true' src={require(`!raw-loader!./icons/show-password-monkey.svg`)} raw={true} onMouseUp={this.handleClickConfirmPassword} /> :
                        <Svg right='true' src={require(`!raw-loader!./icons/hide-password-monkey.svg`)} raw={true} onMouseDown={this.handleClickConfirmPassword} />
                      }
                    </div> :
                    null
                  }
                 </Label>
                </InputWrapper>

              </SignUpWrapper>
              <SignUpButton type="submit" disabled={pristine || submitting}>Sign Up</SignUpButton>
              </Form>
            </FormStyle>
            </SignupBackground>
        );
    }
}
ReduxForm = reduxForm({
    form: 'signup',
    validate, // имя формы в state (state.form.signup)
})(ReduxForm);

const selector = formValueSelector('signup') // <-- same as form name
ReduxForm = connect(
  state => {
    // can select values individually
    const passwordValue = selector(state, 'password');
    const confirmPasswordValue = selector(state, 'confirmPassword');
    return {
      passwordValue,
      confirmPasswordValue
    }
  }
)(ReduxForm)


export default ReduxForm;
