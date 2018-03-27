import React from 'react'
import CommentItem from "./CommentItem";

const CommentList = (props) => (
  <ul>
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
  </ul>
);

export default CommentList;