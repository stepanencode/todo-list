import React, { Component } from "react";
import { connect } from "react-redux";
import UserBirthday from "../UserBirthday/index";
import { Field, reduxForm, formValueSelector } from "redux-form";
import normalizePhone from "./normalizePhone";
import {
  Svg,
  UserBackground,
  UserInfoWrapper,
  UserInfo,
  AvatarsWrapper,
  AvatarContainer,
  AvatarHeader,
  PersonalInfoWrapper,
  UserName,
  UserMail,
  UserPhone,
  UserChangePassword,
  UserChangePasswordBtn,
  AvatarSaveBtn,
  Input,
  UserInfoText,
  Label,
  RadioButton
} from "./styles";


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditPhone: false,
      selectedOption: "woman"
    };
  }

  handleEditPhone = () => {
    this.setState({
      isEditPhone: true
    });
  };

  handleSavePhone = () => {
    this.setState({
      isEditPhone: false
    });
  };

  PhoneField = ({ input, type, autoFocus, meta: { touched, error, warning } }) => (
    <span>
      <Input {...input} placeholder={"phone number"} type={type} />
    </span>
  );
  handleOptionChange = event => {
    this.setState({
      selectedOption: event.target.value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("You have submitted:", this.state.selectedOption);
};

  render() {
    const {handleSubmit, inputValue} = this.props;
    return (
      <UserBackground>
        <UserInfoWrapper>
          <UserInfo>
            <AvatarsWrapper>
              <form onSubmit={this.handleFormSubmit}>
                <AvatarHeader>Choose your avatar:</AvatarHeader >
                <AvatarContainer>
                  <RadioButton type="radio" name="avatar" value="woman" id="1" checked={this.state.selectedOption === "woman"} onChange={this.handleOptionChange}/>
                  <Label htmlFor="1">
                    <Svg src={require(`!raw-loader!../../../icons/woman.svg`)} raw={true}/>
                  </Label>
                </AvatarContainer>
                <AvatarContainer>
                  <RadioButton type="radio" name="avatar" value="pilot" id="2" checked={this.state.selectedOption === "pilot"} onChange={this.handleOptionChange}/>
                  <Label htmlFor="2">
                    <Svg src={require(`!raw-loader!../../../icons/pilot.svg`)} raw={true}/>
                  </Label>
                </AvatarContainer>
                <AvatarContainer>
                  <RadioButton type="radio" name="avatar" value="squirrel" id="3" checked={this.state.selectedOption === "squirrel"} onChange={this.handleOptionChange}/>
                  <Label htmlFor="3">
                    <Svg src={require(`!raw-loader!../../../icons/squirrel.svg`)} raw={true}/>
                  </Label>
                </AvatarContainer>
                <AvatarContainer>
                  <RadioButton type="radio" name="avatar" value="husky" id="4" checked={this.state.selectedOption === "husky"} onChange={this.handleOptionChange}/>
                  <Label htmlFor="4">
                    <Svg src={require(`!raw-loader!../../../icons/husky.svg`)} raw={true}/>
                  </Label>
                </AvatarContainer>
                <AvatarContainer>
                  <RadioButton type="radio" name="avatar" value="mermaid" id="5" checked={this.state.selectedOption === "mermaid"} onChange={this.handleOptionChange}/>
                  <Label htmlFor="5">
                    <Svg src={require(`!raw-loader!../../../icons/mermaid.svg`)} raw={true}/>
                  </Label>
                </AvatarContainer>
                <AvatarContainer>
                  <RadioButton type="radio" name="avatar" value="worker" id="6" checked={this.state.selectedOption === "worker"} onChange={this.handleOptionChange}/>
                  <Label htmlFor="6">
                    <Svg src={require(`!raw-loader!../../../icons/worker.svg`)} raw={true}/>
                  </Label>
                </AvatarContainer>
                <AvatarContainer>
                  <RadioButton type="radio" name="avatar" value="monkey" id="7" checked={this.state.selectedOption === "monkey"} onChange={this.handleOptionChange}/>
                  <Label htmlFor="7">
                    <Svg src={require(`!raw-loader!../../../icons/monkey.svg`)} raw={true}/>
                  </Label>
                </AvatarContainer>
                <AvatarContainer>
                  <RadioButton type="radio" name="avatar" value="kitten" id="8" checked={this.state.selectedOption === "kitten"} onChange={this.handleOptionChange}/>
                  <Label htmlFor="8">
                    <Svg src={require(`!raw-loader!../../../icons/kitten.svg`)} raw={true}/>
                  </Label>
                </AvatarContainer>
                <AvatarContainer>
                  <RadioButton type="radio" name="avatar" value="blonde" id="9" checked={this.state.selectedOption === "blonde"} onChange={this.handleOptionChange}/>
                  <Label htmlFor="9">
                    <Svg src={require(`!raw-loader!../../../icons/blonde.svg`)} raw={true}/>
                  </Label>
                </AvatarContainer>
                <AvatarContainer>
                  <RadioButton type="radio" name="avatar" value="hipster" id="10" checked={this.state.selectedOption === "hipster"} onChange={this.handleOptionChange}/>
                  <Label htmlFor="10">
                    <Svg src={require(`!raw-loader!../../../icons/hipster.svg`)} raw={true}/>
                  </Label>
                </AvatarContainer>
                <AvatarContainer>
                  <RadioButton type="radio" name="avatar" value="robot" id="11" checked={this.state.selectedOption === "robot"} onChange={this.handleOptionChange}/>
                  <Label htmlFor="11">
                    <Svg src={require(`!raw-loader!../../../icons/robot.svg`)} raw={true}/>
                  </Label>
                </AvatarContainer>
                <AvatarContainer>
                  <RadioButton type="radio" name="avatar" value="penguin" id="12" checked={this.state.selectedOption === "penguin"} onChange={this.handleOptionChange}/>
                  <Label htmlFor="12">
                    <Svg src={require(`!raw-loader!../../../icons/penguin.svg`)} raw={true}/>
                  </Label>
                </AvatarContainer>
                <AvatarSaveBtn type="submit">Save</AvatarSaveBtn>
              </form>
            </AvatarsWrapper>
            <PersonalInfoWrapper>
              <UserName>
                <p>Name:</p>
                <UserInfoText>Oksana Stepanenko</UserInfoText>
              </UserName>
              <UserMail>
                <p>Mail:</p>
                <UserInfoText>stepanencode@gmail.com</UserInfoText>
              </UserMail>
              <UserBirthday></UserBirthday>

              {
                this.state.isEditPhone ?
                  <UserPhone>
                    <p>Phone:</p>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <div>
                          <Field
                            name="phone"
                            component={this.PhoneField}
                            id="phone"
                            type="text"
                            normalize={normalizePhone}
                          />
                        </div>
                      </div>
                    </form>
                    <Svg src={require(`!raw-loader!../../../icons/save.svg`)} save raw={true} onClick={this.handleSavePhone}/>
                  </UserPhone> :
                  <UserPhone>
                    <p>Phone:</p>
                    {
                      ((inputValue && inputValue.length > 0)) ?
                        <UserInfoText>{inputValue}</UserInfoText> :
                        <UserInfoText>Please, enter your phone</UserInfoText>
                    }
                    <Svg src={require(`!raw-loader!../../../icons/edit.svg`)} edit="true" raw={true} onClick={this.handleEditPhone}
                    />
                  </UserPhone>
              }
              <UserChangePassword>
                <p>Password:</p>
                <UserChangePasswordBtn>{`Change password`}</UserChangePasswordBtn>
              </UserChangePassword>
            </PersonalInfoWrapper>
          </UserInfo>
        </UserInfoWrapper>
      </UserBackground>
    );
  }
}

User = reduxForm({
  form: "user",
})(User);

const selector = formValueSelector("user")
User = connect(
  state => {
    const inputValue = selector(state, "phone");
    return {
      inputValue
    };
  }
)(User);

export default User;
