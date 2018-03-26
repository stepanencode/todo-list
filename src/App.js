import React, { Component } from 'react'
import List from "./List";
import uuidv4 from "uuid";


const ACTIVE = 'active';
const ALL = 'all';
const COMPLETED = 'completed';
const WELLDONE_COUNTERS = [3, 5, 10];
const TEXT_SAMPLE = {'Who is a good boy?': "it's you!", 'Cъешь ещё этих мягких французских булок': 'да выпей чаю'};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: [],
      filterCompletedTerm: ALL,
      isFilterImportant: false,
      isWellDoneVisible: false,
      isFilterDueToday: false,
      isFilterDueTomorrow: false
    };
  }

  okButton = (event) => {
    this.setState((prevState) => ({isWellDoneVisible: false}));
    console.log('down');
  };

  onChange = (event) => {
    this.setState({
        term: event.target.value
    });
  };

  textCompare = (event) => {
    for (let i in TEXT_SAMPLE) {
      if (this.state.term === i) {
        alert(TEXT_SAMPLE[i])
      }
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.term.trim()) {
      this.textCompare();
      this.setState({
        term: '',
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
      alert('Text must not be empty');
    }
  };

  handleDelete = (uuid) => {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.uuid !== uuid)
    }))
  };

  handleComplete = (uuid) => {
    this.setState((prevState) => {
      let items = prevState['items'].slice();
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
      let items = prevState['items'].slice();
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
      let items = prevState['items'].slice();
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
      let items = prevState['items'].slice();
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
      let items = prevState['items'].slice();
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
      let items = prevState['items'].slice();
      for (let item of items) {
        if (item.uuid === uuid) {
          item.text = text;
        }
      }
      return {items: items};
    });
  };

  filterAll = (event) => {
    console.log('click');
    this.setState({
      filterCompletedTerm: ALL
    })
  };

  filterActive = (event) => {
    console.log('click');
    this.setState({
      filterCompletedTerm: ACTIVE
    })
  };

  filterCompleted = (event) => {
    console.log('click');
    this.setState({
      filterCompletedTerm: COMPLETED
    })
  };

  filterImportant = (event) => {
    this.setState({
      isFilterImportant: true
    });
  };

  notFilterImportant = (event) => {
    this.setState({
      isFilterImportant: false
    });
  };

  filterDueToday = (event) => {
    this.setState({
      isFilterDueToday: true,
      isFilterDueTomorrow: false
    })
  };

  filterDueTomorrow = (event) => {
    this.setState({
      isFilterDueTomorrow: true,
      isFilterDueToday: false
    })
  };


  notFilterDueToday = (event) => {
    this.setState({
      isFilterDueToday: false,
      isFilterDueTomorrow: false
    })
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
    return this.getItems().length
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
    let classFilterAll,
      classFilterActive,
      classFilterCompleted,
      classFilterImportant,
      classNotFilterImportant,
      classVisibleHidden,
      classFilterDueToday,
      classFilterDueTomorrow,
      classNotFilterDueDate;

    [classFilterAll,
      classFilterActive,
      classFilterCompleted,
      classFilterImportant,
      classNotFilterImportant,
      classVisibleHidden,
      classFilterDueToday,
      classFilterDueTomorrow,
      classNotFilterDueDate] = ['', '', '', '', '', '', '', '', ''];

    if (this.state.filterCompletedTerm === ACTIVE) {
      classFilterActive += ' pressedButton';
    } else if (this.state.filterCompletedTerm === COMPLETED) {
      classFilterCompleted += ' pressedButton';
    } else {
      classFilterAll += ' pressedButton';
    }

    if (this.state.isFilterImportant) {
      classFilterImportant += ' pressedButton'
    }  else {
      classNotFilterImportant += ' pressedButton';
    }

    if(this.state.isFilterDueToday) {
      classFilterDueToday += ' pressedButton'
    } else if (this.state.isFilterDueTomorrow) {
      classFilterDueTomorrow += ' pressedButton'
    } else {
      classNotFilterDueDate += ' pressedButton'
    }


    classVisibleHidden = (this.state.isWellDoneVisible ? 'visible' : 'visible-hidden');

    return (
      <div>
        Hello!
          <span className="items-counter">
            {(this.itemsCounter() === 0) ? <span>Let's get started!</span> : <span>You have {this.itemsCounter()} items</span>}
          </span>
        <form className="App" onSubmit={this.onSubmit}>
          <input
            value={this.state.term}
            onChange={this.onChange}
          />
          <button>Submit</button>
        </form>
        {((this.state.isFilterImportant === true) && (this.getItems().length === 0)) ? <p>You don't have any important items!</p> : null}
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
          <button onClick={this.filterAll} className={classFilterAll}>All</button>
          <button onClick={this.filterActive} className={classFilterActive}>Active</button>
          <button onClick={this.filterCompleted} className={classFilterCompleted}>Completed</button>
          {(this.state.items.filter(item => item.isCompleted === true)).length > 0 ?
            (<button onClick={this.clearCompleted}>Clear completed</button>) :
            null}
        </div>
        <div>
          <button onClick={this.notFilterImportant} className={classNotFilterImportant}>All</button>
          <button onClick={this.filterImportant} className={classFilterImportant}>Important!</button>
        </div>

        <div>
          <button onClick={this.notFilterDueToday} className={classNotFilterDueDate}>All</button>
          <button onClick={this.filterDueToday} className={classFilterDueToday}>Due Today</button>
          <button onClick={this.filterDueTomorrow} className={classFilterDueTomorrow}>Due Tomorrow</button>
        </div>

        <div className={classVisibleHidden}>
          <div className="welldone-box">
            <p className="welldone-text">Well done! You have already completed {this.getCompletedItems().length} items</p>
            <button onClick={this.okButton} >OK</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

