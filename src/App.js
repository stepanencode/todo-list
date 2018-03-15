import React, { Component } from 'react'
import List from "./List";

// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: [],
      filterTerm: 'all'
    };
  }

  onChange = (event) => {
    this.setState({
        term: event.target.value
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      term: '',
      items: [
        ...this.state.items,
        this.state.term
      ]
    });
  };

  handleDelete = (index) => {
    this.setState(prevState => ({
      items: prevState.items.filter((item, itemIndex) => itemIndex !== index)
    }))
  };

  handleChange = (index, item) => {
    this.setState((prevState) => {
      let items = prevState['items'].slice();
      items[index] = item;
      return {items: items};
    });
  };

  filterAll = (event) => {
    console.log('click');
    this.setState({
      filterTerm: 'all'
    })
  };

  filterActive = (event) => {
    console.log('click');
    this.setState({
      filterTerm: 'active'
    })
  };

  filterCompleted = (event) => {
    console.log('click');
    this.setState({
      filterTerm: 'completed'
    })
  };

  render() {
    let classFilterAll, classFilterActive, classFilterCompleted = '';

    if (this.state.filterTerm === 'active') {
      classFilterActive += ' pressedButton';
    } else if (this.state.filterTerm === 'completed') {
      classFilterCompleted += ' pressedButton';
    } else {
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
        <List items={this.state.items} handleDelete={this.handleDelete} handleChange={this.handleChange}/>
        <div>
          <button onClick={this.filterAll} className={classFilterAll}>All</button>
          <button onClick={this.filterActive} className={classFilterActive}>Active</button>
          <button onClick={this.filterCompleted} className={classFilterCompleted}>Completed</button>
        </div>
      </div>
    );
  }
}

export default App;
