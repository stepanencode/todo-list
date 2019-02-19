
import styled from "styled-components";
import woman from "./woman.svg";

const UserIn = styled.a `
  color: #5dcde3;
  display: inline-block;
  font-size: 20px;
  margin: 0;
  padding: 0 8px;
  float: left;
  line-height: 60px;
  background: url(${woman}) no-repeat;
  width: 50px;
  height: 50px;

  &:hover  {
    color: #faf3cf;
  }
`;

export {
  UserIn
}
