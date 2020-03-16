import React from "react";
import  ChartCardView  from "@quick-qui/front-chart/dist/ChartCardView";
//TODO 需要继续研究， 动态import如何直接import node_modules里面的模块。目前只有采用这个间接的方式。可能跟webpack的机制有关。
//NOTE  这个方法也有好处，如果直接动态应用node_modules里面的东西，webpack会打包整个node_modules目录。
export default ChartCardView;
