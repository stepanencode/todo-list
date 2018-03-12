import React, { Component } from 'react'
import List from "./List";

// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: []
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
    console.log(index)
    // this.setState({items: this.item.items})
    this.setState(prevState => ({
      items: prevState.items.filter((item, itemIndex) => itemIndex !== index)
    }))
  };

  render() {
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
      <List items={this.state.items} handleDelete={this.handleDelete}/>
      </div>
    );
  }
}

export default App;
