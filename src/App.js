import React, { Component } from "react";
import { connect } from 'react-redux';
import List from "./List";
import uuidv4 from "uuid";
import styled, { css } from "styled-components";
import { keyframes } from "styled-components";
import InlineSVG from 'svg-inline-react';
import { injectGlobal } from 'styled-components';
import 'normalize.css';
import Gugi from './fonts/Gugi-Regular.ttf'
import img from './boat.jpg';
import { setFilterDueTomorrow, unsetFilterDueTomorrow, setFilterDueToday, unsetFilterDueToday, setFilterImportant, unsetFilterImportant, toggleRelaxButton } from './actions'

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
  background-image: url(${img});
  //width: 2000px;
  //height: 1125px;
  //background-color: blue;
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
  color: #ffffff;
  opacity: 0.9;
  margin: 0;
  padding-right: 2px;
  float: left;
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
  color: #098EA8;
  border: 2px solid #ffffff;
  width: 150px;
  background: #f2f2f2;
  opacity: 0.9;
  font-weight: 500;

  ${props => props.pressed && css`
    background: #098EA8;
    color: #ffffff;
    opacity: 0.9;
  `}

  ${props => props.bigger && css`
    background: #098EA8;
    color: white;
    width: 150px;
  `}

  ${props => props.relax && css`
    background: #098EA8;
    color: white;
    width: 150px;
    float: right;
    padding-top: 8px;
    padding-bottom: 8px;
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
  color: #098EA8;
  border: 2px solid #098EA8;
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

const Clearfix = styled.div`
  clear: both;
`;

const WellDoneMessage = styled.span`
  margin: 0 auto;
  color: #098EA8;
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
  color: #098EA8;

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
      // isFilterImportant: false,
      isWellDoneVisible: false,
      // isFilterDueToday: false,
      // isFilterDueTomorrow: false,
      // isPlayRelaxAudio: false
    };
  }
  relaxButton = () => {
    // this.setState(() => ({isPlayRelaxAudio: !this.state.isPlayRelaxAudio}));
    this.props.toggleRelaxButton()
  };

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
    // this.setState({
    //   isFilterImportant: true
    // });
    this.props.setFilterImportant()
  };

  notFilterImportant = () => {
    // this.setState({
    //   isFilterImportant: false
    // });
    this.props.unsetFilterImportant()
  };

  filterDueToday = () => {
    this.setState({
      // isFilterDueToday: true,
      // isFilterDueTomorrow: false
    });
    this.props.unsetFilterDueTomorrow();
    this.props.setFilterDueToday();
  };

  filterDueTomorrow = () => {
    this.setState({
      // isFilterDueTomorrow: true,
      // isFilterDueToday: false
    });
    this.props.setFilterDueTomorrow();
    this.props.unsetFilterDueToday();
  };

  notFilterDueToday = () => {
    this.setState({
      // isFilterDueToday: false,
      // isFilterDueTomorrow: false
    });
    this.props.unsetFilterDueTomorrow();
    this.props.unsetFilterDueToday();
  };

  getItems = () => {
    let result = this.state.items.slice();
    if (this.state.filterCompletedTerm === ACTIVE) {
      result = result.filter((item) => item.isCompleted === false);
    } else if (this.state.filterCompletedTerm === COMPLETED) {
      result = result.filter((item) => item.isCompleted === true);
    }
    if (this.props.isFilterImportant) {
      result = result.filter((item) => item.isImportant === true);
    }
    if (this.props.isFilterDueToday) {
      result = result.filter((item) => item.isDueToday === true && item.isDueTomorrow === false);
    }
    if (this.props.isFilterDueTomorrow) {
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
            <Button relax onClick={this.relaxButton}>
             {
               (this.props.isPlayRelaxAudio === false) ?
               // (this.props.isPlayRelaxAudio === false) ?
               "I need to relax" :
              "Back to work"
            }
            </Button>

            {(this.props.isPlayRelaxAudio === true) ?
         //        {(this.props.isPlayRelaxAudio === true) ?
              <audio autoplay="autoplay" loop>
                <source src="relax.ogg" type="audio/ogg" />
              </audio>  : null}
         </ItemsCounter>
          <Clearfix></Clearfix>
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
              pressed={!this.props.isFilterImportant}>All
          </Button>
            <Button onClick={this.filterImportant}
              pressed={this.props.isFilterImportant} >Important!
            </Button>
          </div>
          }
          {(this.allItemsCounter() === 0) ? null:
          <div>

            <Button onClick={this.notFilterDueToday}
              pressed={!this.props.isFilterDueToday && !this.props.isFilterDueTomorrow}>All
          </Button>
            <Button onClick={this.filterDueToday}
              pressed={this.props.isFilterDueToday}>Due Today
            </Button>

            <Button onClick={this.filterDueTomorrow}
              pressed={this.props.isFilterDueTomorrow}>Due Tomorrow
            </Button>
          </div>
          }
          {/* {(this.allItemsCounter() === 0) ? <p>ничего нет</p>: <p>что-то написали</p>} */}

          {(this.state.filterCompletedTerm === ACTIVE) && (this.props.isFilterImportant === false) &&
           (this.allItemsCounter() >= 1)  &&
            (this.itemsCounter() === 0) ?
            <FilteredMessagesBox>
              <FilteredMessage>{"You don't have active tasks yet!"}</FilteredMessage>
            </FilteredMessagesBox> : null}

          {(this.state.filterCompletedTerm === COMPLETED) && (this.props.isFilterImportant === false) && (this.allItemsCounter() >= 1) &&
            (this.itemsCounter() === 0) ?
            <FilteredMessagesBox>
              <FilteredMessage>{"You don't have completed tasks yet!"}</FilteredMessage>
            </FilteredMessagesBox> : null}

          {(this.state.filterCompletedTerm === ACTIVE) && (this.props.isFilterImportant === true) &&
            (this.itemsCounter() === 0) ?
            <FilteredMessagesBox>
              <FilteredMessage>{"You don't have active and important tasks yet!"}</FilteredMessage>
            </FilteredMessagesBox> : null}

          {(this.state.filterCompletedTerm === ALL) && (this.props.isFilterImportant === true) &&
            (this.itemsCounter() === 0) ?
            <FilteredMessagesBox>
              <FilteredMessage>{"You don't have important tasks!"}</FilteredMessage>
            </FilteredMessagesBox> : null}

          {(this.state.filterCompletedTerm === COMPLETED) && (this.props.isFilterImportant === true) &&
            (this.itemsCounter() === 0) ?
            <FilteredMessagesBox>
              <FilteredMessage>{"You don't have completed and important tasks yet!"}</FilteredMessage>
            </FilteredMessagesBox> : null}

          {(this.props.isFilterDueToday === true)  &&
           (this.itemsCounter() === 0) ?
           <FilteredMessagesBox>
            <FilteredMessage>You have no tasks for today!</FilteredMessage>
           </FilteredMessagesBox> : null}

          {(this.props.isFilterDueTomorrow === true) &&
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

const mapStateToProps = (state) => {
  return {
    isFilterDueTomorrow: state.isFilterDueTomorrow,
    isFilterDueToday: state.isFilterDueToday,
    isFilterImportant: state.isFilterImportant,
    isPlayRelaxAudio: state.isPlayRelaxAudio
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterDueTomorrow: () => dispatch(setFilterDueTomorrow()),
    unsetFilterDueTomorrow: () => dispatch(unsetFilterDueTomorrow()),
    setFilterDueToday: () => dispatch(setFilterDueToday()),
    unsetFilterDueToday: () => dispatch(unsetFilterDueToday()),
    setFilterImportant: () => dispatch(setFilterImportant()),
    unsetFilterImportant: () => dispatch(unsetFilterImportant()),
    toggleRelaxButton: () => dispatch(toggleRelaxButton())
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
// export default App;
