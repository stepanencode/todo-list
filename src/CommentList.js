import React from "react";
import CommentItem from "./CommentItem";
import styled from "styled-components";

const CommentListWrapper = styled.ul`
  padding-left: 0;
`;

const CommentList = (props) => (
  <CommentListWrapper>
    {
      props.commentItems.map(commentItem =>
        <CommentItem
          key={commentItem.uuidComment}
          commentItem={commentItem}
          handleCommentChange={props.handleCommentChange}
          handleDeleteComment={props.handleDeleteComment}
        />)
    }
  </CommentListWrapper>
);

export default CommentList;
