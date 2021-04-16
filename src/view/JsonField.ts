import React from "react";
import ReactJson from "react-json-view";
const JsonField = prop => {
  const { record, source } = prop;
  return React.createElement(ReactJson, {
    src: JSON.parse(record[source]),
    name: false,
    enableClipboard: false,
    onEdit: false,
    onDelete: false,
    onAdd: false,
    iconStyle: "circle",
    collapsed: 5,
    displayObjectSize: false,
    displayArrayKey: false,
    quotesOnKeys: false,
    shouldCollapse: (field) => field.name === "annotations",
  });
};
export default JsonField;
