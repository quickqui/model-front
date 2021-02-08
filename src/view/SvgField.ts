import React from "react";
import { useLayoutEffect, useRef } from "react";
import InlineSVG from "svg-inline-react";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import { useWindowSize } from "@react-hook/window-size";

const SvgField = (props: any) => {
  const Viewer = useRef(null);

  const [width, height] = useWindowSize({
    initialWidth: 400,
    initialHeight: 400,
  });
  useLayoutEffect(() => {
    Viewer?.current?.fitToViewer?.();
  }, []);

  //NOTE 不支持jsx/tsx， 因为后台编译直接采用tsc，没有经过jsx编译。
  //updated， tsc可以编译， jsx：react 之类的
  return React.createElement(
    UncontrolledReactSVGPanZoom,
    {
      width: width,
      height: height,
      background: "#fff",
      toolbarProps: { position: "none" },
      miniatureProps: { position: "none" },
      ref: Viewer,
      defaultTool: "auto",
    },
    React.createElement(
      "svg",
      { width: width , height: height  },
      React.createElement("g", {
        dangerouslySetInnerHTML: { __html: props?.record?.svg },
      })
    )
  );
  //https://github.com/chrvadala/react-svg-pan-zoom/issues/44
  //TODO 没有搞定svg pan zoom, 因为不支持dangerous.
  //
  // return React.createElement(InlineSVG, { src: props?.record?.svg });
};

export default SvgField;
