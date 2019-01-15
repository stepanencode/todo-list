import React, { Component } from 'react';
import styled, { css }  from "styled-components";
import onClickOutside from 'react-onclickoutside'
import InlineSVG from "svg-inline-react";
import Calendar from 'react-calendar';
import Gugi from "./fonts/Gugi-Regular.ttf";

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
  `}
  ${props => props.hide && css`
    display: none;
  `}
`;
const UserBirthdayWrapper = styled.div`
  display: inline-flex;
  padding-left: 10px;
  font-size: 18px;
  color: #a59390;
  font-family: 'Gugi';
  src: url(${Gugi});
`;

const UserInfoText = styled.p`
  color: #5a5858;
  padding-left: 10px;
  margin-top: 20px;
  font-size: 16px;
`;

class UserBirthday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isOpenCalendar: false
    };
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
   }

   handleClickOutside = () => {
     this.setState({
       isOpenCalendar: false
     })
   }

   render() {

    const myDay = this.state.date.getDate();
    const myMonth = this.state.date.getMonth() + 1;
    const myYear = this.state.date.getFullYear();

    return(
      <div>
      <UserBirthdayWrapper>
        <p>Birthday:</p>
        <UserInfoText>
          {(myDay <= 9) ? <span>0{myDay}</span> : <span>{myDay}</span>}
            <span>/</span>
          {(myMonth <= 9) ? <span>0{myMonth}</span> : <span>{myMonth}</span>}
           <span>/</span>
          <span>{myYear}</span>
        </UserInfoText>
        <Svg calendar="true" onClick={this.onClickCalendar} src={require(`!raw-loader!./icons/calendar.svg`)} raw={true}/>
      </UserBirthdayWrapper>
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
      </div>
    )
  }
}

export default onClickOutside(UserBirthday)
