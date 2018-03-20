import React, { Component } from 'react'
import List from "./List";

// import './App.css';

const ACTIVE = 'active';
const ALL = 'all';
const COMPLETED = 'completed';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: [],
      filterCompletedTerm: ALL,
      isFilterImportant: false
    };
  }

  onChange = (event) => {
    this.setState({
        term: event.target.value
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.term.trim()) {
      this.setState({
        term: '',
        items: [
          ...this.state.items,
          {text: this.state.term.trim(), isCompleted: false, isImportant: false}
        ]
      });
    } else {
      alert('Text must not be empty');
    }
  };

  handleDelete = (index) => {
    this.setState(prevState => ({
      items: prevState.items.filter((item, itemIndex) => itemIndex !== index)
    }))
  };

  handleComplete = (index) => {
    this.setState((prevState) => {
      let items = prevState['items'].slice();
      items[index]['isCompleted'] = !items[index]['isCompleted'];
      return {items: items};
    });
  };

  handleImportant = (index) => {
    this.setState((prevState) => {
      let items = prevState['items'].slice();
      items[index]['isImportant'] = !items[index]['isImportant'];
      return {items: items};
    });
  };

  clearCompleted = () => {
    this.setState((prevState) => {
      let items = prevState['items'].slice();
      return {items: prevState.items.filter((item, index) => items[index]['isCompleted'] === false)};
    });
  };

  handleChange = (index, item) => {
    this.setState((prevState) => {
      let items = prevState['items'].slice();
      items[index]['text'] = item;
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
    return result;
  };

  itemsCounter = () => {
    return this.getItems().length
  };



  render() {
    let classFilterAll, classFilterActive, classFilterCompleted, classFilterImportant, classNotFilterImportant;
    [classFilterAll, classFilterActive, classFilterCompleted, classFilterImportant, classNotFilterImportant] = ['', '', '', '', ''];

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

        />
        <div>
          <button onClick={this.filterAll} className={classFilterAll}>All</button>
          <button onClick={this.filterActive} className={classFilterActive}>Active</button>
          <button onClick={this.filterCompleted} className={classFilterCompleted}>Completed</button>
          {(this.state.items.filter(item => item.isCompleted === true)).length > 0 ? (<button onClick={this.clearCompleted}>Clear completed</button>) : null}
        </div>

        <div>
          <button onClick={this.notFilterImportant} className={classNotFilterImportant}>All</button>
          <button onClick={this.filterImportant} className={classFilterImportant}>Important!</button>
        </div>
      </div>
    );
  }
}

export default App;
