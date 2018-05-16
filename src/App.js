import React, { Component } from "react";
import List from "./List";
import uuidv4 from "uuid";
import styled, { css } from "styled-components";
import { keyframes } from "styled-components";
import InlineSVG from 'svg-inline-react';
import { injectGlobal } from 'styled-components';
import 'normalize.css';
import Gugi from './fonts/Gugi-Regular.ttf'

const Svg = styled(InlineSVG)`
  vertical-align: bottom;
  margin-left: 10px;

  ${props => props.position && css`
    position: absolute;
    top: -15px;
    right: -19px;
  `}

  ${props => props.robot && css`
    margin-left: -10px;
  `}
`;

injectGlobal`
  body {
    overflow: hidden;
  }
  @font-face {
    font-family: 'Gugi';
    src: url(${Gugi});
  }
`;

const FilterWrapper = styled.div`
  margin-top: 10px;
`;

const Body = styled.div`
  background-image: url(./boat.jpeg);
  // background-color: blue;
  background-attachment:fixed;
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 14px;
  font-family: sans-serif;
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
  padding: 30px 0;
  // margin-left: 10px;
`;

const ItemsCounterText = styled.p`
  font-family: Gugi;
  display: inline-block;
  font-size: 55px;
  color: #0099ff;
  color: #1a75ff;
  margin: 0;
  padding-right: 2px;
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
  margin: 3px 10px;
  background: transparent;
  color: #0099ff;
  border: 2px solid #0099ff;
  width: 130px;
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

const FilteredMessagesBox = styled.div`
  
  background-color: #ffffff;
  opacity: 0.9;
  border-radius: 3px;
  margin-top: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 16px;
  color: #0099ff;

  &:hover {
    opacity: 1;
  }
`;

const FilteredMessage = styled.p`
  margin: 0;
  padding-left: 10px;
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

  allItemsCounter = () => {
    return this.state.items.length;
  }
  
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
          {/* <Svg robot src={require(`!raw-loader!./icons/robot.svg`)} raw={true}/> */}
            
            {
              (this.allItemsCounter() === 0) ?
                <ItemsCounterText>{"Hello! Let's get started!"}</ItemsCounterText> :
                <ItemsCounterText>You have  {this.allItemsCounter()}
                  {
                    (this.allItemsCounter() === 1) ?
                      <span>{" "}task.</span> :
                      <span>{" "}tasks.</span>
                  }
                </ItemsCounterText>
            }
          </ItemsCounter>
          <form onSubmit={this.onSubmit} data-testid="submit">
            <Input value={this.state.term}
              onChange={this.onChange}
              maxLength={100}
              placeholder={"Do you have new tasks?"}
              data-testid="input-add-item"
            />
            <span onClick={this.onSubmit} data-testid="submit-button">
              <Svg src={require(`!raw-loader!./icons/add-item.svg`)} raw={true}/>
            </span>
          </form>
          
                    
          <FilterWrapper>
          <div>
          {(this.allItemsCounter() === 0) ? null: 
          <span>
            <Button onClick={this.filterAll}
              pressed={this.state.filterCompletedTerm === ALL}>All
            </Button> 

            <Button onClick={this.filterActive} data-testid="active"
              pressed={this.state.filterCompletedTerm === ACTIVE}>Active
            </Button>
            <Button onClick={this.filterCompleted} data-testid="completed"
              pressed={this.state.filterCompletedTerm === COMPLETED}>Completed
            </Button>
            {
              ((this.state.items.filter(item => item.isCompleted === true)).length > 0) ?
                <Button bigger
                  onClick={this.clearCompleted}>Clear completed
                </Button> :
                null
            }
            </span>
          }
          </div>
          {(this.allItemsCounter() === 0) ? null: 
          <div>
            <Button onClick={this.notFilterImportant}
              pressed={!this.state.isFilterImportant}>All
          </Button> 
            <Button onClick={this.filterImportant} 
              pressed={this.state.isFilterImportant} >Important!
            </Button> 
          </div>
          }
          {(this.allItemsCounter() === 0) ? null: 
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
          }
          {/* {(this.allItemsCounter() === 0) ? <p>ничего нет</p>: <p>что-то написали</p>} */}

          {(this.state.filterCompletedTerm === ACTIVE) && (this.state.isFilterImportant === false) &&
           (this.allItemsCounter() >= 1)  &&
            (this.itemsCounter() === 0) ? 
            <FilteredMessagesBox>
              <FilteredMessage>You don't have active tasks yet!</FilteredMessage>
            </FilteredMessagesBox> : null}

          {(this.state.filterCompletedTerm === COMPLETED) && (this.state.isFilterImportant === false) && (this.allItemsCounter() >= 1) && 
            (this.itemsCounter() === 0) ? 
            <FilteredMessagesBox>
              <FilteredMessage>You don't have completed tasks yet!</FilteredMessage>
            </FilteredMessagesBox> : null}

          {(this.state.filterCompletedTerm === ACTIVE) && (this.state.isFilterImportant === true) && 
            (this.itemsCounter() === 0) ? 
            <FilteredMessagesBox>
              <FilteredMessage>You don't have active and important tasks yet!</FilteredMessage>
            </FilteredMessagesBox> : null}

          {(this.state.filterCompletedTerm === ALL) && (this.state.isFilterImportant === true) && 
            (this.itemsCounter() === 0) ? 
            <FilteredMessagesBox>
              <FilteredMessage>You don't have important tasks!</FilteredMessage>
            </FilteredMessagesBox> : null}

          {(this.state.filterCompletedTerm === COMPLETED) && (this.state.isFilterImportant === true) && 
            (this.itemsCounter() === 0) ? 
            <FilteredMessagesBox>
              <FilteredMessage>You don't have completed and important tasks yet!</FilteredMessage>
            </FilteredMessagesBox> : null}

          {(this.state.isFilterDueToday === true)  &&
           (this.itemsCounter() === 0) ? 
           <FilteredMessagesBox>
            <FilteredMessage>You have no tasks for today!</FilteredMessage>
           </FilteredMessagesBox> : null}

          {(this.state.isFilterDueTomorrow === true) &&
           (this.itemsCounter() === 0) ? 
           <FilteredMessagesBox>
            <FilteredMessage>You have no tasks for tomorrow!</FilteredMessage>
           </FilteredMessagesBox> : null}  
          </FilterWrapper>
          
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
          {/* </div>
          } */}
          <WellDoneWrapper unvisible={!this.state.isWellDoneVisible}>
            <WellDoneBox >
              <WellDoneMessage>Well done! You have already completed {this.getCompletedItems().length} items
              </WellDoneMessage>
              <Svg src={require(`!raw-loader!./icons/close-popup.svg`)} raw={true} onClick={this.okButton}
                position/>
            </WellDoneBox>
          </WellDoneWrapper>
        </ToDoWrapper>
      </Body>
     
    );
  }
}

export default App;

