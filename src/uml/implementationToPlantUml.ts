import {
  withImplementationModel,
  parseRef,
  getNameWithCategory,
} from "@quick-qui/model-defines";
import _ from "lodash";
import { Model } from "@quick-qui/model-core";
import {
  hashCode,
  UmlRelationship,
  UmlElement,
  UmlDiagram,
  UmlClass,
} from "./PlantUml";
import { modelSpot, nameSpace } from ".";

export function implementationToPlantUml(model: Model): string {
  const implementations =
    withImplementationModel(model)?.implementationModel?.implementations ?? [];
  const objs: UmlElement[] = implementations.map((implementation) => {
    return new UmlClass(
      implementation.name,
      undefined,
      {
        type: implementation.runtime,
      },
      nameSpace(implementation.namespace),
      implementation.abstract ? "abstract" : undefined,
      modelSpot("implementation")
    );
  });
  const extendRelations = implementations
    .filter((imp) => imp.extend)
    .map((imp) => {
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
  const includeRelations = implementations
    .filter((imp) => imp.runtime === "launcher")
    .map((imp) =>
      (imp.parameters?.launch ?? []).map(
        (launchedImpName) =>
          new UmlRelationship(
            hashCode(imp.name),
            hashCode(launchedImpName),
            "launch",
            "ref"
          )
      )
    )
    .flat();

  return new UmlDiagram(
    (objs as UmlElement[]).concat(extendRelations).concat(includeRelations)
  ).toPlantUml();
}
