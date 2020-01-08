import React from "react";
import ReactJson from "react-json-view";
const JsonField = prop => {
  const { record, source } = prop;
  return React.createElement(ReactJson, {
    src: JSON.parse(record[source]),
    enableClipboard: false,
    onEdit: false,
    onDelete: false,
    onAdd: false,
    iconStyle: "circle",
    collapsed: 1
  });
};
export default JsonField;
