//TODO 这里是一个转换dp，需要建模，或者直接from internal to internal
import {
  DataProvider,
  GET_ONE,
  forResourceAndFetchTypeOneParam,
  GetOneResult,
  GetOneParams,
  GET_LIST,
  GetListResult,
  w
} from "@quick-qui/data-provider";
import { implementationGlobal, Entity } from "@quick-qui/model-defines";
import { Model } from "./ModelDP";
import _ from "lodash";
const dp: DataProvider = forResourceAndFetchTypeOneParam(
  "Entity",
  GET_LIST,
  async (): Promise<GetListResult<Entity>> => {
    const existingDp: DataProvider = implementationGlobal?.["dataProvider"]!;
    const model = (await existingDp(GET_ONE, "Model", {
      id: "default"
    } as GetOneParams)) as GetOneResult<Model>;
    const entities = model.data.original.domainModel.entities;
    return {
      data: entities.map(entity => _.extend({}, entity, { id: entity.name })),
      total: entities.length
    } as GetListResult<Entity>;
  }
);

const byTypes = forResourceAndFetchTypeOneParam(
  "PartsByType",
  GET_LIST,
  async (): Promise<GetListResult<PartsCountByType>> => {
    const existingDp: DataProvider = implementationGlobal?.["dataProvider"]!;
    const model = (await existingDp(GET_ONE, "Model", {
      id: "default"
    } as GetOneParams)) as GetOneResult<Model>;
    const entities = model.data.original.domainModel.entities;
    const functions = model.data.original.functionModel.functions;
    return {
      total: 2,
      data: [
        {
          id: "entity",
          type: "entity",
          count: entities.length
        },
        { id: "function", type: "function", count: functions.length }
      ]
    } as GetListResult<PartsCountByType>;
  }
);
interface PartsCountByType {
  id: string;
  type: string;
  count: number;
}

export default w(dp)
  .chain(byTypes)
  .value();
