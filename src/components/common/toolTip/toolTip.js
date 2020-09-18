import React from "react"
import Tooltip from "react-tooltip";

const ToolTip = ({ position, id }) => (

  <Tooltip
    backgroundColor="#5C5B5A"
    textColor="white"
    style={{ marginTop: "1px" }}

    place={position} id={id}>
  </Tooltip>



)
export default ToolTip;
