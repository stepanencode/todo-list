import React, { Component } from 'react'

class TimerDisplay extends Component {
  render() {
    if(this.props.timeLeft === 0 || this.props.timeLeft === null) {
      return null
    }
    return(
      <p>Осталось времени: {this.props.timeLeft}</p>
    )
  }
}

export default TimerDisplay;