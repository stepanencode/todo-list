import React, { Component } from "react";
import CommentList from "./CommentList";
import styled, {css} from "styled-components";
import InlineSVG from "svg-inline-react";
import uuidv4 from "uuid";

const Svg = styled(InlineSVG)`
    vertical-align: middle;
    margin: 0 10px;
`;

const Input = styled.input`
  font-family: sans-serif;
  background-color: #BAE3FF;
  color: #000080;
  border-style: none;
  width: 350px;
  height: 1.78rem;
  border-radius: 3px;
  font-size: 22px;
  margin-top: 5px;
  padding-left: 5px;
  margin-left: 10px;

  ${props => props.placeholder && css`
    font-size: 16px;
  `}
  ${props => props.none && css`
     display: none;
  `}
`;

class CommentField extends Component{
  constructor(props) {
    super(props);
    this.state = {
      commentText: "",
      commentItems: [],
      isHide: false
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
            uuidComment: uuidv4()
          }
        ],
      });
    }
  };

  handleDeleteComment = (uuidComment) => {
    this.setState(prevState => ({
      commentItems: prevState.commentItems.filter(item => item.uuidComment !== uuidComment)
    }));
  };

  handleCommentChange = (uuidComment, text) => {
    this.setState((prevState) => {
      let commentItems = prevState["items"].slice();
      for (let commentItem of commentItems) {
        if (commentItem.uuidComment === uuidComment) {
          commentItem.text = text;
        }
      }
      return {commentItems: commentItems};
    });
  };


  render() {
    /* eslint-disable quotes */
    return(
      <div>
        <form onSubmit={this.commentOnSubmit}>
          {
            this.state.isHide ?
              null :
              <span>
                <Input
                  value={this.state.commentText}
                  onChange={this.commentOnChange}
                  data-testid="add-comment-field-input"
                  maxLength={50}
                  inputDisappear={this.inputDisappear}
                  placeholder={"Do you have any comments?"}
                />
                <span
                  onClick={this.commentOnSubmit}
                  data-testid="submit-comment-button">
                  <Svg src={require(`!raw-loader!./icons/add-comment-item.svg`)} raw={true}/>
                </span>
              </span>
          }
        </form>
        <CommentList
          commentItems={this.state.commentItems}
          handleCommentChange={this.handleCommentChange}
          handleDeleteComment={this.handleDeleteComment}
        />
      </div>
    );
    /* eslint-enable quotes */
  }
}

export default CommentField;
