import React from "react";
import InlineSVG from "svg-inline-react";

 const SvgField = (props: any) => {
  //NOTE 不支持jsx/tsx， 因为后台编译直接采用tsc，没有经过jsx编译。
  return React.createElement(InlineSVG, { src: props?.record?.svg  });
};

export default SvgField;
