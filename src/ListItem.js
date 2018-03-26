import React, {Component} from 'react'

const ENTERKEY = 13;

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isHover: false,
      timeLeft: null,
      timer: null,
    }
  }

  startTimer = (timeLeft) => {
    clearInterval(this.state.timer);

    let timer = setInterval(() => {
      let timeLeft = this.state.timeLeft -1;
      if (timeLeft === 0) {
        clearInterval(timer);
        this.handleComplete();
      }
      this.setState({
        timeLeft: timeLeft
      })
    }, 1000);
    return this.setState({
      timeLeft: timeLeft,
      timer: timer
    })
  };

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

  handleDueToday = (event) => {
    console.log('Due Today');
    this.props.handleDueToday(this.props.item.uuid);
  };

  handleRemoveDueDate = (event) => {
    console.log('Remove Due Today');
    this.props.handleRemoveDueDate(this.props.item.uuid);
  };

  handleDueTomorrow = (event) => {
    console.log('Due Tomorrow');
    this.props.handleDueTomorrow(this.props.item.uuid);
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

    let disabledCheckbox = '';
    if (this.props.item.isCompleted) {
      disabledCheckbox += 'disabled'
    }

    let notActiveTomorrow = '';
    if (this.props.item.isDueToday) {
      notActiveTomorrow += ' visible-hidden'
    }

    let notActiveToday = '';
    if (this.props.item.isDueTomorrow) {
      notActiveToday += ' visible-hidden'
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
          disabled={disabledCheckbox}
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


        {this.props.item.isDueToday ?
            <button onClick={this.handleRemoveDueDate}>Remove Due Date</button> :
            <button onClick={this.handleDueToday} className={notActiveToday}>Due Today</button>
        }
        {this.props.item.isDueTomorrow ?
          <button onClick={this.handleRemoveDueDate}>Remove Due Date</button> :
          <button onClick={this.handleDueTomorrow} className={notActiveTomorrow}>Due Tomorrow</button>
        }

            <TimerButton  time='5' startTimer={this.startTimer} item={this.props.item} />
            <TimerDisplay timeLeft={this.state.timeLeft}/>
            {
              this.state.isHover ?
                (
                  <button className='button-delete btn' onClick={this.handleDelete} >
                    Delete
                  </button>
                ) : null
            }
      </li>
    )
  }
}

export default ListItem;

class TimerButton extends Component{

  handleStartTimer = (event) => {
    return this.props.startTimer(this.props.time)
  };

  render() {
    let disabledCheckbox = '';
    if (this.props.item.isCompleted) {
      disabledCheckbox += 'disabled'
    }
    return(
      <button onClick={this.handleStartTimer} disabled={disabledCheckbox}>
        {this.props.time} sec
      </button>
    )
  }
}

class TimerDisplay extends Component {
  render() {
    if(this.props.timeLeft === 0 || this.props.timeLeft === null) {
      return null
    }
    return(
      <p>Осталось времени: {this.props.timeLeft}</p>
    )
  }
}

// export default TimerButton;
// export default TimerDisplay;