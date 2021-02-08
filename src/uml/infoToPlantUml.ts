import { infos } from "@quick-qui/model-defines";
import _ from "lodash";
import { UmlElement, UmlDiagram, UmlClass } from "./PlantUml";
import { Model } from "@quick-qui/model-core";
import { modelSpot, nameSpace } from ".";

export function infoToPlantUml(model: Model): string {
  const i = infos(model);
  const infoObjects: UmlElement[] = _.uniq(i).map(
    (i) =>
      new UmlClass(
        `${i.name}`,
        undefined,
        {type:i.type},
        nameSpace(i.namespace),
        undefined,
        modelSpot("info")
      )
  );
  return new UmlDiagram(infoObjects).toPlantUml();
}
