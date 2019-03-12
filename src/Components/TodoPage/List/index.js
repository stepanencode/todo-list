import React from "react";
import ListItem from "../ListItem/index";
import { Scrollbars } from "react-custom-scrollbars";

import {
  ListWrapper
} from "./styles";

const List = (props) => (
  <ListWrapper>
    <Scrollbars style={{ minWidth: 660, height: "50vh"}}
      renderTrackHorizontal={({ style, ...props }) =>
        <div {...props} style={{ ...style, display: "none" }}/>
      }
      renderThumbVertical={({ style, ...props }) =>
        <div {...props} style={{ ...style, backgroundColor: "rgba(9, 142, 168, 0.5)", borderRadius: "19px"  }}/>
      }
      renderView={({ style, ...props }) =>
        <div {...props} style={{ ...style, overflowX: "hidden"  }}/>
      }
      renderTrackVertical={({ style, ...props }) =>
        <div {...props} style={{ ...style, position: "absolute", width: "8px",
          right: "0px", bottom: "2px", top: "2px", borderRadius: "3px"}}/>
      }
      autoHeight={1}
      autoHeightMax={"50vh"}
      autoHeightMin={50}
    >
      {
        props.items.map(item =>
          <ListItem
            key={item.id}
            item={item}
            handleDelete={props.handleDelete}
            handleChange={props.handleChange}
            handleComplete={props.handleComplete}
            handleImportant={props.handleImportant}
            handleDueToday={props.handleDueToday}
            handleRemoveDueToday={props.handleRemoveDueToday}
            handleDueTomorrow={props.handleDueTomorrow}
            handleRemoveDueTomorrow={props.handleRemoveDueTomorrow}
          />)
      }
    </Scrollbars>
  </ListWrapper>
);

export default List;
