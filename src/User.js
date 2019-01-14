import React, { Component } from 'react';
import styled, { css }  from "styled-components";
import Gugi from "./fonts/Gugi-Regular.ttf";
import img from "./user-background.jpeg";
import InlineSVG from "svg-inline-react";
import { connect } from 'react-redux'
import UserBirthday from "./UserBirthday";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import normalizePhone from './normalizePhone';

const Svg = styled(InlineSVG)`
width: 110px;
height: 100px;
padding-left: 10px;
  ${props => props.edit && css`
    margin-left: 20px;
    margin-top: 10px;
    width: 1.6em;
    height: 1.6em;
  `}

  ${props => props.save && css`
    margin-left: 20px;
    margin-top: 10px;
    width: 1.6em;
    height: 1.6em;
  `}



`;

const UserBackground = styled.div`
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
     opacity: 0.9;
   }
`;

const UserInfoWrapper = styled.div`
  box-sizing: border-box;
  width: 960px;
  min-width: 500px;
  height: 600px;
  background-color: rgba(222,209,207, .5) ;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 50px;
  padding-top: 30px;
`;

const UserInfo = styled.div`
   width: 900px;
   height: 540px;
   margin: 0 auto;
   border: 2px solid #ded1cf;
   border-radius: 5px;
   clear: both;
`;

const AvatarsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-left: 30px;
  float: left;
  width: 399px;
  height: 500px
  background-color: #e7e8ef;
  border-radius: 5px;

`;

const AvatarContainer = styled.div`
  display: inline-flex;
  width: 130px;
  height: 110px;
  transition: 1s;
  &:hover{
    box-sizing: border-box;
    background: #8bb4e0;
    border-radius: 50em;
    box-shadow:
    0 0 20px rgba(255,255,255,.6),
    inset 0 0 20px rgba(255,255,255,1);
  }
`;

const AvatarHeader = styled.h3`
  font-size: 22px;
  margin: 0;
  padding: 0 60px;
  font-family: 'Gugi';
  src: url(${Gugi});
`;

const PersonalInfoWrapper = styled.div`
position: relative;
  margin-top: 20px;
  margin-right: 30px;
  float: right;
  width: 400px;
  height: 500px
  background-color: #e7e8ef;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled.div`
  display: inline-flex;
  padding-left: 10px;
  font-size: 18px;
  color: #a59390;
  font-family: 'Gugi';
  src: url(${Gugi});
`;

const UserMail = styled.div`
  display: inline-flex;
  padding-left: 10px;
  font-size: 18px;
  color: #a59390;
  font-family: 'Gugi';
  src: url(${Gugi});
`;

const UserPhone = styled.div`
  display: inline-flex;
  padding-left: 10px;
  font-size: 18px;
  color: #a59390;
  font-family: 'Gugi';
  src: url(${Gugi});
`;

const UserChangePassword = styled.div`
  display: inline-flex;
  padding-left: 10px;
  font-size: 18px;
  color: #a59390;
  font-family: 'Gugi';
  src: url(${Gugi});
`;

const UserChangePasswordBtn = styled.button`
  margin-left: 5px;
  font-size: 16px;
  background: #ded1cf;
  color: #5a5858;
  width: 180px;
  height: 30px;
  padding-top: 3px;
  padding-bottom: 3px;
  margin-top: 12px;
  padding-left: 5px;
  border: 2px solid #c7bcba;
  &:hover  {
    color: #ded1cf;
    background: #5a5858;
    border-color: #ded1cf;
  }
`;

const Input = styled.input `
display: block;
  float: right;
  background-color: #faf3cf;
  padding: 3px 5px;
  width: 200px;
  margin-left: 5px;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid  #dcd8c8;
  box-sizing: border-box;
  margin-top: 12px;
`;

const UserInfoText = styled.p`
  color: #5a5858;
  padding-left: 10px;
  margin-top: 20px;
  font-size: 16px;
`;

const Label = styled.label``;

const RadioButton = styled.input`
   [type="radio"]&:checked   {
    position: absolute;
    left: -9999px;
}
   [type="radio"]&:not(checked)  {
    position: absolute;
    left: -9999px;
}

[type="radio"]&:checked  + ${Label}  {
    display: inline-block;
    position: relative;
    cursor: pointer;
}

[type="radio"]&:not(checked)  + ${Label} {
    display: inline-block;
    position: relative;
    cursor: pointer;
}

