import { modelSpot, nameSpace } from '.';
import {
  UmlDiagram,
  UmlObject,
  UmlElement,
  hashCode,
  UmlRelationship,
  UmlClass
} from "./PlantUml";
import {
  functions,
  parseRef,
  getNameWithCategory
} from "@quick-qui/model-defines";

export function functionsToPlantUml(model: any): string {
  const objs = functions(model).map(fun => {
    return new UmlClass(
      fun.name,
      undefined,
      {},
      nameSpace(fun.namespace),
      fun.abstract ? "abstract" : undefined,
      modelSpot('function')
    );
  });
  const extendRelations = functions(model)
    .filter(fun => fun.extend)
    .map(fun => {
      const ext = fun.extend!;
      const refObj = parseRef(ext);
      const refName = getNameWithCategory(refObj.path).name;
      return new UmlRelationship(
        hashCode(fun.name),
        hashCode(refName),
        "extend",
        "extend"
      );
    });
  return new UmlDiagram(
    (objs as UmlElement[]).concat(extendRelations)
  ).toPlantUml();
}
