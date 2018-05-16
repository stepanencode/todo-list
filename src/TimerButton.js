import React, { Component } from "react";
import styled from "styled-components";
import InlineSVG from 'svg-inline-react';


const Svg = styled(InlineSVG)`
    vertical-align: middle;
    margin: 0 10px;
`;

class TimerButton extends Component{

  handleStartTimer = () => {
    return this.props.startTimer(this.props.time);
  };

  render() {
    return(
      <span>
        {this.props.item.isCompleted ?
          null :
          <Svg src={require(`!raw-loader!./icons/timer.svg`)} raw={true} onClick={this.handleStartTimer}  data-testid="timer-for-item"/>
        }
      </span>
    );
  }
}

export default TimerButton;
