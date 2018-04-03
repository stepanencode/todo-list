import React, { Component } from "react";
import styled, { css } from "styled-components";

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 10px;
  background: transparent;
  color: #00cc44;
  border: 2px solid #00cc44;
  width: 120px;
  

  ${props => props.primary && css`
    background: white;
    color: #ff99ff;
    border: 2px solid #ff99ff;
    font-size: 1rem;
    vertical-align: bottom;
  `}
  ${props => props.pressed && css`
    background: #0099ff;
    color: white;
  `}
`;

class TimerButton extends Component{

  handleStartTimer = () => {
    return this.props.startTimer(this.props.time);
  };

  render() {
    let disabledCheckbox = "";
    if (this.props.item.isCompleted) {
      disabledCheckbox += "disabled";
    }
    return(
      <Button onClick={this.handleStartTimer} disabled={disabledCheckbox}>
        {this.props.time} sec
      </Button>
    );
  }
}

export default TimerButton;
