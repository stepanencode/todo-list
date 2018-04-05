import React, {Component} from "react";

import styled from "styled-components";

const Svg = styled.svg`
  vertical-align: middle;
  margin: 0 10px;
`;

const CommentList = styled.li`
  padding-left: 15px;
`;

const CommentText = styled.p`
  font-size: 18px;
  display: inline-block;
  color: #000080;
  margin-right: 10px;
`;

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,

    };
  }

  handleDeleteComment = () => {
    this.props.handleDeleteComment(this.props.index);
  };



  handleCommentChange = (event) => {
    this.props.handleCommentChange(this.props.commentItem, event.target.value);
  };

  handleLike = () => {
    this.setState({
      isLiked: !this.state.isLiked
    })
  };

  render() {


    return(
      <CommentList>
        <CommentText>{this.props.commentItem.text}</CommentText>
        {this.state.isLiked ?
        <Svg version="1.1" id="Like" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
             viewBox="0 0 50 50"
             style={{enableBackground: "new 0 0 50 50"}}
             onClick={this.handleLike}
             width="1.3em" height="1.3em">
          <path style={{fill: "#ff6347"}}
                d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543
                	c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503
                		c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"/>
          <path style={{fill: "#ffe6e6"}}
                d="M6,18.078c-0.553,0-1-0.447-1-1c0-5.514,4.486-10,10-10c0.553,0,1,0.447,1,1s-0.447,1-1,1
                	c-4.411,0-8,3.589-8,8C7,17.631,6.553,18.078,6,18.078z"/>
        </Svg> :
          <Svg version="1.1" id="Like" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
               viewBox="0 0 50 50"
               style={{enableBackground: "new 0 0 50 50"}}
               onClick={this.handleLike}
               width="1.3em" height="1.3em">
            <path style={{fill: "#BAE3FF"}}
                  d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543
                	c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503
                		c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"/>
            <path style={{fill: "#ffe6e6"}}
                  d="M6,18.078c-0.553,0-1-0.447-1-1c0-5.514,4.486-10,10-10c0.553,0,1,0.447,1,1s-0.447,1-1,1
                	c-4.411,0-8,3.589-8,8C7,17.631,6.553,18.078,6,18.078z"/>
          </Svg>
         }


        <Svg version="1.1"
             id="Delete"
             xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
             viewBox="0 0 389.6 389.6"
             style={{enableBackground: "new 0 0 389.6 389.6"}}
             width="1.3em" height="1.3em"
             onClick={this.handleDeleteComment}>
          <g>
            <path style={{fill: "#0099ff"}} d="M340.4,80.4H49.2v266.8c0,23.6,19.2,42.4,42.4,42.4h206c23.6,0,42.4-19.2,42.4-42.4V80.4H340.4z"/>
            <g>
              <path style={{fill: "#0099ff"}}
                    d="M346.8,40H280c-1.2-10.4-6-20-13.2-26.8l0,0l0,0l0,0C258.4,4.8,247.2,0,234.8,0h-80
                  			c-12.4,0-24,5.2-32,13.2l0,0c-7.2,7.2-12,16.4-13.2,26.8H42.8c-11.2,0-20,9.2-20,20l0,0c0,11.2,9.2,20,20,20h304
                  						c11.2,0,20-9.2,20-20l0,0C366.8,49.2,357.6,40,346.8,40z M136.8,27.2L136.8,27.2c4.8-4.8,10.8-7.6,18-7.6h80
                  									c7.2,0,13.2,2.8,18,7.6l0,0c3.6,3.6,6,8,6.8,12.8H130C130.8,35.2,133.2,30.8,136.8,27.2L136.8,27.2z"/>
              <path style={{fill: "#BAE3FF"}}
                    d="M258,146.8v176.4c0,11.2,9.2,20,20,20l0,0c11.2,0,20-9.2,20-20V146.8c0-11.2-9.2-20-20-20l0,0
                  		C267.2,126.8,258,136,258,146.8"/>
              <path style={{fill: "#BAE3FF"}}
                    d="M174.8,146.8v176.4c0,11.2,9.2,20,20,20l0,0c11.2,0,20-9.2,20-20V146.8c0-11.2-9.2-20-20-20l0,0
                  		C183.6,126.8,174.8,136,174.8,146.8"/>
              <path style={{fill: "#BAE3FF"}}
                    d="M91.2,146.8v176.4c0,11.2,9.2,20,20,20l0,0c11.2,0,20-9.2,20-20V146.8c0-11.2-9.2-20-20-20l0,0
                  	C100.4,126.8,91.2,136,91.2,146.8"/>
            </g>
          </g>
        </Svg>


      </CommentList>
    );
  }
}

export default CommentItem;
