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
  createResult,
  localSFP,
  withDynamicData,
} from "@quick-qui/data-provider";
import { request, response } from "@quick-qui/data-provider/dist/ext/Command";
import _ from "lodash";
import {
  DataProviderResult,
  fake,
} from "@quick-qui/data-provider/dist/dataProvider/DataProviders";
import { runtimeGlobal, implementationGlobal } from "@quick-qui/model-defines";
import axios from 'axios';




//FIXME 如何从exchange model将参数传进来？
async function rest(): Promise<DataProvider> {
  return restDp(await url());
}

async function url(): Promise<string> {
  const existingDp: DataProvider = implementationGlobal?.["dataProvider"]!;
  const configURL = (await existingDp(GET_ONE, "Config", { id: "_default" }))
    .data?.["modelPath"];
  console.log("configURL", configURL);

  return configURL ?? process.env.MODEL_SERVICE_URL;
}
//NOTE Sort, filter and pagination

const dp: DataProvider = forResourceAndFetchTypeOneParam(
  "Model",
  GET_ONE,
  (params: DataProviderParams<Model>) => {
    return rest()
      .then((dp) => dp(GET_ONE, "models", params))
      .then((response) => {
        return {
          data: {
            //FIXME id是写死的，没有传进来。
            id: "default",
            json: JSON.stringify(response.data),
            original: response.data,
          },
        } as GetOneResult<Model>;
      });
  }
);
const dpSource: DataProvider = forResourceAndFetchTypeOneParam(
  "ModelSource",
  GET_LIST,
  (params) => {
    return rest().then((dp) =>
      dp(GET_LIST, "models/default/modelSources", params)
    );
  }
);
const logsDp: DataProvider = forResourceAndFetchTypeOneParam(
  "Log",
  GET_LIST,
  (params) => {
    return rest().then((dp) =>
      localSFP(dp)(GET_LIST, "models/default/logs", params)
    );
  }
);
const refreshDp: DataProvider = forResourceAndFetchTypeOneParam(
  "Refresh",
  CREATE,
  (params) => {
    return rest()
      .then((dp) => dp(CREATE, "models/default/refresh", request({})))
      .then((r) => {
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

export default w(dp).chain(dpSource).chain(logsDp).chain(refreshDp).value();
