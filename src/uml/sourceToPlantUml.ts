import { ModelSource } from "./ModelSource";
import {
  hashCode,
  UmlObject,
  UmlDiagram,
  UmlRelationship,
  UmlElement
} from "./PlantUml";

export function sourceToPlantUml(sources: ModelSource[]): string {
  const uml = new UmlDiagram(
    (sources.map(
      source =>
        new UmlObject(source.name, undefined, {
          // description: source.description
        })
    ) as UmlElement[]).concat(
      sources
        .map(source => {
          return source.includeSources.map(
            included =>
              new UmlRelationship(
                hashCode(source.name),
                hashCode(included.name),
                "include"
              )
          );
        })
        .flat()
    )
  );
  return uml.toPlantUml();
}
