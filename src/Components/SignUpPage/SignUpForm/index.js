import React, { Component } from "react";
import { Field, reduxForm, Form, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import {
  SignupBackground,
  Svg,
  Label,
  FormStyle,
  Input,
  SignUpWrapper,
  SignUpHeader,
  SignUpButton,
  InputWrapper,
  ErrorWrapper
} from "./styles";

const validate = values => {
  const errors = {}
  if (!values.fullname) {
    errors.fullname = "This field is required";
  } else if (values.fullname.length < 2) {
    errors.fullname = "Minimum be 2 characters or more";
  }
  if (!values.email) {
    errors.email = "This field is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "This field is required";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(values.password)) {
    errors.password = "Minimum 8 characters, at least one letter, one number and one special character";
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Incorrect password";
  }
  return errors;
}

class SignUpForm extends Component {
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
  };

  handleClickConfirmPassword = () => {
    this.setState({
      isShowConfirmPassword: !this.state.isShowConfirmPassword
    });
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
    /* eslint-disable quotes */
    return (
      <SignupBackground>
        <FormStyle>
          <Form onSubmit={handleSubmit(submit)}>
            <SignUpHeader>Sign Up to Your Account</SignUpHeader>
            <SignUpWrapper>
              <InputWrapper>
                <Label>
                  <Svg src={require(`!raw-loader!../../../icons/user.svg`)} raw={true}/>
                  <Field name="fullname" type="text" id="fullname" component={this.nameField} autoFocus={true} />
                </Label>
              </InputWrapper>
              <InputWrapper>
                <Label>
                  <Svg src={require(`!raw-loader!../../../icons/envelope.svg`)} raw={true}/>
                  <Field name="email" type="email" id="email" component={this.emailField}/>
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
              <InputWrapper>
                <Label>
                  <Svg src={require(`!raw-loader!../../../icons/padlock.svg`)} raw={true}/>
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
                            <Svg right='true' src={require(`!raw-loader!../../../icons/show-password-monkey.svg`)} raw={true} onMouseUp={this.handleClickConfirmPassword} /> :
                            <Svg right='true' src={require(`!raw-loader!../../../icons/hide-password-monkey.svg`)} raw={true} onMouseDown={this.handleClickConfirmPassword} />
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
    /* eslint-disable quotes */
  }
}

SignUpForm = reduxForm({
  form: "signup",
  validate,
})(SignUpForm);

const selector = formValueSelector("signup")
SignUpForm = connect(
  state => {
    const passwordValue = selector(state, "password");
    const confirmPasswordValue = selector(state, "confirmPassword");
    return {
      passwordValue,
      confirmPasswordValue
    };
  }
)(SignUpForm)

export default SignUpForm;
