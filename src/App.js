import React, { Component } from "react";
import { connect } from "react-redux";
import List from "./List";
import uuidv4 from "uuid";
import styled, { css } from "styled-components";
import { keyframes } from "styled-components";
import InlineSVG from "svg-inline-react";
import { injectGlobal } from "styled-components";
import "normalize.css";
import Gugi from "./fonts/Gugi-Regular.ttf";
import img from "./main-background.jpg";
import { setFilterDueTomorrow, unsetFilterDueTomorrow, setFilterDueToday, unsetFilterDueToday, setFilterImportant, unsetFilterImportant, toggleRelaxButton,
  visibleWelldoneMessage, unvisibleWelldoneMessage, filterCompletedAll, filterCompletedActive, filterCompletedDone, setTerm, addTodo, deleteItem, toggleItemImportant,
  setItemComplete, clearCompletedItems, setDueTodayItem, setDueTomorrowItem, unsetDueTodayItem, unsetDueTomorrowItem, setChangeItem } from "./actions";
import { completedFilter } from "./reducers";
import LogInLink from "./LogInLink";
import SignUpLink from "./SignUpLink";


const Svg = styled(InlineSVG)`

  ${props => props.position && css`
    position: absolute;
    top: -15px;
    right: -19px;
    vertical-align: bottom;
    margin-left: 10px;
  `}

  ${props => props.add_item && css`
    vertical-align: bottom;
    margin-left: 10px;
  `}

  ${props => props.user && css`
    position: absolute;
    top: 5px;
    left: 5px;
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
  //background-color: blue;
`;

const Header = styled.header`
  background-color: #025278;
  //background-color: #5dcde3;
  width: 100%;
  height: 60px;
`;

const HeaderWrapper = styled.div `
  margin: auto;
  width: 80%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

const User = styled.div `
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #faf3cf;
  //background-color: #e39f7a;
  margin: 5px;
  float: right;
`;

const UserName = styled.p `
  font-family: Gugi;
  color: #025278;
  font-size: 20px;
  text-align: center;
  margin: 0;
  line-height: 50px;
`;

const ItemsCounter = styled.div`
  margin-top: 30px;
`;

