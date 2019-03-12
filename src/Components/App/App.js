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
} from "./styles";
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

const WELLDONE_COUNTERS = [1, 4, 8];
const TEXT_SAMPLE = {"Who is a good boy?": "it's you!", "Cъешь ещё этих мягких французских булок": "да выпей чаю!"};

class App extends Component {
  componentDidMount() {
    this.props.fetchRadioMessageBegin();
    this.props.fetchTestTextMessageBegin();
    this.props.fetchTodoBegin();
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

  handleComplete = (id) => {
    this.props.setItemComplete(id);
    for (let counter of WELLDONE_COUNTERS) {
      if (this.getCompletedItems().length === counter) {
        return this.props.visibleWelldoneMessage();
      }
    } return this.props.unvisibleWelldoneMessage();
  };

  handleImportant = (id, item) => {
    this.props.toggleItemImportant(id, item);
  };

  handleDueToday = (id) => {
    this.props.setDueTodayItem(id);
  };

  handleRemoveDueToday = (id) => {
    this.props.unsetDueTodayItem(id);
  };

  handleRemoveDueTomorrow = (id) => {
    this.props.unsetDueTomorrowItem(id);
  };

  handleDueTomorrow = (id) => {
    this.props.setDueTomorrowItem(id);
  };

  handleChange = (id, text) => {
    this.props.setChangeItem(id, text);
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
              <Button relax onClick={this.props.toggleRelaxButton}>
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
                  <Button onClick={this.props.filterCompletedAll}
                    pressed={this.props.filterCompletedTerm === completedFilter.ALL}>All
                  </Button>
                  <Button onClick={this.props.filterCompletedActive} data-testid="active"
                    pressed={this.props.filterCompletedTerm === completedFilter.ACTIVE}>Active
                  </Button>
                  <Button onClick={this.props.filterCompletedDone} data-testid="completed"
                    pressed={this.props.filterCompletedTerm === completedFilter.DONE}>Completed
                  </Button>
                  {
                    ((this.props.items.filter(item => item.isCompleted === true)).length > 0) ?
                      <Button bigger
                        onClick={this.props.clearCompletedItems}>Clear completed
                      </Button> :
                      null
                  }
                </span>
              }
            </div>
            {(this.allItemsCounter() === 0) ? null:
              <div>
                <Button onClick={this.props.unsetFilterImportant}
                  pressed={!this.props.isFilterImportant}>All
                </Button>
                <Button onClick={this.props.setFilterImportant}
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
              <Svg src={require(`!raw-loader!../../icons/close-popup.svg`)} raw={true} onClick={this.props.unvisibleWelldoneMessage}
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
    toggleItemImportant: (id, item) => dispatch(toggleItemImportant(id, item)),
    setItemComplete: (id) => dispatch(setItemComplete(id)),
    clearCompletedItems: () => dispatch(clearCompletedItems()),
    setDueTodayItem: (id) => dispatch(setDueTodayItem(id)),
    setDueTomorrowItem: (id) => dispatch(setDueTomorrowItem(id)),
    unsetDueTodayItem: (id) => dispatch(unsetDueTodayItem(id)),
    unsetDueTomorrowItem: (id) => dispatch(unsetDueTomorrowItem(id)),
    setChangeItem: (id, text) => dispatch(setChangeItem(id, text)),
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
