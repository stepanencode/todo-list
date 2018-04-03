import React, {Component} from "react";
import TextareaAutosize from "react-textarea-autosize";
import TimerButton from "./TimerButton";
import TimerDisplay from "./TimerDisplay";
import CommentField from "./CommentField";
import styled, { css } from "styled-components";


const ENTERKEY = 13;

const Svg = styled.svg`
  vertical-align: middle;
  margin-right: 10px;
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
`;

const Checkbox = styled.input`
  display: none;
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


    let labelClassName = "list_element";
    if (this.state.isHover) {
      labelClassName += " active";
    }
    if (this.props.item.isCompleted) {
      labelClassName += " checked";
    }
    if (this.props.item.isImportant) {
      labelClassName += " important-item";
    }
    let notActiveTomorrow = "";
    if (this.props.item.isDueToday) {
      notActiveTomorrow += " visible-hidden";
    }
    let notActiveToday = "";
    if (this.props.item.isDueTomorrow) {
      notActiveToday += " visible-hidden";
    }
    let classTextArea = "text-area-submit";

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
              <TextareaAutosize
                minRows={1}
                maxRows={4}
                type="text"
                className={classTextArea}
                maxlength={50}
                value={this.props.item.text}
                onChange={this.handleChange}
              />
              <Button onClick={this.handleSave}>Save</Button>
            </span>
            ) :
            (
              <span>
                <label className={labelClassName}>{this.props.item.text}</label>
                <Button onClick={this.handleEdit}>Edit</Button>
              </span>
            )
        }
        <Button onClick={this.handleImportant}>Important!</Button>
        {this.props.item.isDueToday ?
          <Button onClick={this.handleRemoveDueDate}>Remove Due Date</Button> :
          <Button onClick={this.handleDueToday} className={notActiveToday}>Due Today</Button>
        }
        {this.props.item.isDueTomorrow ?
          <Button onClick={this.handleRemoveDueDate}>Remove Due Date</Button> :
          <Button onClick={this.handleDueTomorrow} className={notActiveTomorrow}>Due Tomorrow</Button>
        }
        <TimerButton  time='5' startTimer={this.startTimer} item={this.props.item} />
        <TimerDisplay timeLeft={this.state.timeLeft}/>
        {this.state.isHover ?
          (
            <Button className='button-delete btn' onClick={this.handleDelete}>
              Delete
            </Button>
          ) :
          null
        }
        <Button onClick={this.showCommentField}>Add Comment</Button>
        {this.state.showComment ?
          <CommentField /> :
          null
        }
      </li>
    );
  }
}

export default ListItem;
