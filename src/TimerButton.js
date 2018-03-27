import React, { Component } from 'react'

class TimerButton extends Component{

  handleStartTimer = (event) => {
    return this.props.startTimer(this.props.time)
  };

  render() {
    let disabledCheckbox = '';
    if (this.props.item.isCompleted) {
      disabledCheckbox += 'disabled'
    }
    return(
      <button onClick={this.handleStartTimer} disabled={disabledCheckbox}>
        {this.props.time} sec
      </button>
    )
  }
}

export default TimerButton;