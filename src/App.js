import React, { Component } from 'react'
import List from "./List";

// import './App.css';

const ACTIVE = 'active';
const ALL = 'all';
const COMPLETED = 'completed';
const IMPORTANT = 'important';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: [],
      filterTerm: ALL
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
      filterTerm: ALL
    })
  };

  filterActive = (event) => {
    console.log('click');
    this.setState({
      filterTerm: ACTIVE
    })
  };

  filterCompleted = (event) => {
    console.log('click');
    this.setState({
      filterTerm: COMPLETED
    })
  };

  filterImportant = (event) => {
    this.setState({
      filterTerm: IMPORTANT
    })
  };

  getItems = () => {
    if (this.state.filterTerm === ACTIVE ) {
      return this.state.items.filter((item) => item.isCompleted === false);
     } else if (this.state.filterTerm === COMPLETED) {
      return this.state.items.filter((item) => item.isCompleted === true);
    } else if (this.state.filterTerm === IMPORTANT ) {
      return this.state.items.filter((item) => item.isImportant === true);
    } else {
      return this.state.items;
    }
  };

  render() {
    let classFilterAll, classFilterActive, classFilterCompleted, classFilterImportant;
    [classFilterAll, classFilterActive, classFilterCompleted, classFilterImportant] = ['', '', '', ''];

    if (this.state.filterTerm === ACTIVE) {
      classFilterActive += ' pressedButton';
    } else if (this.state.filterTerm === COMPLETED) {
      classFilterCompleted += ' pressedButton';
    }  else if (this.state.filterTerm === IMPORTANT) {
      classFilterImportant += ' pressedButton'
    }  else {
    classFilterAll += ' pressedButton';
    }

    return (
      <div>
        Hello!
        <form className="App" onSubmit={this.onSubmit}>
          <input
            value={this.state.term}
            onChange={this.onChange}
          />
          <button>Submit</button>
        </form>
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
        </div>

        <div>
          <button onClick={this.filterAll} className={classFilterAll}>All</button>
          <button onClick={this.filterImportant} className={classFilterImportant}>Important!</button>
        </div>
      </div>
    );
  }
}

export default App;
