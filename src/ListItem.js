import React, {Component} from "react";
import TimerButton from "./TimerButton";
import TimerDisplay from "./TimerDisplay";
import CommentField from "./CommentField";
import styled, { css } from "styled-components";


const ENTERKEY = 13;

const Svg = styled.svg`
  vertical-align: middle;
  margin: 0 10px;
`;

const TextItem = styled.span`
  font-family: sans-serif;
  font-size: 20px;
  
`;

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 10px;
  background: transparent;
  color: #ff6347;
  border: 2px solid #ff6347;
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
  
  ${props => props.disabled && css`
    background: white;
    color: gray;
    border: 2px solid gray;
  `}
  
  ${props => props.bigger && css`
    background: tomato;
    color: white;
    border: 2px solid tomato;
    width: 150px;
  `}
  ${props => props.unvisible && css`
    display: none;
  `}
`;

const Checkbox = styled.input`
  display: none;
`;

const Input = styled.input`
  background-color: #BAE3FF;
  border-style: none;
  width: 20%;
  height: 1.78rem;
  border-radius: 3px;
  font-size: 24px;
`;

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isHover: false,
      timeLeft: null,
      timer: null,
      showComment: false
    };
  }

  startTimer = (timeLeft) => {
    clearInterval(this.state.timer);
    let timer = setInterval(() => {
      let timeLeft = this.state.timeLeft -1;
      if (timeLeft === 0) {
        clearInterval(timer);
        this.handleComplete();
      }
      this.setState({
        timeLeft: timeLeft
      });
    }, 1000);
    return this.setState({
      timeLeft: timeLeft,
      timer: timer
    });
  };

  handleComplete = () => {
    this.props.handleComplete(this.props.item.uuid);
    console.log('click');
  };

  handleDelete = () => {
    this.props.handleDelete(this.props.item.uuid);
  };

  handleEdit = () => {
    this.setState({
      isEdit: true
    });
  };

  handleSave = () => {
    this.setState({
      isEdit: false
    });
  };

  handleChange = (event) => {
    this.props.handleChange(this.props.item.uuid, event.target.value);
  };

  itemMouseOver = () => {
    this.setState({
      isHover: true
    });
  };

  itemMouseLeave = () => {
    this.setState({
      isHover: false
    });
  };

  handleImportant = () => {
    this.props.handleImportant(this.props.item.uuid);
  };

  handleDueToday = () => {
    this.props.handleDueToday(this.props.item.uuid);
  };

  handleRemoveDueDate = () => {
    this.props.handleRemoveDueDate(this.props.item.uuid);
  };

  handleDueTomorrow = () => {
    this.props.handleDueTomorrow(this.props.item.uuid);
  };

  onKeyPressed = (event) => {
    if(event.keyCode === ENTERKEY){
      this.handleSave();
    }
  };

  showCommentField = () => {
    this.setState({
      showComment: true
    });
  };

  render() {




    let notActiveTomorrow = "";
    if (this.props.item.isDueToday) {
      notActiveTomorrow += " visible-hidden";
    }
    let notActiveToday = "";
    if (this.props.item.isDueTomorrow) {
      notActiveToday += " visible-hidden";
    }


    return(
      <li
        onMouseOver={this.itemMouseOver}
        onMouseLeave={this.itemMouseLeave}
        onKeyDown={this.onKeyPressed}
      >

        <span>
          {this.props.item.isCompleted ?
            <label>
              <Checkbox type="checkbox" id="option"
                        checked={this.props.item.isCompleted}
                        onClick={this.handleComplete}

              />
            <Svg xmlns="http://www.w3.org/2000/svg"
                 width="1.3em" height="1.3em"
                 viewBox="0 0 24 24" >
              <path d="M11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597zm11-15v20h-20v-20h20zm2-2h-24v24h24v-24z"
                    style={{fill: '#ebebe0'}}
                    />
             </Svg>
            </label> :
            <label>
              <Checkbox type="checkbox" id="option"
                        checked={this.props.item.isCompleted}
                        onClick={this.handleComplete}

              />
            <Svg xmlns="http://www.w3.org/2000/svg"
                 width="1.2em" height="1.2em"
                 viewBox="0 0 24 24">
              <path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                    style={{fill: '#ffdb4d'}}
              />
            </Svg>
            </label>
        }
        </span>
        {
            this.state.isEdit ?
              (<span>
                  <Input value={this.props.item.text}   onChange={this.handleChange}/>
                  <Svg version="1.1" id="Layer_1"
                       xmlns="http://www.w3.org/2000/svg"
                       x="0px" y="0px"
                       viewBox="0 0 512 512"
                       style={{enableBackground: "new 0 0 512 512"}}
                       onClick={this.handleSave}
                       width="1.78rem" height="1.78rem">
                    <polygon style={{fill: "#509299"}}
                             points="512,512 443.153,512 256,466.489 68.847,512 0,512 0,0 115.484,0 256,45.511 396.516,0
                             	443.733,0 512,68.271 "/>
                    <polygon style={{fill: "#B4E5EA"}}
                             points="115.484,0 115.484,210.489 396.516,210.489 396.516,0 351.004,0 303.502,22.756 256,0 "/>
                    <rect x="256" style={{fill: "#1B4145"}} width="95.004" height="164.978"/>
                    <polygon style={{fill: "#F9F7F7"}}
                             points="443.153,348.604 443.153,512 68.847,512 68.847,348.604 256,325.848 "/>
                    <path style={{fill: "#6FC5D6"}}
                          d="M443.153,326.986v21.618H68.847v-21.618c0-19.479,15.792-35.271,35.271-35.271h303.764
                          	C427.361,291.715,443.153,307.507,443.153,326.986z"/>
                  </Svg>
            </span>
              ) :
              (
                <span>
                <TextItem maxLength={100}>{this.props.item.text}</TextItem>
                  {this.props.item.isCompleted ? null :

                    <Svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 504.48 504.48"
                    style={{enableBackground: "new 0 0 504.48 504.48"}}
                    onClick={this.handleEdit}
                    width="1.78rem" height="1.78rem">
                    <path style={{fill: "#2394BC"}}
                    d="M492.534,145.772L172.337,461.636c0,0-163.84,48.837-171.323,41.354s37.415-175.261,37.415-175.261
                                        L358.626,11.864c15.36-15.754,40.172-15.754,55.532,0l78.375,78.769C507.894,105.599,507.894,130.412,492.534,145.772z"/>
                    <path style={{fill: "#44A4C6"}}
                    d="M66.392,367.113L418.097,15.409l-3.938-3.938c-15.36-15.36-40.172-15.36-55.532,0.394L38.823,328.123
                                        c0,0-0.788,3.151-2.363,8.665L66.392,367.113L66.392,367.113z"/>
                    <path style={{fill: "#1F85A9"}}
                    d="M501.592,132.775c5.514-14.178,2.757-31.114-8.665-42.535l-7.877-7.877L133.346,434.067l30.72,30.326
                                        c4.332-1.182,7.089-1.969,8.271-2.363C172.337,462.03,501.592,132.775,501.592,132.775z"/>
                    <path style={{fill: "#FFCABA"}}
                    d="M0.62,501.809l2.363,2.363c18.511,2.757,160.689-39.385,169.354-42.142l0.394-0.394
                                        c0,0-9.058-42.535-16.935-50.018c-7.877-7.877-42.142-9.058-50.018-16.542c-7.877-7.877-8.665-42.142-16.935-50.018
                                                            c-7.877-7.877-48.049-16.148-50.018-16.542C38.823,328.123-2.531,482.116,0.62,501.809L0.62,501.809z"/>
                    <path style={{fill: "#FFDCD2"}}
                    d="M0.226,499.839c2.757-4.726,16.542-29.145,88.222-154.781c-7.877-7.877-48.049-16.148-50.018-16.542
                                        C38.823,328.123-0.168,473.846,0.226,499.839z"/>
                    <path style={{fill: "#E5B5A7"}}
                    d="M0.226,500.233v1.182l2.363,2.363c18.511,2.757,160.689-39.385,169.354-42.142l0.394-0.394
                                        c0,0-8.665-42.142-16.542-50.018C25.432,486.055,3.771,498.264,0.226,500.233z"/>
                    <path style={{fill: "#2394BC"}}
                    d="M27.402,473.058c-5.12-5.12-13.391-9.058-21.662-9.846c-4.332,22.055-7.089,38.203-4.726,40.566
                                        c1.969,1.969,16.935-0.394,36.628-4.726C37.642,489.206,33.309,478.966,27.402,473.058z"/>
                    </Svg>
                    }
              </span>
              )
          }
        {this.props.item.isCompleted ?
          null :
          <span>
            {this.props.item.isImportant ?
              <Svg version="1.1"
                   id="Capa_1"
                   xmlns="http://www.w3.org/2000/svg"
                   x="0px" y="0px"
                   viewBox="0 0 47.94 47.94"
                   style={{enableBackground: "new 0 0 47.94 47.94"}}
                   width="1.78rem" height="1.78rem"
                   onClick={this.handleImportant}>
                <path style={{fill: "#ff6347"}}
                      d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                      	c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                      		c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                      			c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                      				c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                      					C22.602,0.567,25.338,0.567,26.285,2.486z"/>
              </Svg> :
              <Svg version="1.1"
                   id="Capa_1"
                   xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                   viewBox="0 0 511.999 511.999"
                   style={{enableBackground: "new 0 0 511.999 511.999"}}
                   width="1.78rem" height="1.78rem"
                   onClick={this.handleImportant}
              >
                <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse"
                                x1="0" y1="257.9997" x2="511.9994" y2="257.9997"
                                gradientTransform="matrix(1 0 0 -1 0 513.9995)">
                  <stop offset="0" style={{stopColor: "#FEB970"}}/>
                  <stop offset="0.16" style={{stopColor: "#FFA36F"}}/>
                  <stop offset="0.413" style={{stopColor: "#FF8F6E"}}/>
                  <stop offset="0.725" style={{stopColor: "#FF816E"}}/>
                  <stop offset="1" style={{stopColor: "#ff6347"}}/>
                </linearGradient>
                <path style={{fill: "url(#SVGID_1_)"}}
                      d="M370.917,496.377L256,436.074l-114.917,60.303c-13.574,7.123-29.708,5.947-42.105-3.07
                    	c-12.376-9.002-18.455-23.958-15.865-39.033l21.939-127.673l-92.94-90.425C1.136,225.497-2.747,209.818,1.978,195.258
                    		c4.73-14.575,17.097-24.997,32.273-27.198l128.472-18.633L220.17,33.243C226.954,19.523,240.683,11,256,11
                    			c15.316,0,29.045,8.523,35.829,22.243l0,0l57.448,116.184l128.472,18.633c15.176,2.201,27.543,12.623,32.273,27.198
                    				c4.725,14.561,0.842,30.239-10.134,40.918l-92.94,90.425l21.939,127.673c2.591,15.073-3.487,30.03-15.863,39.032
                    							C400.774,502.217,384.652,503.584,370.917,496.377z M40.127,207.626l100.365,97.648c4.724,4.596,6.881,11.226,5.764,17.722
                    											l-23.701,137.93l124.152-65.149c5.819-3.053,12.767-3.053,18.585,0l124.151,65.148l-23.7-137.93
                    												c-1.116-6.496,1.04-13.126,5.764-17.722l100.364-97.648l-138.736-20.122c-6.511-0.944-12.14-5.031-15.056-10.928l-62.08-125.551
                    													L193.92,176.576c-2.916,5.897-8.546,9.984-15.057,10.928L40.127,207.626z M472.146,207.674h0.01H472.146z M39.916,207.41
                    														L39.916,207.41L39.916,207.41z M472.084,207.41L472.084,207.41L472.084,207.41z M255.911,50.862L255.911,50.862L255.911,50.862z"/>
              </Svg>
            }



            {this.props.item.isDueToday ?
              <Button bigger onClick={this.handleRemoveDueDate} >Remove Due Date</Button> :
              <Button onClick={this.handleDueToday} className={notActiveToday}>Due Today</Button>
            }
            {this.props.item.isDueTomorrow ?
              <Button bigger onClick={this.handleRemoveDueDate}>Remove Due Date</Button> :
              <Button onClick={this.handleDueTomorrow} className={notActiveTomorrow}>Due Tomorrow</Button>
            }

            <Button onClick={this.showCommentField}>Add Comment</Button>
            <TimerButton time='5' startTimer={this.startTimer} item={this.props.item}/>
            <TimerDisplay timeLeft={this.state.timeLeft}/>
            {this.state.showComment ?
              <CommentField/> :
              null
            }
        </span>
        }
        <Svg version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 389.6 389.6"
                style={{enableBackground: "new 0 0 389.6 389.6"}}
                width="1.78rem" height="1.78rem"
                onClick={this.handleDelete}>
              <g>
                <path style={{fill: " tomato"}} d="M340.4,80.4H49.2v266.8c0,23.6,19.2,42.4,42.4,42.4h206c23.6,0,42.4-19.2,42.4-42.4V80.4H340.4z"/>
                <g>
                  <path style={{fill: "tomato"}}
                        d="M346.8,40H280c-1.2-10.4-6-20-13.2-26.8l0,0l0,0l0,0C258.4,4.8,247.2,0,234.8,0h-80
                  			c-12.4,0-24,5.2-32,13.2l0,0c-7.2,7.2-12,16.4-13.2,26.8H42.8c-11.2,0-20,9.2-20,20l0,0c0,11.2,9.2,20,20,20h304
                  						c11.2,0,20-9.2,20-20l0,0C366.8,49.2,357.6,40,346.8,40z M136.8,27.2L136.8,27.2c4.8-4.8,10.8-7.6,18-7.6h80
                  									c7.2,0,13.2,2.8,18,7.6l0,0c3.6,3.6,6,8,6.8,12.8H130C130.8,35.2,133.2,30.8,136.8,27.2L136.8,27.2z"/>
                  <path style={{fill: "white"}}
                        d="M258,146.8v176.4c0,11.2,9.2,20,20,20l0,0c11.2,0,20-9.2,20-20V146.8c0-11.2-9.2-20-20-20l0,0
                  		C267.2,126.8,258,136,258,146.8"/>
                  <path style={{fill: "white"}}
                        d="M174.8,146.8v176.4c0,11.2,9.2,20,20,20l0,0c11.2,0,20-9.2,20-20V146.8c0-11.2-9.2-20-20-20l0,0
                  		C183.6,126.8,174.8,136,174.8,146.8"/>
                  <path style={{fill: "white"}}
                        d="M91.2,146.8v176.4c0,11.2,9.2,20,20,20l0,0c11.2,0,20-9.2,20-20V146.8c0-11.2-9.2-20-20-20l0,0
                  	C100.4,126.8,91.2,136,91.2,146.8"/>
                </g>
              </g>
            </Svg>
      </li>
    );
  }
}

export default ListItem;
