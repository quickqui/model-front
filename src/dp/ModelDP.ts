import {
  DataProvider,
  DataProviderParams,
  GET_ONE,
  GetOneResult,
  restDp,
  forResourceAndFetchTypeOneParam,
  GET_LIST,
  w,
  CREATE,
  createResult,localSFP,
  withDynamicData
} from "@quick-qui/data-provider";
import { request } from "@quick-qui/data-provider/dist/ext/Command";
import _ from "lodash";
import {
  DataProviderResult,
  fake
} from "@quick-qui/data-provider/dist/dataProvider/DataProviders";
import { runtimeGlobal } from "@quick-qui/model-defines";

console.log(process.env.MODEL_SERVICE_URL)

//FIXME 如何从exchange model将参数传进来？
const rest: DataProvider = restDp(
  //TODO implementationGlobal 的方式貌似没成功。
  // runtimeGlobal?.["env"]?.["MODEL_SERVICE_URL"] ?? "http://localhost:1112"
  process.env.MODEL_SERVICE_URL
);
//NOTE Sort, filter and pagination



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
const logsDp: DataProvider = forResourceAndFetchTypeOneParam(
  "Log",
  GET_LIST,
  params => {
    return localSFP(rest)(GET_LIST, "models/default/logs", params);
  }
);
const refreshDp: DataProvider = forResourceAndFetchTypeOneParam(
  "Refresh",
  CREATE,
  params => {
    return rest(CREATE, "models/default/refresh", request({})).then(r => {
      return createResult(r.data);
    });
  }
);
export interface Model {
  id: string;
  json: string;
  original: any;
}

export interface Log {
  id: string;
  level: string;
  message: string;
  category: string;
  context: string;
}

export default w(dp)
  .chain(dpSource)
  .chain(logsDp)
  .chain(refreshDp)
  .value();
