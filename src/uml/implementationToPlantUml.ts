import {
  withImplementationModel,
  parseRef,
  getNameWithCategory
} from "@quick-qui/model-defines";
import _ from "lodash";
import { Model } from "@quick-qui/model-core";
import {
  UmlObject,
  hashCode,
  UmlRelationship,
  UmlElement,
  UmlDiagram
} from "./PlantUml";

export function implementationToPlantUml(model: Model): string {
  const implementations =
    withImplementationModel(model)?.implementationModel?.implementations ?? [];
  const objs: UmlElement[] = implementations.map(implementation => {
    return new UmlObject(
      implementation.name,
      undefined,
      {
        type: implementation.runtime
      },
      implementation.abstract ? "abstract" : undefined
    );
  });
  const extendRelations = implementations
    .filter(imp => imp.extend)
    .map(imp => {
      const ext = imp.extend!;
      const refObj = parseRef(ext);
      const refName = getNameWithCategory(refObj.path).name;
      return new UmlRelationship(
        hashCode(imp.name),
        hashCode(refName),
        "extend",
        "extend"
      );
    });
  return new UmlDiagram(
    (objs as UmlElement[]).concat(extendRelations)
  ).toPlantUml();
}
