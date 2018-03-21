import React from 'react'
import ListItem from "./ListItem";

const List = (props) => (
  <ul>
    {
      props.items.map(item =>
        <ListItem
          key={item.uuid}
          item={item}
          handleDelete={props.handleDelete}
          handleChange={props.handleChange}
          handleComplete={props.handleComplete}
          handleImportant={props.handleImportant}

          />)
    }
  </ul>
);

export default List;