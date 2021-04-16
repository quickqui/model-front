//TODO 这里是一个转换dp，需要建模，或者直接from internal to internal
import {
  DataProvider,
  GET_ONE,
  forResourceAndFetchTypeOneParam,
  GetOneResult,
  GetOneParams,
  GET_LIST,
  GetListResult,
  w,
  localSFP,
  DataProviderParams,
} from "@quick-qui/data-provider";
import {
  implementationGlobal,
  Entity,
  functions,
} from "@quick-qui/model-defines";
import { Model } from "./ModelDP";
import _ from "lodash";
const dp: DataProvider = forResourceAndFetchTypeOneParam(
  "Entity",
  GET_LIST,
  async (): Promise<GetListResult<Entity>> => {
    const existingDp: DataProvider = implementationGlobal?.["dataProvider"]!;
    const model = (await existingDp(GET_ONE, "Model", {
      id: "default",
    } as GetOneParams)) as GetOneResult<Model>;
    const entities = model.data.original.domainModel.entities;
    return {
      data: entities.map((entity) => _.extend({}, entity, { id: entity.name })),
      total: entities.length,
    } as GetListResult<Entity>;
  }
);
const units: DataProvider = forResourceAndFetchTypeOneParam(
  "ModelUnit",
  GET_LIST,
  async (): Promise<GetListResult<any>> => {
    const existingDp: DataProvider = implementationGlobal?.["dataProvider"]!;
    const model = (await existingDp(GET_ONE, "Model", {
      id: "default",
    } as GetOneParams)) as GetOneResult<Model>;

    const units = unitByType(model).flat();
    return {
      data: units.map((u) => ({
        type: u[2],
        id: u[1] + "/" + u[0].name,
        json: JSON.stringify(u[0]),
      })),
      total: units.length,
    } as GetListResult<any>;
  }
);
const byTypes = forResourceAndFetchTypeOneParam(
  "PartsByType",
  GET_LIST,
  async (): Promise<GetListResult<PartsCountByType>> => {
    const existingDp: DataProvider = implementationGlobal?.["dataProvider"]!;
    const model = (await existingDp(GET_ONE, "Model", {
      id: "default",
    } as GetOneParams)) as GetOneResult<Model>;

    return {
      total: 6,
      data: unitByType(model).map((u) => ({
        count: u.length,
        id: u[0][2],
        type: u[0][2],
      })),
    } as GetListResult<PartsCountByType>;
  }
);
const unitGetOne = forResourceAndFetchTypeOneParam(
  "ModelUnit",
  GET_ONE,
  async (params: DataProviderParams<any>): Promise<GetOneResult<any>> => {
    const existingDp: DataProvider = implementationGlobal?.["dataProvider"]!;
    const model = (await existingDp(GET_ONE, "Model", {
      id: "default",
    } as GetOneParams)) as GetOneResult<Model>;
    const units = unitByType(model).flat();

    return {
      data: units
        .map((u) => ({
           type: u[2], id: u[1] + "/" + u[0].name,json:JSON.stringify(u[0]),
        }))
        .find((u) => u.id === (params as GetOneParams).id),
    } as GetOneResult<any>;
  }
);
interface PartsCountByType {
  id: string;
  type: string;
  count: number;
}
function unitByType(model) {
  const entities = model.data.original.domainModel.entities.map((e) => [
    e,
    "entities",
    "entity",
  ]);
  const functions = model.data.original.functionModel.functions.map((f) => [
    f,
    "functions",
    "function",
  ]);
  const pages = model.data.original.pageModel.pages.map((p) => [
    p,
    "pages",
    "page",
  ]);
  const presentations = model.data.original.presentationModel.presentations.map(
    (p) => [p, "presentations", "presentation"]
  );
  const infos = model.data.original.infoModel.infos.map((i) => [
    i,
    "infos",
    "info",
  ]);
  const implementations = model.data.original.implementationModel.implementations.map(
    (i) => [i, "implementations", "implementation"]
  );
  return [entities, functions, pages, presentations, infos, implementations];
}
export default w(dp)
  .chain(byTypes)
  .chain(unitGetOne)
  .chain(localSFP(units))
  .value();
