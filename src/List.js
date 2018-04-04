import React from "react";
import ListItem from "./ListItem";
import styled from "styled-components";

const ListWrapper = styled.ul`
  padding-left: 0;
`;

const List = (props) => (
  <ListWrapper>
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
  </ListWrapper>
);

export default List;
