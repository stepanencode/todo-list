import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'
import Calendar from 'react-calendar';

import {
  Svg,
  CalendarWrapper,
  UserBirthdayWrapper,
  UserInfoText
} from './styles'

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
        <Svg calendar="true" onClick={this.onClickCalendar} src={require(`!raw-loader!../../../icons/calendar.svg`)} raw={true}/>
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
