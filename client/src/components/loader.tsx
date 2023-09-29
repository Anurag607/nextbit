import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      {new Array(10).fill(1).map((_, i) => (
        <div className="circle" key={i} />
      ))}
    </div>
  );
};

export default Loader;
