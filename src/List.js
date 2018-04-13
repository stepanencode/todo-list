import React from "react";
import ListItem from "./ListItem";
import styled from "styled-components";
import { Scrollbars } from 'react-custom-scrollbars';


const ListWrapper = styled.ul`
  padding-left: 0;
  max-height: 50vh;

`;


const List = (props) => (
  <ListWrapper>
    <Scrollbars style={{ minWidth: 660, height: `50vh` }}>
    {
      props.items.map(item =>
        <ListItem
          key={item.uuid}
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
