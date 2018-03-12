import React, {Component} from 'react'


class ListItem extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     editing: false
  //   }
  // }

  onDoubleClick = (event) => {
    this.props.handleDelete(this.props.index);
  };

  render() {
    return(
      <li key={this.props.index} onDoubleClick={this.onDoubleClick}>
        {this.props.item}
      </li>
    )
  }
}

export default ListItem;

// const ListItem = (props) => (
//   <li key={props.index}>
//     {props.item}
//   </li>
// );