import {
  UmlDiagram,
  UmlObject,
  UmlElement,
  hashCode,
  UmlRelationship
} from "./PlantUml";
import {
  functions,
  parseRef,
  getNameWithCategory
} from "@quick-qui/model-defines";

export function functionsToPlantUml(model: any): string {
  const objs = functions(model).map(fun => {
    return new UmlObject(
      fun.name,
      undefined,
      {},
      fun.abstract ? "abstract" : undefined,
      undefined
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
