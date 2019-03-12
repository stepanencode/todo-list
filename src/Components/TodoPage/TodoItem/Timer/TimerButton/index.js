import React, { Component } from "react";

import {
  Svg
} from "./styles";

class TimerButton extends Component{

  handleStartTimer = () => {
    return this.props.startTimer(this.props.time);
  };

  render() {
    /* eslint-disable quotes */
    return(
      <span>
        {this.props.item.isCompleted ?
          null :
          <Svg src={require(`!raw-loader!../../../../../icons/timer.svg`)} raw={true} onClick={this.handleStartTimer}  data-testid="timer-for-item"/>
        }
      </span>
    );
    /* eslint-enable quotes */
  }
}

export default TimerButton;
