import React from "react";
import "../assets/styles/components/Loading.css";

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
