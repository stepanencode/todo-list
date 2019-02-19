import React, {Component} from "react";

import {
  Svg,
  CommentList,
  CommentText
} from './styles'

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
    };
  }

  handleDeleteComment = () => {
    this.props.handleDeleteComment(this.props.commentItem.uuidComment);
  };

  handleCommentChange = (event) => {
    this.props.handleCommentChange(this.props.commentItem.uuidComment, event.target.value);
  };

  handleLike = () => {
    this.setState({
      isLiked: !this.state.isLiked
    });
  };

  render() {
    /* eslint-disable quotes */
    return(
      <CommentList>
        <CommentText>{this.props.commentItem.text}</CommentText>
        {
          this.state.isLiked ?
            <Svg src={require(`!raw-loader!../../../../../icons/like-comment-item.svg`)}
              raw={true}
              onClick={this.handleLike}
              data-testid="comment-liked"/> :
            <Svg src={require(`!raw-loader!../../../../../icons/notlike-comment-item.svg`)}
              raw={true}
              onClick={this.handleLike}
              data-testid="comment-not-liked"/>
        }
        <Svg src={require(`!raw-loader!../../../../../icons/delete-comment-item.svg`)}
          raw={true} onClick={this.handleDeleteComment} data-testid="comment-delete"/>
      </CommentList>
    );
    /* eslint-enable quotes */
  }
}

export default CommentItem;
