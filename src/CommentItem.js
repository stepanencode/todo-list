import React, {Component} from "react";
import styled from "styled-components";
import InlineSVG from 'svg-inline-react';

const Svg = styled(InlineSVG)`
    vertical-align: middle;
    margin: 0 10px;
`;

const CommentList = styled.li`
  padding-left: 15px;
  list-style: none;
`;

const CommentText = styled.p`
  font-size: 18px;
  display: inline-block;
  color: #000080;
  margin-right: 10px;
`;

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
    return(
      <CommentList>
        <CommentText>{this.props.commentItem.text}</CommentText>
        {
          this.state.isLiked ?
            <Svg src={require(`!raw-loader!./icons/like-comment-item.svg`)} 
              raw={true} 
              onClick={this.handleLike}
              data-testid="comment-liked"/> :
             <Svg src={require(`!raw-loader!./icons/notlike-comment-item.svg`)} 
              raw={true} 
              onClick={this.handleLike}
              data-testid="comment-not-liked"/>
        }
        <Svg src={require(`!raw-loader!./icons/delete-comment-item.svg`)} 
          raw={true} onClick={this.handleDeleteComment} data-testid="comment-delete"/>
      </CommentList>
    );
  }
}

export default CommentItem;
