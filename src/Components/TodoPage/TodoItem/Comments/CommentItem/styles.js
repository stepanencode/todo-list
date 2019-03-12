import styled from "styled-components";
import InlineSVG from "svg-inline-react";

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

export {
  Svg,
  CommentList,
  CommentText
};
