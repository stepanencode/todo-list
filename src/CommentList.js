import React from "react";
import CommentItem from "./CommentItem";
import styled from "styled-components";

const CommentListWrapper = styled.ul`
  padding-left: 0;
`;

const CommentList = (props) => (
  <CommentListWrapper>
    {
      props.commentItems.map((commentItem, index) =>
        <CommentItem
          key={index}
          index={index}
          commentItem={commentItem}
          handleCommentChange={props.handleCommentChange}
          handleLike={props.handleLike}
        />)
    }
  </CommentListWrapper>
);

export default CommentList;
