import React, { Component } from "react";

import {
  Text
} from "./styles"

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
