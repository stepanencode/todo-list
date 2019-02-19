import React, { Component } from 'react';
import { Field, reduxForm, Form, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import {
  LoginBackground,
  Svg,
  Label,
  FormStyle,
  Input,
  LogInWrapper,
  LogInHeader,
  LogInButton,
  InputWrapper,
  ErrorWrapper
} from "./styles"


const validate = values => {
  const errors = {}
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

  return errors
}


class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPassword: false,
    };
  }

  handleClickPassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword
    });
  };

  emailField = ({ input, type, autoFocus, meta: { touched, error, warning } }) => (
    <span>
    {
      (input.value.length > 0  &&  (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.value))) ?
       <Input {...input} placeholder={"email address"} type={type} maxLength={50} error/> :
       <Input {...input} placeholder={"email address"} type={type} maxLength={50} autoFocus={autoFocus}/>
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

  render() {
    const {handleSubmit, submitting, pristine, passwordValue} = this.props;
    const submit = (values) => console.log(values);

    return(
      <LoginBackground>
      <FormStyle>
        <Form onSubmit={handleSubmit(submit)}>
          <LogInHeader>Log In to Your Account</LogInHeader>

          <LogInWrapper>
            <InputWrapper>
            <Label>
              <Svg src={require(`!raw-loader!../../../icons/envelope.svg`)} raw={true}/>
              <Field name="email" type="email" id="email" component={this.emailField} autoFocus={true}/>
            </Label>
            </InputWrapper>

            <InputWrapper>
              <Label>
                <Svg src={require(`!raw-loader!../../../icons/key.svg`)} raw={true}/>
               {
                  (this.state.isShowPassword) ?
                  <Field name="password" type="text" id="password" component={this.passwordField} /> :
                  <Field name="password" type="password" id="password" component={this.passwordField} />
                }
                {
                  ((passwordValue && passwordValue.length > 0)) ?
                  <div>
                  {/*{passwordValue}*/}
                    {
                      (this.state.isShowPassword) ?
                      <Svg right='true' src={require(`!raw-loader!../../../icons/show-password-monkey.svg`)} raw={true} onMouseUp={this.handleClickPassword} /> :
                      <Svg right='true' src={require(`!raw-loader!../../../icons/hide-password-monkey.svg`)} raw={true} onMouseDown={this.handleClickPassword} />
                    }
                  </div> :
                  null
                }
              </Label>
            </InputWrapper>
          </LogInWrapper>
          <LogInButton type="submit" disabled={pristine || submitting}>Log In</LogInButton>
        </Form>
        </FormStyle>
      </LoginBackground>
    );
  }
}
LogInForm = reduxForm({
    form: 'login',
    validate,
})(LogInForm);

const selector = formValueSelector('login')
LogInForm= connect(
  state => {
    const passwordValue = selector(state, 'password');

    return {
      passwordValue,

    }
  }
)(LogInForm)


export default LogInForm;
