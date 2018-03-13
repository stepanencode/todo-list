import React from 'react'
import ListItem from "./ListItem";

const List = (props) => (
  <ul>
    {
      props.items.map((item, index) =>
        <ListItem index={index} item={item} handleDelete={props.handleDelete} handleChange={props.handleChange}/>)
    }
  </ul>
);

export default List;