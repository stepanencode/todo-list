import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import CommentList from "./CommentList";


class CommentField extends Component{
  constructor(props) {
    super(props);
    this.state = {
      commentText: "",
      commentItems: []
    };
  }

  commentOnChange = (event) => {
    this.setState({
      commentText: event.target.value
    });
  };

  commentOnSubmit = (event) => {
    event.preventDefault();
    if (this.state.commentText.trim()) {
      this.setState({
        commentText: "",
        commentItems: [
          ...this.state.commentItems,
          {text: this.state.commentText.trim(),
            isLiked: false}
        ]
      });
    } else {
      alert("Text must not be empty");
    }
  };

  handleLike = (index) => {
    this.setState((prevState) => {
      let commentItems = prevState["commentItems"].slice();
      commentItems[index]["isLiked"] = !commentItems[index]["isLiked"];
      return {commentItems: commentItems};
    });
  };

  handleCommentChange = (commentItem, text) => {
    this.setState((prevState) => {
      let commentItems = prevState["items"].slice();
      for (let commentItem of commentItems) {
        commentItem.text = text;
      }
      return {commentItems: commentItems};
    });
  };

  render() {
    return(
      <div>
        <form onSubmit={this.commentOnSubmit}>
          <TextareaAutosize
            value={this.state.commentText}
            onChange={this.commentOnChange}
            minRows={3}
            maxRows={4}
            type="text"
            maxLength={50}
          />
          <button>Submit</button>
        </form>
        <CommentList
          commentItems={this.state.commentItems}
          handleCommentChange={this.handleCommentChange}
          handleLike={this.handleLike}
        />
      </div>
    );
  }
}

export default CommentField;
