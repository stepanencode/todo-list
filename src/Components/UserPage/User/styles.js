import styled, { css }  from "styled-components";
import Gugi from "../../../fonts/Gugi-Regular.ttf";
import img from "./user-background.jpeg";
import InlineSVG from "svg-inline-react";

const Svg = styled(InlineSVG)`
  width: 110px;
  height: 100px;
  padding-left: 10px;

  ${props => props.edit && css`
    margin-left: 20px;
    margin-top: 10px;
    width: 1.6em;
    height: 1.6em;
  `}

  ${props => props.save && css`
    margin-left: 20px;
    margin-top: 10px;
    width: 1.6em;
    height: 1.6em;
  `}
`;

const UserBackground = styled.div`
  overflow: hidden;
  min-height: 100vh;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  z-index: 1;
  &:before {
    content: url(${img});
     z-index:-1;
     position: absolute;
     top: 0;
     left: 0;
     opacity: 0.9;
   }
`;

const UserInfoWrapper = styled.div`
  box-sizing: border-box;
  width: 960px;
  min-width: 500px;
  height: 600px;
  background-color: rgba(222,209,207, .5) ;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 50px;
  padding-top: 30px;
`;

const UserInfo = styled.div`
   width: 900px;
   height: 540px;
   margin: 0 auto;
   border: 2px solid #ded1cf;
   border-radius: 5px;
   clear: both;
`;

const AvatarsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-left: 30px;
  padding-left: 5px;
  float: left;
  width: 399px;
  height: 500px
  background-color: #e7e8ef;
  border-radius: 5px;
`;

const AvatarContainer = styled.div`
  display: inline-flex;
  width: 130px;
  height: 100px;
  transition: 1s;
  &:hover{
    box-sizing: border-box;
    background: #8bb4e0;
    border-radius: 50em;
    box-shadow:
    0 0 20px rgba(255,255,255,.6),
    inset 0 0 20px rgba(255,255,255,1);
  }
`;

const AvatarHeader = styled.h3`
  font-size: 22px;
  margin: 0;
  margin-bottom: 10px;
  padding: 0 60px;
  font-family: 'Gugi';
  src: url(${Gugi});
`;

const PersonalInfoWrapper = styled.div`
  position: relative;
  margin-top: 20px;
  margin-right: 30px;
  float: right;
  width: 400px;
  height: 500px
  background-color: #e7e8ef;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled.div`
  display: inline-flex;
  padding-left: 10px;
  font-size: 18px;
  color: #a59390;
  font-family: 'Gugi';
  src: url(${Gugi});
`;

const UserMail = styled.div`
  display: inline-flex;
  padding-left: 10px;
  font-size: 18px;
  color: #a59390;
  font-family: 'Gugi';
  src: url(${Gugi});
`;

const UserPhone = styled.div`
  display: inline-flex;
  padding-left: 10px;
  font-size: 18px;
  color: #a59390;
  font-family: 'Gugi';
  src: url(${Gugi});
`;

const UserChangePassword = styled.div`
  display: inline-flex;
  padding-left: 10px;
  font-size: 18px;
  color: #a59390;
  font-family: 'Gugi';
  src: url(${Gugi});
`;

const UserChangePasswordBtn = styled.button`
  margin-left: 5px;
  font-size: 16px;
  background: #ded1cf;
  color: #5a5858;
  width: 180px;
  height: 30px;
  padding-top: 3px;
  padding-bottom: 3px;
  margin-top: 12px;
  padding-left: 5px;
  border: 2px solid #c7bcba;
  &:hover  {
    color: #ded1cf;
    background: #5a5858;
    border-color: #ded1cf;
  }
`;

const AvatarSaveBtn = styled.button`
  font-family: 'Gugi';
  src: url(${Gugi});
  display: block;
  margin: 0 auto;
  font-size: 16px;
  background: #ded1cf;
  width: 279px;
  height: 30px;
  padding-top: 3px;
  padding-bottom: 3px;
  margin-top: 5px;
  padding-left: 5px;
  border: 2px solid #c7bcba;
  &:hover  {
    background: #c7bcba;
    border-color: #ded1cf;
  }
`;

const Input = styled.input `
  display: block;
  float: right;
  background-color: #faf3cf;
  padding: 3px 5px;
  width: 200px;
  margin-left: 5px;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid  #dcd8c8;
  box-sizing: border-box;
  margin-top: 12px;
`;

const UserInfoText = styled.p`
  color: #5a5858;
  padding-left: 10px;
  margin-top: 20px;
  font-size: 16px;
`;

const Label = styled.label``;

const RadioButton = styled.input`
  [type="radio"]&:checked {
    position: absolute;
    left: -9999px;
  }

  [type="radio"]&:not(checked) {
    position: absolute;
    left: -9999px;
  }

  [type="radio"]&:checked + ${Label} {
    display: inline-block;
    position: relative;
    cursor: pointer;
  }

  [type="radio"]&:not(checked) + ${Label} {
    display: inline-block;
    position: relative;
    cursor: pointer;
  }

  [type="radio"]&:checked + ${Label}:before {
    content: "";
    position: absolute;
    left: 10px;
    top: 10px;
    width: 18px;
    height: 18px;
    border: 1px solid #dddddd;
    background-color: #ffffff;
    border-radius: 100%;
  }

  [type="radio"]&:not(checked) + ${Label}:before {
    content: "";
    position: absolute;
    left: 10px;
    top: 10px;
    width: 18px;
    height: 18px;
    border: 1px solid #dddddd;
    background-color: #ffffff;
    border-radius: 100%;
  }

  [type="radio"]&:checked + ${Label}:after {
    content: "";
    position: absolute;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
    left: 15px;
    top: 15px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: #8bb4e0;
    opacity: 1;
  }
  [type="radio"]&:not(checked) + ${Label}:after {
    content: "";
    position: absolute;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
    left: 15px;
    top: 15px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: #8bb4e0;
    opacity: 0;
  }
`;

export {
  Svg,
  UserBackground,
  UserInfoWrapper,
  UserInfo,
  AvatarsWrapper,
  AvatarContainer,
  AvatarHeader,
  PersonalInfoWrapper,
  UserName,
  UserMail,
  UserPhone,
  UserChangePassword,
  UserChangePasswordBtn,
  AvatarSaveBtn,
  Input,
  UserInfoText,
  Label,
  RadioButton
}
