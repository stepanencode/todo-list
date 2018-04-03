import React, {Component} from "react";
import FaHeartO from "react-icons/lib/fa/heart-o";

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleCommentChange = (event) => {
    this.props.handleCommentChange(this.props.commentItem, event.target.value);
  };

  handleLike = () => {
    this.props.handleLike(this.props.index);
  };

  render() {
    let heartStyle = "";
    if(this.props.commentItem.isLiked) {
      heartStyle += " liked";
    }

    return(
      <li>
        <p>{this.props.commentItem.text}</p>
        <FaHeartO
          onClick={this.handleLike}
          className={heartStyle}
        />
      </li>
    );
  }
}

export default CommentItem;
