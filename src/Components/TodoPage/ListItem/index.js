import React, {Component} from "react";
import TimerButton from "../TodoItem/Timer/TimerButton/index";
import TimerDisplay from "../TodoItem/Timer/TimerDisplay/index";
import CommentField from "../TodoItem/Comments/CommentField/index";

import {
  ItemWrapper,
  Svg,
  SvgWrapper,
  TextItem,
  Button,
  Checkbox,
  Input
} from './styles'

const ENTERKEY = 13;

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isHover: false,
      timeLeft: null,
      timer: null,
      showComment: false,
      showCommentItems: false,
      term: this.props.item.text
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
    this.props.handleDelete(this.props.item.id);
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
    this.props.handleChange(this.props.item.id, this.state.term);
  };

  handleChange = (event) => {
    this.setState({
      term: event.target.value
    });
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
    // this.setState(() => ({showComment: !this.state.showComment}));
    this.setState(() => ({showComment: true}));
  };


  render() {
    /* eslint-disable quotes */

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
                  data-testid="checkbox-checked"
                />
                <SvgWrapper>
                  <Svg src={require(`!raw-loader!../../../icons/checkbox-checked.svg`)} raw={true}/>
                </SvgWrapper>
              </label> :
              <label onClick={this.handleComplete} data-testid="checkbox">
                <Checkbox type="checkbox" id="option"
                  checked={this.props.item.isCompleted}
                />
                <SvgWrapper>
                  <Svg src={require(`!raw-loader!../../../icons/checkbox-notchecked.svg`)} raw={true}/>
                </SvgWrapper>
              </label>
          }
        </span>
        {
          this.state.isEdit ?
            <span>
              <Input value={this.state.term}
                maxLength={100}
                onSubmit={this.handleSave}
                onChange={this.handleChange}
                data-testid="item-text-input"
              />
              <SvgWrapper>
                <Svg src={require(`!raw-loader!../../../icons/save.svg`)}
                  raw={true}
                  onClick={this.handleSave}
                  data-testid="save-button"
                />
              </SvgWrapper>
            </span> :
            <span>
              <TextItem maxLength={100}
                data-testid="item-text"
              >{this.state.term}</TextItem>
              {
                this.props.item.isCompleted ?
                  null :
                  <SvgWrapper>
                    <Svg src={require(`!raw-loader!../../../icons/edit.svg`)} raw={true}
                      onClick={this.handleEdit}
                      data-testid="edit-button"
                    />
                  </SvgWrapper>
              }
            </span>
        }
        {
          this.props.item.isCompleted ?
            null :
            <span>
              {
                this.props.item.isImportant ?
                  <SvgWrapper>
                    <Svg src={require(`!raw-loader!../../../icons/important.svg`)}
                      raw={true}
                      onClick={this.handleImportant}
                      data-testid="important-item"/>
                  </SvgWrapper> :
                  <SvgWrapper>
                    <Svg src={require(`!raw-loader!../../../icons/notimportant.svg`)}
                      raw={true}
                      onClick={this.handleImportant}
                      data-testid="not-important-item"/>
                  </SvgWrapper>
              }
              {
                this.props.item.isDueToday ?
                  <Button bigger
                    data-testid="due-today-on"
                    onClick={this.handleRemoveDueToday}>Remove Due Today
                  </Button> :
                  <Button onClick={this.handleDueToday}
                    data-testid="due-today-off" >Due Today</Button>
              }
              {
                this.props.item.isDueTomorrow ?
                  <Button bigger
                    data-testid="due-tomorrow-on"
                    onClick={this.handleRemoveDueTomorrow}>Remove Due Tomorrow
                  </Button> :
                  <Button onClick={this.handleDueTomorrow}
                    data-testid="due-tomorrow-off">Due Tomorrow</Button>
              }
              <span>
                <SvgWrapper>
                  <Svg src={require(`!raw-loader!../../../icons/add-comment.svg`)}
                    raw={true}
                    onClick={this.showCommentField}
                    data-testid="add-comment"/>
                </SvgWrapper>
              </span>
              <TimerButton time='5'
                startTimer={this.startTimer}
                item={this.props.item}
              />
              <TimerDisplay timeLeft={this.state.timeLeft}/>
            </span>
        }
        <SvgWrapper>
          <Svg src={require(`!raw-loader!../../../icons/delete-item.svg`)}
            raw={true}
            onClick={this.handleDelete}
            data-testid="delete-item"/>
        </SvgWrapper>
        {
          this.state.showComment ?
            <CommentField
              showCommentField={this.showCommentField}
            /> :
            null
        }
      </ItemWrapper>
    );
    /* eslint-enable quotes */
  }
}

export default ListItem;
