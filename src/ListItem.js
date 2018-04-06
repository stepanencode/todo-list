import React, {Component} from "react";
import TimerButton from "./TimerButton";
import TimerDisplay from "./TimerDisplay";
import CommentField from "./CommentField";
import styled, { css } from "styled-components";

const ENTERKEY = 13;

const ItemWrapper = styled.li`
  padding-bottom: 10px;
  margin-top: 10px;
  background-color: #ffffff;
  opacity: 0.9;
  border-radius: 3px;
`;

const Svg = styled.svg`
  vertical-align: middle;
  margin: 0 10px;
`;

const TextItem = styled.p`
  display: inline-block;
  font-family: sans-serif;
  color: #000080;
  font-size: 20px;
  max-width: 500px;
  word-break: break-all;
  vertical-align: middle;
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
  color: #000080;
  border-style: none;
  width: 500px;
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
      showComment: false,
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

  handleRemoveDueToday = () => {
    this.props.handleRemoveDueToday(this.props.item.uuid);
  };

  handleRemoveDueTomorrow = () => {
    this.props.handleRemoveDueTomorrow(this.props.item.uuid);
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
    this.setState(() => ({showComment: true}));
  };
  render() {
    return(
      <ItemWrapper
        onMouseOver={this.itemMouseOver}
        onMouseLeave={this.itemMouseLeave}
        onKeyDown={this.onKeyPressed}>
        <span>
          {
            this.props.item.isCompleted ?
              <label>
                <Checkbox type="checkbox" id="option"
                  checked={this.props.item.isCompleted}
                  onClick={this.handleComplete}
                />
                <Svg xmlns="http://www.w3.org/2000/svg"
                  width="1.3em" height="1.3em"
                  viewBox="0 0 24 24" >
                  <path d="M11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597zm11-15v20h-20v-20h20zm2-2h-24v24h24v-24z"
                    style={{fill: "#ebebe0"}}
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
                    style={{fill: "#ffdb4d"}}
                  />
                </Svg>
              </label>
          }
        </span>
        {
          this.state.isEdit ?
            <span>
              <Input value={this.props.item.text}
                maxLength={100}
                onChange={this.handleChange}
              />
              <Svg version="1.1" id="Save"
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
            </span> :
            <span>
              <TextItem maxLength={100}>{this.props.item.text}</TextItem>
              {
                this.props.item.isCompleted ?
                  null :
                  <Svg version="1.1" id="Edit" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
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
        }
        {
          this.props.item.isCompleted ?
            null :
            <span>
              {
                this.props.item.isImportant ?
                  <Svg version="1.1"
                    id="Important"
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
                    id="notImportant"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px" y="0px"
                    viewBox="0 0 47.94 47.94"
                    style={{enableBackground: "new 0 0 47.94 47.94"}}
                    width="1.78rem" height="1.78rem"
                    onClick={this.handleImportant}>
                    <path style={{fill: "#ffbeb3"}}
                      d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                      c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                      c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                      c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                      c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                      C22.602,0.567,25.338,0.567,26.285,2.486z"/>
                  </Svg>
              }
              {
                this.props.item.isDueToday ?
                  <Button bigger
                    onClick={this.handleRemoveDueToday}>Remove Due Today
                  </Button> :
                  <Button onClick={this.handleDueToday}>Due Today</Button>
              }
              {
                this.props.item.isDueTomorrow ?
                  <Button bigger
                    onClick={this.handleRemoveDueTomorrow}>Remove Due Date
                  </Button> :
                  <Button onClick={this.handleDueTomorrow}>Due Tomorrow</Button>
              }
              <span>
                <Svg xmlns="http://www.w3.org/2000/svg"
                  version="1.1" id="CommentAdd" x="0px" y="0px"
                  viewBox="0 0 489.8 489.8"
                  style={{enableBackground: "new 0 0 489.8 489.8"}}
                  width="1.78rem" height="1.78rem"
                  onClick={this.showCommentField}>
                  <g>
                    <g>
                      <path style={{fill: "#FFDA44"}}
                        d="M401.9,217.9c0.8,6.7,6.9,11.5,13.7,10.6c6.7-0.8,11.5-7,10.6-13.7c-12-95.7-103.3-167.9-212.5-167.9
                        C95.9,46.9,0,131.7,0,235.8c0,40.9,15.1,80.8,42.8,113.4c-5.7,12.1-13.9,21.7-24.4,28.5c-6.3,4.1-9.3,11.6-7.7,18.9
                        c1.6,7.2,7.5,12.6,14.8,13.6c16.7,2.3,48.3,3.6,78.7-12.1c33.1,17.4,70.7,26.6,109.4,26.6c22.4,0,44.4-3,65.5-9
                        c6.5-1.9,10.3-8.6,8.4-15.1c-1.8-6.5-8.6-10.3-15.1-8.4c-18.9,5.4-38.7,8.1-58.8,8.1c-36.8,0-72.6-9.3-103.4-26.8
                        c-3.8-2.2-8.6-2.1-12.4,0.1c-17.9,10.7-37,13.5-52,13.5c-0.1,0-0.2,0-0.2,0c9.9-9.7,17.6-21.8,22.8-36c1.6-4.3,0.6-9.2-2.5-12.6
                        c-27.2-29.5-41.5-65-41.5-102.7c0-90.7,84.9-164.4,189.3-164.4C310.6,71.4,391.4,134.4,401.9,217.9z"/>
                      <circle cx="213.6" cy="235.8" r="13.6" style={{fill: "#FFDA44"}}/>
                      <circle cx="155.1" cy="235.8" r="13.6" style={{fill: "#FFDA44"}}/>
                      <circle cx="272.2" cy="235.8" r="13.6" style={{fill: "#FFDA44"}}/>
                      <path style={{fill: "#FFDA44"}}
                        d="M388.3,239.8c-56,0-101.5,45.5-101.5,101.5s45.5,101.6,101.5,101.6s101.5-45.5,101.5-101.5S444.3,239.8,388.3,239.8z
                        M388.3,418.4c-42.5,0-77-34.6-77-77s34.6-77,77-77s77,34.6,77,77S430.8,418.4,388.3,418.4z"/>
                      <path style={{fill: "#FFDA44"}}
                        d="M419.7,329.1h-19.2v-19.2c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3v19.2h-19c-6.8,0-12.3,5.5-12.3,12.3
                        s5.5,12.3,12.3,12.3h19.2v19.2c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-19.2h19.2c6.8,0,12.3-5.5,12.3-12.3
                        S426.5,329.1,419.7,329.1z"/>
                    </g>
                  </g>
                </Svg>
              </span>
              <TimerButton time='5'
                startTimer={this.startTimer}
                item={this.props.item}
              />
              <TimerDisplay timeLeft={this.state.timeLeft}/>
            </span>
        }
        <Svg version="1.1"
          id="Delete"
          xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          viewBox="0 0 389.6 389.6"
          style={{enableBackground: "new 0 0 389.6 389.6"}}
          width="1.78rem" height="1.78rem"
          onClick={this.handleDelete}>
          <g>
            <path style={{fill: " tomato"}}
              d="M340.4,80.4H49.2v266.8c0,23.6,19.2,42.4,42.4,42.4h206c23.6,0,42.4-19.2,42.4-42.4V80.4H340.4z"/>
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
        {
          this.state.showComment ?
            <CommentField
              showCommentField={this.showCommentField}
            /> :
            null
        }
      </ItemWrapper>
    );
  }
}

export default ListItem;
