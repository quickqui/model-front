import { infos } from "@quick-qui/model-defines";
import _ from "lodash";
import {
  UmlObject,
  UmlElement,
  UmlDiagram,
} from "./PlantUml";
import { Model } from "@quick-qui/model-core";

export function infoToPlantUml(model: Model): string {
  const i = infos(model);
  const infoObjects: UmlElement[] = _.uniq(i).map(
    (i) => new UmlObject(`infos/${i.name}`, undefined, {})
  );
  return new UmlDiagram(infoObjects).toPlantUml();
}
