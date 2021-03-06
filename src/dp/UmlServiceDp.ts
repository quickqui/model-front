import {
  DataProviderParams,
  CREATE,
  forResourceAndFetchTypeOneParam,
  CreateParams,
  CreateResult,
} from "@quick-qui/data-provider";
import axios from "axios";
import { DataProvider } from "@quick-qui/data-provider";
import { implementationGlobal } from "@quick-qui/model-defines";
import debug from "debug";

import encoder from "plantuml-encoder";
const d: DataProvider = forResourceAndFetchTypeOneParam(
  "UmlService",
  CREATE,
  (pa: DataProviderParams<UmlServiceCommand>) => {
    const params = pa as CreateParams<UmlServiceCommand>;
    const env = implementationGlobal?.["env"]?.name;
    debug("modelEditor")(`env - ${env}`);
    const remote = true;
    let umlServiceUrl: string = getUmlServiceUrl(env)!;
    if (remote) {
      return axios
        .get(
          `http://www.plantuml.com/plantuml/svg/${encoder.encode(
            params.data.uml
          )}`
        )
        .then((response) => response.data)
        .then((s) => {
          return {
            data: { uml: params.data.uml, id: params.data.id, svg: s },
          } as CreateResult<UmlServiceCommand>;
        });
    }
    const svg = axios
      .post(`${umlServiceUrl}/svg`, params.data.uml)
      .then((response) => response.data);
    return svg.then((s) => {
      return {
        data: { uml: params.data.uml, id: params.data.id, svg: s },
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

//TODO 如何从implementation模型中来？
function getUmlServiceUrl(env: any) {
  // return process.env.UML_SERVICE_URL  //?? "http://localhost:1608";
  return "http://localhost:1608";
}
