import React, {Component} from 'react'


class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isHover: false,
      isChecked: false
    }
  }

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

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

  itemMouseLeave = (event) => {
    this.setState({
      isHover: false
    })
  };

  render() {
    let labelClassName = 'list_element';
    if (this.state.isHover) {
      labelClassName += ' active';
    }
    if (this.state.isChecked) {
      labelClassName += ' checked';
    }

    return(
      <li key={this.props.index} onMouseOver={this.itemMouseOver} onMouseLeave={this.itemMouseLeave}>
        <input type="checkbox"
          checked={this.state.isChecked}
          onChange={this.toggleChange}
        />

            {
              this.state.isEdit ?
                (<span>
                <input type='text' value={this.props.item.text} onChange={this.handleChange}/>
                <button onClick={this.handleSave}>Save</button>
              </span>
                ) : (
                  <span>
                <label className={labelClassName}>{this.props.item.text}</label>
                <button onClick={this.handleEdit}>Edit</button>
              </span>
                )
            }

            {
              this.state.isHover ?
                (
                  <button className='button-delete btn' onClick={this.handleDelete}>
                    Delete
                  </button>
                ) : null
            }

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