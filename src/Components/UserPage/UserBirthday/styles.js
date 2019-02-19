import styled, { css }  from "styled-components";
import InlineSVG from "svg-inline-react";
import Gugi from "../../../fonts/Gugi-Regular.ttf";

const Svg = styled(InlineSVG)`
  ${props => props.calendar && css`
    display: block;
  	margin-left: 20px;
  	margin-top: 10px;
  `}
`;

const CalendarWrapper = styled.div`
  ${props => props.show && css`
    display: block;
    position: absolute;
    top: 155px;
    left: 232px;
  `}
  ${props => props.hide && css`
    display: none;
  `}
`;

const UserBirthdayWrapper = styled.div`
  display: inline-flex;
  padding-left: 10px;
  font-size: 18px;
  color: #a59390;
  font-family: 'Gugi';
  src: url(${Gugi});
`;

const UserInfoText = styled.p`
  color: #5a5858;
  padding-left: 10px;
  margin-top: 20px;
  font-size: 16px;
`;

export {
  Svg,
  CalendarWrapper,
  UserBirthdayWrapper,
  UserInfoText
}
