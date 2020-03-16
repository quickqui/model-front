//TODO 这里是一个转换dp，需要建模，或者直接from internal to internal
import {
  DataProvider,
  DataProviderParams,
  GET_ONE,
  CREATE,
  forResourceAndFetchTypeOneParam,
  GetOneResult,
  CreateParams,
  GetOneParams,
  CreateResult,
  GET_LIST,
  GetListResult,
  GetListParams
} from "@quick-qui/data-provider";
import { implementationGlobal } from "@quick-qui/model-defines";
import { domainToPlantUml } from "../uml/domainToPlantUml";
import { Model } from "./ModelDP";
import { UmlServiceCommand } from "./UmlServiceDp";
import { functionsToPlantUml } from "../uml/functionsToPlantUml";
import { ModelSource } from "../uml/ModelSource";
import { sourceToPlantUml } from "../uml/sourceToPlantUml";
import { pagesToPlantUml } from "../uml/pagesToPlantUml";
import { exchangeToPlantUml } from "../uml/exchangeToPlantUml";
import { implementationToPlantUml } from "../uml/implementationToPlantUml";
const dp: DataProvider = forResourceAndFetchTypeOneParam(
  "Uml",
  GET_ONE,
  async (params: DataProviderParams<Uml>): Promise<GetOneResult<Uml>> => {
    const existingDp: DataProvider = implementationGlobal?.["dataProvider"]!;

    const umlType = (params as GetOneParams).id; //NOTE 这里借用了id，因为function模型传参数只有id。

    const uml = await (async () => {
      const model = (await existingDp(GET_ONE, "Model", {
        id: "default"
      } as GetOneParams)) as GetOneResult<Model>;
      switch (umlType) {
        case "modelSource":
          const sources: ModelSource[] = ((await existingDp(
            GET_LIST,
            "ModelSource",
            {
              id: "default",
              pagination: { page: 0, perPage: 100 },
              sort: { field: "id", order: "" },
              filter: {}
            } as GetListParams
          )) as GetListResult<ModelSource>).data;
          return sourceToPlantUml(sources);
        case "domain":
          return domainToPlantUml(model.data.original);
        case "function":
          return functionsToPlantUml(model.data.original);
        case "page":
          return pagesToPlantUml(model.data.original);
        case "exchange":
          return exchangeToPlantUml(model.data.original);
        case 'implementation':
          return implementationToPlantUml(model.data.original)
        default:
          throw new Error("not implemented");
      }
    })();

    const svg = await existingDp(CREATE, "UmlService", {
      data: {
        id: umlType,
        modelName: "default",
        name: umlType,
        uml
      }
    } as CreateParams<UmlServiceCommand>);
    return svg as GetOneResult<Uml>;
  }
);
export interface Uml {
  id: string;
  modelName: string;
  name: string;
  uml: string;
}
export default dp;
