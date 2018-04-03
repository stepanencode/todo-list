import React, { Component } from "react";
import List from "./List";
import uuidv4 from "uuid";
// import TextareaAutosize from "react-textarea-autosize";
import styled, { css } from "styled-components";

const Svg = styled.svg`
    vertical-align: bottom;
    margin-left: 10px;
`;

const Input = styled.input`
  font-family: sans-serif;
  background-color: #BAE3FF;
  border-style: none;
  width: 60%;
  height: 1.78rem;
  border-radius: 3px;
`;

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 10px;
  background: transparent;
  color: #0099ff;
  border: 2px solid #0099ff;
  width: 120px;
  

  
  ${props => props.pressed && css`
    background: #0099ff;
    color: white;
  `}
  
  ${props => props.bigger && css`
    background: #0099ff;
    color: white;
    width: 150px;
  `}
`;

const ItemsCounter = styled.span`
  color: #81abd7;
  margin-left: 10px;
`;

const WellDoneBox = styled.div`
  border-radius: 3px;
  padding: 0.25em 1em;
  background: transparent;
  color: #0099ff;
  border: 2px solid #0099ff;
  width: 300px;
  height: 200px;
  z-index: 100;
  margin: 0 auto;
  position: relative;
  
  ${props => props.unvisible && css`
    display: none;
  `}
`;

const WellDoneMessage = styled.p`
  margin: 0 auto;
  color: #003cb3;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

