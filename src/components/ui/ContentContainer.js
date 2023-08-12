import React from "react";
//Renders the "selected movie/seats/time" 
const ContentContainer = (props) => {
  return (
    <div className="content-container">
      <div className="label">
        <p>{props.label}</p>
      </div>
      <div className="content-slots">{props.children}</div>
    </div>
  );
};

export default ContentContainer;
