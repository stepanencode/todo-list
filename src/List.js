import React from 'react'
import ListItem from "./ListItem";

const List = (props) => (
  <ul>
    {
      props.items.map((item, index) =>
        <ListItem
          index={index}
          item={item}
          handleDelete={props.handleDelete}
          handleChange={props.handleChange}
          handleComplete={props.handleComplete}
          handleImportant={props.handleImportant}/>)
    }
  </ul>
);

export default List;