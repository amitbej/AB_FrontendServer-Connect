import React from "react";
import { useState } from "react";

const Slots = ({ label, cb, movieData }) => {
  //hover state 
  const [hover, setHover] = useState(false);
  return (
    <div
      className="slot-container flex"
      onMouseEnter={()=>{
        setHover(true);
      }}
      onMouseLeave={()=>{
        setHover(false);
      }}
      onClick={() => cb(label)}
      style={{ backgroundColor: `${movieData === label || hover ? "coral" : "white"}` }}
      
    >
      <p>{label}</p>
    </div>
  );
};

export default Slots;
