import React, { Component } from "react";
import CommentList from "./CommentList";
import styled, {css} from "styled-components";

const Input = styled.input`
  font-family: sans-serif;
  background-color: #BAE3FF;
  color: #000080;
  border-style: none;
  width: 350px;
  height: 1.78rem;
  border-radius: 3px;
  font-size: 22px;
  margin-top: 20px;
  padding-left: 5px;
  margin-left: 10px;
  
  ${props => props.placeholder && css`
    font-size: 16px;
  `}
  ${props => props.none && css`
     display: none;
  `}
`;

const Svg = styled.svg`
    vertical-align: bottom;
    margin-left: 10px;
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
          }
        ],
      });
    }
  };

  handleDeleteComment = (index) => {
    this.setState(prevState => ({
      commentItems: prevState.commentItems.filter((item, itemIndex) => itemIndex !== index)
    }));
  };

  handleCommentChange = (commentItem, text) => {
    this.setState((prevState) => {
      let commentItems = prevState["items"].slice();
      for (let commentItem of commentItems) {
        commentItem.text = text;
      }
      return {commentItems: commentItems};
    });
  };

  hideComments = () => {
    this.setState({
      isHide: !this.state.isHide
    });
  };

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
                  <Svg xmlns="http://www.w3.org/2000/svg"
                    version="1.1"  viewBox="0 0 80 80"
                    style={{enableBackground: "new 0 0 80 80"}}
                    width="1.78rem" height="1.78rem">
                    <g>
                      <path style={{fill: "#0099ff"}}
                        d="M70,0H10C4.5,0,0,4.5,0,10v60c0,5.5,4.5,10,10,10h60c5.5,0,10-4.5,10-10V10C80,4.5,75.5,0,70,0z
                        M65,45H45v20H35V45H15V35h20V15h10v20h20V45z"/>
                    </g>
                  </Svg>
                </span>
              </span>
          }
          {
            this.state.isHide ?
              <Svg  version="1.1" id="Show" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 512 512"
                style={{enableBackground: "new 0 0 512 512", marginTop: "20"}}
                onClick={this.hideComments}
                width="1.78rem" height="1.78rem">
                <linearGradient id="SVGID_3_"
                  gradientUnits="userSpaceOnUse" x1="256.1882" y1="434.7547" x2="256.1882" y2="80.7557"
                  gradientTransform="matrix(0.9994 0 0 -0.9994 -0.0302 513.5963)">
                  <stop  offset="0" style={{stopColor: "#2AF598"}}/>
                  <stop  offset="1" style={{stopColor: "#009EFD"}}/>
                </linearGradient>
                <path style={{fill: "url(#SVGID_3_)"}}
                  d="M256,432.89c-52.234,0-104.834-21.616-156.341-64.245
                  c-41.131-34.043-70.965-72.959-83.705-89.578c-2.729-3.561-7.791-11.018-8.359-11.858L0,255.999l7.596-11.211
                  c0.569-0.838,5.63-8.295,8.357-11.853c12.741-16.62,42.576-55.537,83.706-89.579C151.166,100.725,203.766,79.11,256,79.11
                  s104.834,21.616,156.34,64.246c41.132,34.043,70.965,72.96,83.705,89.578c2.728,3.56,7.789,11.015,8.358,11.855l7.596,11.21
                  l-7.595,11.212c-0.568,0.839-5.631,8.298-8.359,11.858c-12.74,16.618-42.574,55.534-83.705,89.578
                  C360.834,411.275,308.234,432.89,256,432.89z M48.643,256C118.605,346.85,188.366,392.916,256,392.916
                  c67.635,0,137.395-46.065,207.356-136.915C393.396,165.151,323.634,119.085,256,119.085C188.366,119.084,118.607,165.149,48.643,256
                  z M256,294.975c21.526,0,38.976-17.45,38.976-38.976s-17.45-38.976-38.976-38.976c-21.526,0-38.976,17.45-38.976,38.976
                  S234.474,294.975,256,294.975z M256,369.929c-62.821,0-113.93-51.108-113.93-113.93S193.179,142.07,256,142.07
                  s113.93,51.108,113.93,113.93S318.821,369.929,256,369.929z M256,182.045c-40.779,0-73.954,33.176-73.954,73.954
                  s33.176,73.954,73.954,73.954s73.954-33.176,73.954-73.954S296.779,182.045,256,182.045z"/>
              </Svg> :
              <Svg version="1.1" id="Hide"  x="0px" y="0px"
                viewBox="0 0 512 512"
                style={{enableBackground: "new 0 0 512 512"}}
                width="1.78rem" height="1.78rem"
                onClick={this.hideComments}>
                <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse"
                  x1="256.1882" y1="513.3982" x2="256.1882" y2="2.1142"
                  gradientTransform="matrix(0.9994 0 0 -0.9994 -0.0302 513.5972)">
                  <stop  offset="0" style={{stopColor: "#2AF598"}}/>
                  <stop  offset="1" style={{stopColor: "#009EFD"}}/>
                </linearGradient>
                <path style={{fill:"url(#SVGID_2_)"}}
                  d="M256,369.93c-62.821,0-113.93-51.108-113.93-113.93c0-8.988,1.035-17.806,3.038-26.327
                  l37.839,37.839c4.957,31.577,29.965,56.584,61.541,61.541l37.827,37.827C273.787,368.889,264.97,369.93,256,369.93z
                  M403.773,375.506l107.712,107.712l-28.267,28.267L0.516,28.782L28.782,0.516l112.892,112.892
                  C179.622,90.644,218.013,79.109,256,79.109c52.234,0,104.834,21.616,156.34,64.246c41.132,34.043,70.965,72.96,83.705,89.578
                  c2.728,3.56,7.789,11.015,8.358,11.854L512,255.998l-7.595,11.212c-0.568,0.838-5.631,8.298-8.359,11.858
                  C482.616,296.586,449.51,339.752,403.773,375.506z M170.957,142.691l19.858,19.858c19.003-13.295,41.605-20.478,65.185-20.478
                  c62.821,0,113.93,51.108,113.93,113.93c0,23.629-7.172,46.203-20.47,65.193l25.82,25.82c42.524-32.129,73.527-72.042,88.078-91.012
                  C393.397,165.151,323.634,119.085,256,119.085C228.192,119.084,199.672,127.016,170.957,142.691z M294.976,256
                  c0,3.289-0.412,6.48-1.178,9.531l26.689,26.689c6.166-10.944,9.468-23.336,9.468-36.22c0-40.779-33.176-73.954-73.954-73.954
                  c-12.859,0-25.264,3.302-36.218,9.469l26.688,26.688c3.05-0.767,6.242-1.178,9.53-1.178
                  C277.526,217.024,294.976,234.474,294.976,256z M256,392.915c-67.634,0-137.396-46.067-207.357-136.916
                  c10.041-13.088,30.201-39.06,57.341-64.785l-28.278-28.278c-29.893,28.457-51.502,56.629-61.752,69.998
                  c-2.727,3.559-7.788,11.014-8.357,11.854L0,255.999l7.595,11.212c0.568,0.838,5.63,8.297,8.359,11.858
                  c12.74,16.618,42.575,55.534,83.705,89.577c51.506,42.631,104.107,64.245,156.341,64.245c25.353,0,50.884-5.137,76.342-15.318
                  l-31.384-31.384C285.824,390.659,270.811,392.915,256,392.915z"/>
              </Svg>
          }
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