[type="radio"]&:checked + ${Label}:before  {
    content: "";
    position: absolute;
    left: 10px;
    top: 10px;
    width: 18px;
    height: 18px;
    border: 1px solid #dddddd;
    background-color: #ffffff;
    border-radius: 100%;
  }

  [type="radio"]&:not(checked) + ${Label}:before {
      content: "";
      position: absolute;
      left: 10px;
      top: 10px;
      width: 18px;
      height: 18px;
      border: 1px solid #dddddd;
      background-color: #ffffff;
      border-radius: 100%;
    }

    [type="radio"]&:checked + ${Label}:after  {
    content: "";
    position: absolute;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
    left: 15px;
    top: 15px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: #8bb4e0;
    opacity: 1;
    }

    [type="radio"]&:not(checked) + ${Label}:after {
    content: "";
    position: absolute;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
    left: 15px;
    top: 15px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: #8bb4e0;
    opacity: 0;
}
`;


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditPhone: false,
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


  render() {

    const {handleSubmit, inputValue} = this.props;

      return (
        <UserBackground>
          <UserInfoWrapper>
          <UserInfo>
          <AvatarsWrapper>
          <AvatarHeader>Choose your avatar:</AvatarHeader>
              <AvatarContainer>
                <RadioButton type="radio" name="avatar" value="id-1" id="1"/>
                <Label for="1">
                  <Svg avatar src={require(`!raw-loader!./icons/woman.svg`)} raw={true}/>
                </Label>
              </AvatarContainer>
            <AvatarContainer>
              <RadioButton type="radio" name="avatar" value="id-2" id="2"/>
              <Label for="2">
                <Svg src={require(`!raw-loader!./icons/pilot.svg`)} raw={true}/>
              </Label>
            </AvatarContainer>
            <AvatarContainer>
              <RadioButton type="radio" name="avatar" value="id-3" id="3"/>
              <Label for="3">
                <Svg src={require(`!raw-loader!./icons/squirrel.svg`)} raw={true}/>
              </Label>
            </AvatarContainer>
            <AvatarContainer>
              <RadioButton type="radio" name="avatar" value="id-4" id="4"/>
              <Label for="4">
                <Svg src={require(`!raw-loader!./icons/husky.svg`)} raw={true}/>
              </Label>
              </AvatarContainer>
            <AvatarContainer>
            <RadioButton type="radio" name="avatar"  id="5"/>
            <Label for="5">
              <Svg src={require(`!raw-loader!./icons/mermaid.svg`)} raw={true}/>
            </Label>
            </AvatarContainer>

            <AvatarContainer>
            <RadioButton type="radio" name="avatar" value="id-6" id="6"/>
            <Label for="6">
              <Svg src={require(`!raw-loader!./icons/worker.svg`)} raw={true}/>
            </Label>
            </AvatarContainer>

            <AvatarContainer>
            <RadioButton type="radio" name="avatar" value="id-7" id="7"/>
            <Label for="7">
            <Svg src={require(`!raw-loader!./icons/monkey.svg`)} raw={true}/>
            </Label>
            </AvatarContainer>

            <AvatarContainer>
            <RadioButton type="radio" name="avatar" value="id-8" id="8"/>
            <Label for="8">
            <Svg src={require(`!raw-loader!./icons/kitten.svg`)} raw={true}/>
            </Label>
            </AvatarContainer>

            <AvatarContainer>
            <RadioButton type="radio" name="avatar" value="id-9" id="9"/>
            <Label for="9">
            <Svg src={require(`!raw-loader!./icons/blonde.svg`)} raw={true}/>
            </Label>
            </AvatarContainer>

            <AvatarContainer>
            <RadioButton type="radio" name="avatar" value="id-10" id="10"/>
            <Label for="10">
            <Svg src={require(`!raw-loader!./icons/hipster.svg`)} raw={true}/>
            </Label>
            </AvatarContainer>

            <AvatarContainer>
            <RadioButton type="radio" name="avatar" value="id-11" id="11"/>
            <Label for="11">
            <Svg src={require(`!raw-loader!./icons/robot.svg`)} raw={true}/>
            </Label>
            </AvatarContainer>

            <AvatarContainer>
            <RadioButton type="radio" name="avatar" value="id-12" id="12"/>
            <Label for="12">
            <Svg src={require(`!raw-loader!./icons/penguin.svg`)} raw={true}/>
            </Label>
            </AvatarContainer>

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
              <Svg src={require(`!raw-loader!./icons/save.svg`)} save raw={true} onClick={this.handleSavePhone}/>
            </UserPhone> :

            <UserPhone>
              <p>Phone:</p>
              {
                ((inputValue && inputValue.length > 0)) ?
              <UserInfoText>{inputValue}</UserInfoText> :
                <UserInfoText>Please, enter your phone</UserInfoText>
              }
              <Svg src={require(`!raw-loader!./icons/edit.svg`)} edit raw={true} onClick={this.handleEditPhone}
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
      )
    }
  }

User = reduxForm({
      form: 'user',
  })(User);

  const selector = formValueSelector('user')
  User = connect(
    state => {
      const inputValue = selector(state, 'phone');
      return {
        inputValue
      }
    }
  )(User)

export default User;
