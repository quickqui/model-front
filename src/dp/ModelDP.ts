import {
  DataProvider,
  DataProviderParams,
  forResourceAndFetchType,
  GET_ONE,
  GetOneResult,
  restDp,
  forResourceAndFetchTypeOneParam,
  GET_LIST,
  GetListResult,
  w
} from "@quick-qui/data-provider";
import _ from "lodash";
import { ModelSource } from "../uml/ModelSource";

//TODO 如何从exchange model将参数传进来？
const rest: DataProvider = restDp("http://localhost:1112");

const dp: DataProvider = forResourceAndFetchTypeOneParam(
  "Model",
  GET_ONE,
  (params: DataProviderParams<Model>) => {
    return rest(GET_ONE, "models", params).then(response => {
      return {
        data: {
          //FIXME id是写死的，没有传进来。
          id: "default",
          json: JSON.stringify(response.data),
          original: response.data
        }
      } as GetOneResult<Model>;
    });
  }
);
const dpSource: DataProvider = forResourceAndFetchTypeOneParam(
  "ModelSource",
  GET_LIST,
  params => {
    return rest(GET_LIST, "models/default/modelSources", params);
  }
);
export interface Model {
  id: string;
  json: string;
  original: any;
}

export default w(dp)
  .chain(dpSource)
  .value();
