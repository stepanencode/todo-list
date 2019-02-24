import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Svg,
  FilterWrapper,
  Body,
  ToDoWrapper,
  Header,
  HeaderWrapper,
  User,
  ItemsCounter,
  ItemsCounterText,
  Input,
  Button,
  WellDoneBox,
  WellDoneMessage,
  WellDoneWrapper,
  FilteredMessagesBox,
  FilteredMessage
} from './styles'

import {
  setFilterDueTomorrow,
  unsetFilterDueTomorrow,
  setFilterDueToday,
  unsetFilterDueToday,
  setFilterImportant,
  unsetFilterImportant,
  toggleRelaxButton,
  visibleWelldoneMessage,
  unvisibleWelldoneMessage,
  filterCompletedAll,
  filterCompletedActive,
  filterCompletedDone,
  setTerm,
  createTodoBegin,
  deleteTodoBegin,
  toggleItemImportant,
  setItemComplete,
  clearCompletedItems,
  setDueTodayItem,
  setDueTomorrowItem,
  unsetDueTodayItem,
  unsetDueTomorrowItem,
  setChangeItem,
  fetchTodoBegin } from "../../actions/todo";
import { fetchRadioMessageBegin } from "../../actions/radio";
import { fetchTestTextMessageBegin } from "../../actions/testText";

import { completedFilter } from "../../reducers/todoReducer";

import List from "../TodoPage/List/index";
import LogInLink from "../TodoPage/NavLinks/LogInLink/index";
import SignUpLink from "../TodoPage/NavLinks/SignUpLink/index";
import UserLink from "../TodoPage/NavLinks/UserLink/index";


const WELLDONE_COUNTERS = [3, 5, 10];
const TEXT_SAMPLE = {"Who is a good boy?": "it's you!", "Cъешь ещё этих мягких французских булок": "да выпей чаю!"};

class App extends Component {
  componentDidMount() {
    this.props.fetchRadioMessageBegin();
    this.props.fetchTestTextMessageBegin();
    this.props.fetchTodoBegin();
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
      this.props.createTodoBegin({
        text: this.props.term.trim(),
        isCompleted: false,
        isImportant: false,
        isDueToday: false,
        isDueTomorrow: false
      });
    } else {
      alert("Text must not be empty");
    }
  };

  handleDelete = (id) => {
    this.props.deleteTodoBegin(id);
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
                this.props.radio.message.on :
                this.props.radio.message.off
            }

          {(this.props.isPlayRelaxAudio === true) ?
            <audio autoPlay="autoPlay" loop>
              <source src="relax.ogg" type="audio/ogg" />
            </audio>  : null}
</Button>

          {/* <span>{this.props.testText.message}</span> */}


          <User><UserLink /></User>
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
              <Svg add_item src={require(`!raw-loader!../../icons/add-item.svg`)} raw={true}/>
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
          <WellDoneWrapper unvisible={!this.props.isWelldoneMessageVisible} >
            <WellDoneBox >
              <WellDoneMessage>Well done! You have already completed {this.getCompletedItems().length} items
              </WellDoneMessage>
              <Svg src={require(`!raw-loader!../../icons/close-popup.svg`)} raw={true} onClick={this.okButton}
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
    isFilterDueTomorrow: state.todo.isFilterDueTomorrow,
    isFilterDueToday: state.todo.isFilterDueToday,
    isFilterImportant: state.todo.isFilterImportant,
    isPlayRelaxAudio: state.todo.isPlayRelaxAudio,
    isWelldoneMessageVisible: state.todo.isWelldoneMessageVisible,
    filterCompletedTerm: state.todo.filterCompletedTerm,
    term: state.todo.term,
    items: state.todo.items,
    radio: state.radio,
    testText: state.testText,
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
    createTodoBegin: (item) => dispatch(createTodoBegin(item)),
    toggleItemImportant: (uuid) => dispatch(toggleItemImportant(uuid)),
    setItemComplete: (uuid) => dispatch(setItemComplete(uuid)),
    clearCompletedItems: () => dispatch(clearCompletedItems()),
    setDueTodayItem: (uuid) => dispatch(setDueTodayItem(uuid)),
    setDueTomorrowItem: (uuid) => dispatch(setDueTomorrowItem(uuid)),
    unsetDueTodayItem: (uuid) => dispatch(unsetDueTodayItem(uuid)),
    unsetDueTomorrowItem: (uuid) => dispatch(unsetDueTomorrowItem(uuid)),
    setChangeItem: (uuid, text) => dispatch(setChangeItem(uuid, text)),
    fetchRadioMessageBegin: () => dispatch(fetchRadioMessageBegin()),
    fetchTestTextMessageBegin: () => dispatch(fetchTestTextMessageBegin()),
    fetchTodoBegin: () => dispatch(fetchTodoBegin()),
    deleteTodoBegin: (id) => dispatch(deleteTodoBegin(id)),
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
