import React, {Component} from 'react'


class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isHover: false
    }
  }

  handleDelete = (event) => {
    this.props.handleDelete(this.props.index);
  };

  handleEdit = (event) => {
    console.log('Edit');
    this.setState({
      isEdit: true
    })
  };

  handleSave = (event) => {
    this.setState({
      isEdit: false
    })
  };

  handleChange = (event) => {
    this.props.handleChange(this.props.index, event.target.value);

  };

  itemMouseOver = (event) => {
    console.log('Hover!');
    this.setState({
      isHover: true
    })
  };

  itemMouseOut = (event) => {
    this.setState({
      isHover: false
    })
  };


  render() {
    let className = 'list_element';
    if (this.state.isHover) {
      className += ' active';
    } else {
      className = 'list_element';
    }
    return(
      <li  key={this.props.index} >
        {
          this.state.isEdit ?
            ( <span>
                <input value={this.props.item} onChange={this.handleChange}/>
                <button onClick={this.handleSave}>Save</button>
              </span>
            ) : (
              <span>
                <label className={className} onMouseOver={this.itemMouseOver} onMouseOut={this.itemMouseOut}>{this.props.item}</label>
                <button onClick={this.handleEdit}>Edit</button>
              </span>
          )

        }




        <button onClick={this.handleDelete}>Delete</button>
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