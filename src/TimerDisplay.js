import React, { Component } from "react";
import styled from "styled-components";

const Text = styled.p`
  font-family: sans-serif;
  font-size: 1.5em;
  text-align: center;
  color: #1a53ff;
`;

class TimerDisplay extends Component {
  render() {
    if(this.props.timeLeft === 0 || this.props.timeLeft === null) {
      return null;
    }


    return(
      <Text>Осталось времени: {this.props.timeLeft}</Text>
    );
  }
}

export default TimerDisplay;
