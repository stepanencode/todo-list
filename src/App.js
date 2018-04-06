import React, { Component } from "react";
import List from "./List";
import uuidv4 from "uuid";
import styled, { css } from "styled-components";
import { keyframes } from "styled-components";


const Body = styled.div`
  background-image: url(./boat.jpeg);
  // background-color: blue;
  background-attachment:fixed;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ToDoWrapper = styled.div`
  margin: auto;
  padding-bottom: 20px;
  min-height: 100vh;
  width: 80%;
  min-width: 660px;
  position: relative;
`;

const ItemsCounter = styled.div`
  padding: 40px 0;
  margin-left: 10px;
`;

const ItemsCounterText = styled.p`
  display: inline-block;
  font-size: 55px;
  color: #1a66ff;
  margin: 0;
  padding-right: 2px;
`;

const Svg = styled.svg`
  vertical-align: bottom;
  margin-left: 10px;
    
  ${props => props.position && css`
    position: absolute;
    top: -15px;
    right: -19px;
  `}
`;

const Input = styled.input`
  font-family: sans-serif;
  background-color: #BAE3FF;
  color: #000080;
  border-style: none;
  width: 60%;
  height: 1.78rem;
  border-radius: 3px;
  font-size: 22px;
  padding-left: 5px;
  margin-left: 10px;
`;

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 10px;
  background: transparent;
  color: #0099ff;
  border: 2px solid #0099ff;
  width: 125px;
  background: #f2f2f2;
  opacity: 0.9;
  font-weight: bold;
    
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const WellDoneBox = styled.div`
  border-radius: 3px;
  padding: 0.25em 1em;
  background: #BAE3FF;
  color: #0099ff;
  border: 2px solid #0099ff;
  width: 300px;
  height: 200px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  animation: ${fadeIn} 1sl
  cursor: pointer;
`;

const WellDoneMessage = styled.span`
  margin: 0 auto;
  color: #003cb3;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

const WellDoneWrapper = styled.div` 
   width:100%;
   min-height:100%; 
   background-color: rgba(0,0,0,0.5);
   overflow:hidden;
   position:fixed;
   top:0px;
   left:0px;
   
   ${props => props.unvisible && css`
    display: none;
  `}
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
          item.isDueTomorrow = false;
        }
      }
      return {items: items};
    });
  };

  handleRemoveDueToday = (uuid) => {
    this.setState((prevState) => {
      let items = prevState["items"].slice();
      for (let item of items) {
        if (item.uuid === uuid) {
          item.isDueToday = false;
        }
      }
      return {items: items};
    });
  };

  handleRemoveDueTomorrow = (uuid) => {
    this.setState((prevState) => {
      let items = prevState["items"].slice();
      for (let item of items) {
        if (item.uuid === uuid) {
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
          item.isDueToday = false;
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
      <Body>
        <ToDoWrapper>
          <ItemsCounter>
            <ItemsCounterText>Hello!</ItemsCounterText>
            {
              (this.itemsCounter() === 0) ?
                <ItemsCounterText>{"Let's get started!"}</ItemsCounterText> :
                <ItemsCounterText>You have  {this.itemsCounter()}
                  {
                    (this.itemsCounter() === 1) ?
                      <span>{" "}item.</span> :
                      <span>{" "}items.</span>
                  }
                </ItemsCounterText>
            }
          </ItemsCounter>
          <form onSubmit={this.onSubmit}>
            <Input value={this.state.term}
              onChange={this.onChange}
              maxLength={100}
              placeholder={"Do you have new tasks?"}
            />
            <span onClick={this.onSubmit}>
              <Svg xmlns="http://www.w3.org/2000/svg"
                version="1.1"  viewBox="0 0 80 80"
                style={{enableBackground: "new 0 0 80 80"}}
                width="1.78rem" height="1.78rem">
                <g>
                  <path style={{fill: "#0099ff"}}
                    d="M70,0H10C4.5,0,0,4.5,0,10v60c0,5.5,4.5,10,10,10h60c5.5,0,10-4.5,10-10V10C80,4.5,75.5,0,70,0z
                    M65,45H45v20H35V45H15V35h20V15h10v20h20V45z"/>
                </g>
              </Svg>
            </span>
          </form>
          {
            ((this.state.isFilterImportant === true) && (this.getItems().length === 0)) ?
              <p>{"You don't have any important items!"}</p> :
              null
          }
          <List items={this.getItems()}
            handleDelete={this.handleDelete}
            handleChange={this.handleChange}
            handleComplete={this.handleComplete}
            handleImportant={this.handleImportant}
            handleDueToday={this.handleDueToday}
            handleRemoveDueToday={this.handleRemoveDueToday}
            handleDueTomorrow={this.handleDueTomorrow}
            handleRemoveDueTomorrow={this.handleRemoveDueTomorrow}
          />
          <div>
            <Button onClick={this.filterAll}
              pressed={this.state.filterCompletedTerm === ALL}>All
            </Button>
            <Button onClick={this.filterActive}
              pressed={this.state.filterCompletedTerm === ACTIVE}>Active
            </Button>
            <Button onClick={this.filterCompleted}
              pressed={this.state.filterCompletedTerm === COMPLETED}>Completed
            </Button>
            {
              ((this.state.items.filter(item => item.isCompleted === true)).length > 0) ?
                <Button bigger
                  onClick={this.clearCompleted}>Clear completed
                </Button> :
                null
            }
          </div>
          <div>
            <Button onClick={this.notFilterImportant}
              pressed={!this.state.isFilterImportant}>All
            </Button>
            <Button onClick={this.filterImportant}
              pressed={this.state.isFilterImportant}>Important!
            </Button>
          </div>
          <div>
            <Button onClick={this.notFilterDueToday}
              pressed={!this.state.isFilterDueToday && !this.state.isFilterDueTomorrow}>All
            </Button>
            <Button onClick={this.filterDueToday}
              pressed={this.state.isFilterDueToday}>Due Today
            </Button>
            <Button onClick={this.filterDueTomorrow}
              pressed={this.state.isFilterDueTomorrow}>Due Tomorrow
            </Button>
          </div>
          <WellDoneWrapper unvisible={!this.state.isWellDoneVisible}>
            <WellDoneBox >
              <WellDoneMessage>Well done! You have already completed {this.getCompletedItems().length} items
              </WellDoneMessage>
              <Svg version="1.1"
                id="Close-popup" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 512 512"
                style={{enableBackground: "new 0 0 512 512"}}
                width="1.78rem" height="1.78rem"
                onClick={this.okButton}
                position>
                <ellipse style={{fill: "#0099ff"}} cx="256" cy="256" rx="256" ry="255.832"/>
                <g>
                  <rect x="228.021" y="113.143" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.0178 256.0051)"
                    style={{fill: "#e6f5ff"}} width="55.991" height="285.669"/>
                  <rect x="113.164" y="227.968" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.0134 255.9885)"
                    style={{fill: "#e6f5ff"}} width="285.669" height="55.991"/>
                </g>
              </Svg>
            </WellDoneBox>
          </WellDoneWrapper>
        </ToDoWrapper>
      </Body>
    );
  }
}

export default App;

