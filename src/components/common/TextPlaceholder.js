import React from "react";
import ReactPlaceholder from "react-placeholder";

const TextPlaceholder = ({
  children,
  ready,
  rows = 1,
  firstLaunchOnly = false
}) => {
  return (
    <ReactPlaceholder
      type="text"
      showLoadingAnimation
      ready={ready}
      rows={rows}
    >
      {children}
    </ReactPlaceholder>
  );
};

export default TextPlaceholder;
