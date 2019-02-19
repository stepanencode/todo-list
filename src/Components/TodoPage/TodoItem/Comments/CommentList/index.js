import React from "react";
import CommentItem from "../CommentItem/index";

import {
  CommentListWrapper
} from "./styles"

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
