import { UmlDiagram, UmlObject } from "./PlantUml";
import { functions } from "@quick-qui/model-defines";

export function functionsToPlantUml(model: any): string {
  return new UmlDiagram(
    functions(model).map(fun => {
      return new UmlObject(fun.name, undefined, {});
    })
  ).toPlantUml();
}