const ACTIVE = "active";
const ALL = "all";
const COMPLETED = "completed";
const WELLDONE_COUNTERS = [3, 5, 10];
const TEXT_SAMPLE = {"Who is a good boy?": "it's you!", "Cъешь ещё этих мягких французских булок": "да выпей чаю!"};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      items: [],
      filterCompletedTerm: ALL,
      isFilterImportant: false,
      isWellDoneVisible: false,
      isFilterDueToday: false,
      isFilterDueTomorrow: false
    };
  }

  okButton = () => {
    this.setState(() => ({isWellDoneVisible: false}));
  };

  onChange = (event) => {
    this.setState({
      term: event.target.value
    });
  };

  textCompare = () => {
    for (let i in TEXT_SAMPLE) {
      if (this.state.term === i) {
        alert(TEXT_SAMPLE[i]);
      }
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.term.trim()) {
      this.textCompare();
      this.setState({
        term: "",
        items: [
          ...this.state.items,
          {text: this.state.term.trim(),
            isCompleted: false,
            isImportant: false,
            uuid: uuidv4(),
            isDueToday: false,
            isDueTomorrow: false
          }
        ]
      });
    } else {
      alert("Text must not be empty");
    }
  };

  handleDelete = (uuid) => {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.uuid !== uuid)
    }));
  };

  handleComplete = (uuid) => {
    this.setState((prevState) => {
      let items = prevState["items"].slice();
      for (let item of items) {
        if (item.uuid === uuid) {
          item.isCompleted = true;
        }
      }
      return {items: items, isWellDoneVisible: this.isWellDone()};
    });
  };

  handleImportant = (uuid) => {
    this.setState((prevState) => {
      let items = prevState["items"].slice();
      for (let item of items) {
        if (item.uuid === uuid) {
          item.isImportant = !item.isImportant;
        }
      }
      return {items: items};
    });
  };

  handleDueToday = (uuid) => {
    this.setState((prevState) => {
      let items = prevState["items"].slice();
      for (let item of items) {
        if (item.uuid === uuid) {
          item.isDueToday = true;
        }
      }
      return {items: items};
    });
  };

  handleRemoveDueDate = (uuid) => {
    this.setState((prevState) => {
      let items = prevState["items"].slice();
      for (let item of items) {
        if (item.uuid === uuid) {
          item.isDueToday = false;
          item.isDueTomorrow = false;
        }
      }
      return {items: items};
    });
  };

  handleDueTomorrow = (uuid) => {
    this.setState((prevState) => {
      let items = prevState["items"].slice();
      for (let item of items) {
        if (item.uuid === uuid) {
          item.isDueTomorrow = true;
        }
      }
      return {items: items};
    });
  };

  clearCompleted = () => {
    this.setState((prevState) => {
      return {items: prevState.items.filter(item => item.isCompleted === false)};
    });
  };

  handleChange = (uuid, text) => {
    this.setState((prevState) => {
      let items = prevState["items"].slice();
      for (let item of items) {
        if (item.uuid === uuid) {
          item.text = text;
        }
      }
      return {items: items};
    });
  };

  filterAll = () => {
    this.setState({
      filterCompletedTerm: ALL
    });
  };

  filterActive = () => {
    this.setState({
      filterCompletedTerm: ACTIVE
    });
  };

  filterCompleted = () => {
    this.setState({
      filterCompletedTerm: COMPLETED
    });
  };

  filterImportant = () => {
    this.setState({
      isFilterImportant: true
    });
  };

  notFilterImportant = () => {
    this.setState({
      isFilterImportant: false
    });
  };

  filterDueToday = () => {
    this.setState({
      isFilterDueToday: true,
      isFilterDueTomorrow: false
    });
  };

  filterDueTomorrow = () => {
    this.setState({
      isFilterDueTomorrow: true,
      isFilterDueToday: false
    });
  };

  notFilterDueToday = () => {
    this.setState({
      isFilterDueToday: false,
      isFilterDueTomorrow: false
    });
  };

  getItems = () => {
    let result = this.state.items.slice();
    if (this.state.filterCompletedTerm === ACTIVE) {
      result = result.filter((item) => item.isCompleted === false);
    } else if (this.state.filterCompletedTerm === COMPLETED) {
      result = result.filter((item) => item.isCompleted === true);
    }
    if (this.state.isFilterImportant) {
      result = result.filter((item) => item.isImportant === true);
    }
    if (this.state.isFilterDueToday) {
      result = result.filter((item) => item.isDueToday === true && item.isDueTomorrow === false);
    }
    if (this.state.isFilterDueTomorrow) {
      result = result.filter((item) => item.isDueTomorrow === true && item.isDueToday === false);
    }
    return result;
  };

  getCompletedItems = () => {
    return this.state.items.filter((item) => item.isCompleted === true);
  };

  itemsCounter = () => {
    return this.getItems().length;
  };

  isWellDone = () => {
    for (let counter of WELLDONE_COUNTERS) {
      if (this.getCompletedItems().length === counter) {
        return true;
      }
    }
    return false;
  };

  render() {
    return (
      <div>
        <span>Hello!</span>
        <ItemsCounter>
          {(this.itemsCounter() === 0) ? <span>{"Let's get started!"}</span> : <span>You have {this.itemsCounter()} items</span>}
        </ItemsCounter>
        <form onSubmit={this.onSubmit}>

          <Input value={this.state.term} onChange={this.onChange}></Input>
          <span onClick={this.onSubmit}>
            <Svg xmlns="http://www.w3.org/2000/svg"
               version="1.1"  viewBox="0 0 80 80"
               style={{enableBackground: 'new 0 0 80 80'}}
                width="1.78rem" height="1.78rem;">
            <g>
              <path d="M70,0H10C4.5,0,0,4.5,0,10v60c0,5.5,4.5,10,10,10h60c5.5,0,10-4.5,10-10V10C80,4.5,75.5,0,70,0z
                  M65,45H45v20H35V45H15V35h20V15h10v20h20V45z"
                    fill="#0099ff"
                    />
            </g>
          </Svg>
          </span>

        </form>
        {((this.state.isFilterImportant === true) && (this.getItems().length === 0)) ? <p>{"You don't have any important items!"}</p> : null}
        <List items={this.getItems()}
          handleDelete={this.handleDelete}
          handleChange={this.handleChange}
          handleComplete={this.handleComplete}
          handleImportant={this.handleImportant}
          handleDueToday={this.handleDueToday}
          handleRemoveDueDate={this.handleRemoveDueDate}
          handleDueTomorrow={this.handleDueTomorrow}
        />
        <div>
          <Button onClick={this.filterAll} pressed={this.state.filterCompletedTerm === ALL}>All</Button>
          <Button onClick={this.filterActive} pressed={this.state.filterCompletedTerm === ACTIVE}>Active</Button>
          <Button onClick={this.filterCompleted} pressed={this.state.filterCompletedTerm === COMPLETED}>Completed</Button>
          {(this.state.items.filter(item => item.isCompleted === true)).length > 0 ?
            (<Button bigger onClick={this.clearCompleted}>Clear completed</Button>) :
            null}
        </div>
        <div>
          <Button onClick={this.notFilterImportant} pressed={!this.state.isFilterImportant}>All</Button>
          <Button onClick={this.filterImportant} pressed={this.state.isFilterImportant}>Important!</Button>
        </div>

        <div>
          <Button onClick={this.notFilterDueToday} pressed={!this.state.isFilterDueToday && !this.state.isFilterDueTomorrow}>All</Button>
          <Button onClick={this.filterDueToday} pressed={this.state.isFilterDueToday}>Due Today</Button>
          <Button onClick={this.filterDueTomorrow} pressed={this.state.isFilterDueTomorrow}>Due Tomorrow</Button>
        </div>

        <WellDoneBox unvisible={!this.state.isWellDoneVisible}>
            <WellDoneMessage>Well done! You have already completed {this.getCompletedItems().length} items</WellDoneMessage>
            <Button onClick={this.okButton} >OK</Button>
        </WellDoneBox>
      </div>
    );
  }
}

export default App;