const ItemsCounterText = styled.p`
  font-family: Gugi;
  display: inline-block;
  font-size: 55px;
  color: #ffffff;
  opacity: 0.9;
  margin: 0;
  padding-right: 2px;
  //float: left;
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
  margin-left: 5px;
  margin-top: 15px;
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

  &:hover  {
    color: #025278;
  }

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

    padding-top: 8px;
    padding-bottom: 8px;
    margin-top: 10px;

    &:hover  {
      color: #025278;
      background: #faf3cf;
      border-color: white;
    }
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

const WELLDONE_COUNTERS = [3, 5, 10];
const TEXT_SAMPLE = {"Who is a good boy?": "it's you!", "Cъешь ещё этих мягких французских булок": "да выпей чаю!"};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  relaxButton = () => {
    this.props.toggleRelaxButton();
  };

  okButton = () => {
    this.props.unvisibleWelldoneMessage();
  };

  onChange = (event) => {
    this.props.setTerm(event.target.value);
  };

  textCompare = () => {
    for (let i in TEXT_SAMPLE) {
      if (this.props.term === i) {
        alert(TEXT_SAMPLE[i]);
      }
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.setTerm("");
    if (this.props.term.trim()) {
      this.textCompare();
      this.props.addTodo({
        text: this.props.term.trim(),
        isCompleted: false,
        isImportant: false,
        uuid: uuidv4(),
        isDueToday: false,
        isDueTomorrow: false
      });
    } else {
      alert("Text must not be empty");
    }
  };

  handleDelete = (uuid) => {
    this.props.deleteItem(uuid);
  };

  handleComplete = (uuid) => {
    this.props.setItemComplete(uuid);
    for (let counter of WELLDONE_COUNTERS) {
      if (this.getCompletedItems().length === counter) {
        return this.props.visibleWelldoneMessage();
      }
    } return this.props.unvisibleWelldoneMessage();
  };

  handleImportant = (uuid) => {
    this.props.toggleItemImportant(uuid);
  };

  handleDueToday = (uuid) => {
    this.props.setDueTodayItem(uuid);
  };

  handleRemoveDueToday = (uuid) => {
    this.props.unsetDueTodayItem(uuid);
  };

  handleRemoveDueTomorrow = (uuid) => {
    this.props.unsetDueTomorrowItem(uuid);
  };

  handleDueTomorrow = (uuid) => {
    this.props.setDueTomorrowItem(uuid);
  };

  clearCompleted = () => {
    this.props.clearCompletedItems();
  };

  handleChange = (uuid, text) => {
    this.props.setChangeItem(uuid, text);
  };

  filterAll = () => {
    this.props.filterCompletedAll();
  };

  filterActive = () => {
    this.props.filterCompletedActive();
  };

  filterCompleted = () => {
    this.props.filterCompletedDone();
  };

  filterImportant = () => {
    this.props.setFilterImportant();
  };

  notFilterImportant = () => {
    this.props.unsetFilterImportant();
  };

  filterDueToday = () => {
    this.props.unsetFilterDueTomorrow();
    this.props.setFilterDueToday();
  };

  filterDueTomorrow = () => {
    this.props.setFilterDueTomorrow();
    this.props.unsetFilterDueToday();
  };

  notFilterDueToday = () => {
    this.props.unsetFilterDueTomorrow();
    this.props.unsetFilterDueToday();
  };

  getItems = () => {
    let result = this.props.items.slice();
    if (this.props.filterCompletedTerm === completedFilter.ACTIVE) {
      result = result.filter((item) => item.isCompleted === false);
    } else if (this.props.filterCompletedTerm === completedFilter.DONE) {
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
    return this.props.items.filter((item) => item.isCompleted === true);
  };

  itemsCounter = () => {
    return this.getItems().length;
  };

  allItemsCounter = () => {
    return this.props.items.length;
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
    /* eslint-disable quotes */
    return (
      <Body>
      <Header>
      <HeaderWrapper>
        <span>
          <LogInLink />
          <SignUpLink />
          <Button relax onClick={this.relaxButton}>
            {
              (this.props.isPlayRelaxAudio === false) ?
                "I need to relax" :
                "Back to work"
            }
          </Button>
          {(this.props.isPlayRelaxAudio === true) ?
            <audio autoPlay="autoPlay" loop>
              <source src="relax.ogg" type="audio/ogg" />
            </audio>  : null}
          <User><Svg user src={require(`!raw-loader!./icons/user.svg`)} raw={true}  width="2.78em" height="2.78em"/></User>

        </span>
        </HeaderWrapper>
      </Header>
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

          </ItemsCounter>

          <form onSubmit={this.onSubmit} data-testid="submit">
            <Input value={this.props.term}
              onChange={this.onChange}
              maxLength={100}
              placeholder={"Do you have new tasks?"}
              data-testid="input-add-item"
            />
            <span onClick={this.onSubmit} data-testid="submit-button">
              <Svg add_item src={require(`!raw-loader!./icons/add-item.svg`)} raw={true}/>
            </span>
          </form>




          <FilterWrapper>
            <div>
              {(this.allItemsCounter() === 0) ? null:
                <span>
                  <Button onClick={this.filterAll}
                    pressed={this.props.filterCompletedTerm === completedFilter.ALL}>All
                  </Button>
                  <Button onClick={this.filterActive} data-testid="active"
                    pressed={this.props.filterCompletedTerm === completedFilter.ACTIVE}>Active
                  </Button>
                  <Button onClick={this.filterCompleted} data-testid="completed"
                    pressed={this.props.filterCompletedTerm === completedFilter.DONE}>Completed
                  </Button>
                  {
                    ((this.props.items.filter(item => item.isCompleted === true)).length > 0) ?
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
            {(this.props.filterCompletedTerm === completedFilter.ACTIVE) && (this.props.isFilterImportant === false) &&
            (this.allItemsCounter() >= 1)  &&
            (this.itemsCounter() === 0) ?
              <FilteredMessagesBox>
                <FilteredMessage>{"You don't have active tasks yet!"}</FilteredMessage>
              </FilteredMessagesBox> : null}
            {(this.props.filterCompletedTerm === completedFilter.DONE) && (this.props.isFilterImportant === false) && (this.allItemsCounter() >= 1) &&
            (this.itemsCounter() === 0) ?
              <FilteredMessagesBox>
                <FilteredMessage>{"You don't have completed tasks yet!"}</FilteredMessage>
              </FilteredMessagesBox> : null}
            {(this.props.filterCompletedTerm === completedFilter.ACTIVE) && (this.props.isFilterImportant === true) &&
            (this.itemsCounter() === 0) ?
              <FilteredMessagesBox>
                <FilteredMessage>{"You don't have active and important tasks yet!"}</FilteredMessage>
              </FilteredMessagesBox> : null}
            {(this.props.filterCompletedTerm === completedFilter.ALL) && (this.props.isFilterImportant === true) &&
            (this.itemsCounter() === 0) ?
              <FilteredMessagesBox>
                <FilteredMessage>{"You don't have important tasks!"}</FilteredMessage>
              </FilteredMessagesBox> : null}
            {(this.props.filterCompletedTerm === completedFilter.DONE) && (this.props.isFilterImportant === true) &&
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
          <WellDoneWrapper unvisible={!this.props.isWelldoneMessageVisible}>
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
    /* eslint-enable quotes */
  }
}

const mapStateToProps = (state) => {
  return {
    isFilterDueTomorrow: state.isFilterDueTomorrow,
    isFilterDueToday: state.isFilterDueToday,
    isFilterImportant: state.isFilterImportant,
    isPlayRelaxAudio: state.isPlayRelaxAudio,
    isWelldoneMessageVisible: state.isWelldoneMessageVisible,
    filterCompletedTerm: state.filterCompletedTerm,
    term: state.term,
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterDueTomorrow: () => dispatch(setFilterDueTomorrow()),
    unsetFilterDueTomorrow: () => dispatch(unsetFilterDueTomorrow()),
    setFilterDueToday: () => dispatch(setFilterDueToday()),
    unsetFilterDueToday: () => dispatch(unsetFilterDueToday()),
    setFilterImportant: () => dispatch(setFilterImportant()),
    unsetFilterImportant: () => dispatch(unsetFilterImportant()),
    toggleRelaxButton: () => dispatch(toggleRelaxButton()),
    visibleWelldoneMessage: () => dispatch(visibleWelldoneMessage()),
    unvisibleWelldoneMessage: () => dispatch(unvisibleWelldoneMessage()),
    filterCompletedAll: ()  => dispatch(filterCompletedAll()),
    filterCompletedActive: () => dispatch(filterCompletedActive()),
    filterCompletedDone: () => dispatch(filterCompletedDone()),
    setTerm: (term) => dispatch(setTerm(term)),
    addTodo: (item) => dispatch(addTodo(item)),
    deleteItem: (uuid) => dispatch(deleteItem(uuid)),
    toggleItemImportant: (uuid) => dispatch(toggleItemImportant(uuid)),
    setItemComplete: (uuid) => dispatch(setItemComplete(uuid)),
    clearCompletedItems: () => dispatch(clearCompletedItems()),
    setDueTodayItem: (uuid) => dispatch(setDueTodayItem(uuid)),
    setDueTomorrowItem: (uuid) => dispatch(setDueTomorrowItem(uuid)),
    unsetDueTodayItem: (uuid) => dispatch(unsetDueTodayItem(uuid)),
    unsetDueTomorrowItem: (uuid) => dispatch(unsetDueTomorrowItem(uuid)),
    setChangeItem: (uuid, text) => dispatch(setChangeItem(uuid, text)),
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
// export default App;
