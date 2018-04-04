import React, { Component } from "react";
import styled from "styled-components";

const Svg = styled.svg`
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
          <Svg version="1.1"
               id="Timer"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 60 60"
               style={{enableBackground: "new 0 0 60 60"}}
               width="1.78rem" height="1.78rem"
               onClick={this.handleStartTimer}
          >
            <g>
              <title>{this.props.time} sec</title>
              <circle style={{fill: "#ffffff"}} cx="30" cy="29" r="29"/>
              <path style={{fill: "#00cc44"}}
                    d="M30,60C13.458,60,0,46.542,0,30c0-7.993,3.107-15.514,8.749-21.176
                	c0.779-0.785,2.047-0.785,2.828-0.006c0.783,0.78,0.785,2.046,0.006,2.828C6.693,16.555,4,23.072,4,30c0,14.337,11.663,26,26,26
                		s26-11.663,26-26C56,16.337,45.405,5.101,32,4.076v10.757c0,1.104-0.896,2-2,2s-2-0.896-2-2V2c0-1.104,0.896-2,2-2
                			c16.542,0,30,13.458,30,30S46.542,60,30,60z"/>
              <path style={{fill: "#00cc44"}}
                    d="M20,20.121L20,20.121l12.944,9.363c1.274,0.926,1.419,2.772,0.305,3.886l0,0
                	c-1.114,1.114-2.959,0.969-3.886-0.305L20,20.121z"/>
            </g>
          </Svg>
        }
      </span>
    );
  }
}

export default TimerButton;
