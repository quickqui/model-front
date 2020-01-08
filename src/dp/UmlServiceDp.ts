import {
  DataProviderParams,
  CREATE,
  forResourceAndFetchTypeOneParam,
  CreateParams,
  CreateResult
} from "@quick-qui/data-provider";
import axios from "axios";
import { DataProvider } from "@quick-qui/data-provider";
import { implementationGlobal } from "@quick-qui/model-defines";
import debug from "debug";
const d: DataProvider = forResourceAndFetchTypeOneParam(
  "UmlService",
  CREATE,
  (pa: DataProviderParams<UmlServiceCommand>) => {
    const params = pa as CreateParams<UmlServiceCommand>;
    const env = implementationGlobal?.["env"]?.name;
    debug("modelEditor")(`env - ${env}`);
    let umlServiceUrl: string = getUmlServiceUrl(env);
    const svg = axios
      .post(`${umlServiceUrl}/svg`, params.data.uml)
      .then(response => response.data);
    return svg.then(s => {
      return {
        data: { uml: params.data.uml, id: params.data.id, svg: s }
      } as CreateResult<UmlServiceCommand>;
    });
  }
);

export interface UmlServiceCommand {
  id: string;
  svg?: string;
  uml: string;
}

export default d;
function getUmlServiceUrl(env: any) {
  let umlServiceUrl = "";
  if (env === "dev_local") {
    umlServiceUrl = "http://localhost:1608";
  } else if (env === "dev_docker") {
    umlServiceUrl = "http://plantUmlService:1608";
  } else {
    throw new Error("does not know env");
  }
  return umlServiceUrl;
}
