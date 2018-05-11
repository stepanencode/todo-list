import React, { Component } from "react";
import CommentList from "./CommentList";
import styled, {css} from "styled-components";
import InlineSVG from 'svg-inline-react';
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

  // hideComments = () => {
  //   this.setState({
  //     isHide: !this.state.isHide
  //   });
  // };

  render() {
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
                  maxLength={50}
                  inputDisappear={this.inputDisappear}
                  placeholder={"Do you have any comments?"}
                />
                <span onClick={this.commentOnSubmit}>
                  <Svg src={require(`!raw-loader!./icons/add-comment-item.svg`)} raw={true}/>
                </span>
              </span>
          }
          {/* {
            this.state.isHide ?
              <Svg src={require(`!raw-loader!./icons/show-comment-field.svg`)}
                raw={true} onClick={this.hideComments}/>
               :
               <Svg src={require(`!raw-loader!./icons/hide-comment-field.svg`)} 
                 raw={true} onClick={this.hideComments}/>
          } */}
        </form>
        <CommentList
          commentItems={this.state.commentItems}
          handleCommentChange={this.handleCommentChange}
          handleDeleteComment={this.handleDeleteComment}
        />
      </div>
    );
  }
}

export default CommentField;
