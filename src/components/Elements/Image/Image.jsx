import React from 'react'
import { useSelected, useFocused } from "slate-react";
import "./Image.css";

const Image = ({ attributes, element, children }) => {
  const {url,width,height} = element;
  const selected = useSelected();
  const focused = useFocused();
  console.log(width,height);
  return (
    <div
      // {...attributes}
      className='element-image'
      style={{display:'',justifyContent:'center'}}
    >
      <div contentEditable={false} className='' style={{width:width}}>
        <img alt={element.alt} src={url} className='object-contain'/>
      </div>
      {children}
    </div>
  );
};
export default Image;