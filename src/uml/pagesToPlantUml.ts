import {
  UmlDiagram,
  UmlObject,
  UmlRelationship,
  hashCode,
  UmlElement
} from "./PlantUml";
import {
  functions,
  pages
} from "@quick-qui/model-defines";

export function pagesToPlantUml(model: any): string {
  const pageObjects = pages(model).map(
    page => new UmlObject(`pages/${page.name}`, undefined, {})
  );
  const functionObjects = functions(model).map(
    fun => new UmlObject(`functions/${fun.name}`, undefined, {})
  );

  const relations = pages(model)
    .map(page =>
      page.places.map(
        place =>
          new UmlRelationship(
            hashCode(`pages/${page.name}`),
            hashCode(`functions/${place.function}`),
            "include"
          )
      )
    )
    .flat();
  const linksRelations = functions(model)
    .map(fun =>
      (fun.links ?? []).map(
        link =>
          new UmlRelationship(
            hashCode(`functions/${fun.name}`),
            hashCode(`pages/${link.page}`),
            "goto"
          )
      )
    )
    .flat();
  return new UmlDiagram(
    (pageObjects.concat(functionObjects) as UmlElement[])
      .concat(relations)
      .concat(linksRelations)
  ).toPlantUml();
}
