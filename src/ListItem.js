import React, {Component} from 'react'

const ENTERKEY = 13;


class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isHover: false,

    }
  }



  handleComplete = () => {
    this.props.handleComplete(this.props.item.uuid);
  };


  handleDelete = (event) => {
    this.props.handleDelete(this.props.item.uuid);
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
    this.props.handleChange(this.props.item.uuid, event.target.value);
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

  handleImportant = (event) => {
    console.log('Important');
    this.props.handleImportant(this.props.item.uuid);
  };

  onKeyPressed = (event) => {
    if(event.keyCode === ENTERKEY){
      this.handleSave();
    }
  };

  render() {
    let labelClassName = 'list_element';
    if (this.state.isHover) {
      labelClassName += ' active';
    }
    if (this.props.item.isCompleted) {
      labelClassName += ' checked';
    }
    if (this.props.item.isImportant) {
      labelClassName += ' important-item';
    }

    return(
      <li
        onMouseOver={this.itemMouseOver}
        onMouseLeave={this.itemMouseLeave}
        onKeyDown={this.onKeyPressed}

      >
        <input type="checkbox"
          checked={this.props.item.isCompleted}
          onChange={this.handleComplete}
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

            <button onClick={this.handleImportant}>Important!</button>

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
