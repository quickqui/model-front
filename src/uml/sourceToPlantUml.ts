import { ModelSource } from "./ModelSource";
import { hashCode } from "./PlantUml";


export function sourceToPlantUml(sources: ModelSource[]): string {
  return (
    `@startuml\n\n` +
    sources
      .map(source => {
        return `object "${source.name}" as ${hashCode(source.name)}{
            description = "${source.description}"
        }`;
      }, sources)
      .join("\n") +
    "\n\n" +
    sources.map(source => {
      return source.includeSources
        .map(
          included =>
            `"${hashCode(source.name)}" --> "${hashCode(
              included.name
            )}" : include`
        )
        .flat()
        .join("\n");
    }) +
    `\n\n@enduml\n`
  );
}
