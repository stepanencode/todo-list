import React, { Component } from 'react';
import styled, { css }  from "styled-components";
import Gugi from "./fonts/Gugi-Regular.ttf";
import img from "./user-background.jpeg";
import InlineSVG from "svg-inline-react";
import moment from 'moment'
import Calendar from 'react-calendar';

const Svg = styled(InlineSVG)`
  ${props => props.calendar && css`
    display: block;
  	margin-left: 20px;
  	margin-top: 10px;
  `}
`;

const CalendarWrapper = styled.div`
  ${props => props.show && css`
    display: block;
    position: absolute;
    top: 155px;
    left: 232px;
    }
`}

${props => props.hide && css`
  display: none;
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
  width: 400px;
  height: 500px
  background-color: #e7e8ef;
  border-radius: 5px;
`;

const AvatarContainer = styled.div`
  display: inline-flex;
  width: 110px;
  height: 100px;
  &:hover{
    box-sizing: border-box;
    background: #ded1cf;
    border: 2px solid #c7bcba;
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

const UserInfoText = styled.p`
  color: #5a5858;
  padding-left: 10px;
  margin-top: 20px;
  font-size: 16px;
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

const UserBirthday = styled.div`
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

class User extends Component {
  state = {
    date: new Date(),
    isOpenCalendar: false,
  }

  onChange = date => {
    this.setState({ date });
  }

  onClickDay = date => {
    this.setState({ date });
    console.log(date.toString());
   }

   onClickCalendar = () => {
     this.setState({
       isOpenCalendar: !this.state.isOpenCalendar

     })
      console.log("клац")
   }

  render() {

    const myDay = this.state.date.getDate();
    const myMonth = this.state.date.getMonth() + 1;
    const myYear = this.state.date.getFullYear();

      return (
        <UserBackground>
          <UserInfoWrapper>
          <UserInfo>
          <AvatarsWrapper>
          <AvatarHeader>Choose your avatar:</AvatarHeader>
            <AvatarContainer><Svg src={require(`!raw-loader!./icons/woman.svg`)} raw={true}/></AvatarContainer>
            <AvatarContainer><Svg src={require(`!raw-loader!./icons/pilot.svg`)} raw={true}/></AvatarContainer>
            <AvatarContainer><Svg src={require(`!raw-loader!./icons/squirrel.svg`)} raw={true}/></AvatarContainer>
            <AvatarContainer><Svg src={require(`!raw-loader!./icons/husky.svg`)} raw={true}/></AvatarContainer>
            <AvatarContainer><Svg src={require(`!raw-loader!./icons/mermaid.svg`)} raw={true}/></AvatarContainer>
            <AvatarContainer><Svg src={require(`!raw-loader!./icons/worker.svg`)} raw={true}/></AvatarContainer>
            <AvatarContainer><Svg src={require(`!raw-loader!./icons/monkey.svg`)} raw={true}/></AvatarContainer>
            <AvatarContainer><Svg src={require(`!raw-loader!./icons/kitten.svg`)} raw={true}/></AvatarContainer>
            <AvatarContainer><Svg src={require(`!raw-loader!./icons/blonde.svg`)} raw={true}/></AvatarContainer>
            <AvatarContainer><Svg src={require(`!raw-loader!./icons/hipster.svg`)} raw={true}/></AvatarContainer>
            <AvatarContainer><Svg src={require(`!raw-loader!./icons/robot.svg`)} raw={true}/></AvatarContainer>
            <AvatarContainer><Svg src={require(`!raw-loader!./icons/penguin.svg`)} raw={true}/></AvatarContainer>
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
            <UserBirthday>
              <p>Birthday:</p>
              <UserInfoText>
                {(myDay <= 9) ? <span>0{myDay}</span> : <span>{myDay}</span>}
                  <span>/</span>
                {(myMonth <= 9) ? <span>0{myMonth}</span> : <span>{myMonth}</span>}
                 <span>/</span>
                <span>{myYear}</span>
              </UserInfoText>

              <Svg calendar onClick={this.onClickCalendar} src={require(`!raw-loader!./icons/calendar.svg`)} raw={true}/>
            </UserBirthday>
            {
              this.state.isOpenCalendar ?
              <CalendarWrapper show>
              <Calendar
                onChange={this.onChange}
                value={this.state.date}
                onClickDay={this.onClickDay}
                />
              </CalendarWrapper> :
              <CalendarWrapper hide>
              <Calendar
                onChange={this.onChange}
                value={this.state.date}
                onClickDay={this.onClickDay}
                />
              </CalendarWrapper>
            }
            <UserPhone>
              <p>Phone:</p>
              <UserInfoText>+79897171335</UserInfoText>
            </UserPhone>
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

export default User;
