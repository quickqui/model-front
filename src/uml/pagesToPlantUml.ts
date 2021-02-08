import {
  UmlDiagram,
  UmlObject,
  UmlRelationship,
  hashCode,
  UmlElement,
  UmlClass,
} from "./PlantUml";
import { functions, pages } from "@quick-qui/model-defines";
import { modelSpot, nameSpace } from ".";

export function pagesToPlantUml(model: any): string {
  const pageObjects = pages(model).map(
    (page) =>
      new UmlClass(
        page.name,
        hashCode(`pages/${page.name}`),
        {},
        nameSpace(page.namespace),
        undefined,
        modelSpot("page")
      )
  );
  const functionObjects = functions(model)
    .filter((fun) => (fun.abstract ?? false) === false)
    .map(
      (fun) =>
        new UmlClass(
          fun.name,
          hashCode(`functions/${fun.name}`),
          {},
          nameSpace(fun.namespace),
          undefined,
          {
            color: "#LightBlue",
            ...modelSpot("function"),
          }
        )
    );

  const includeRelations = pages(model)
    .map((page) =>
      page.places.map(
        (place) =>
          new UmlRelationship(
            hashCode(`pages/${page.name}`),
            hashCode(`functions/${place.function}`),
            "include"
          )
      )
    )
    .flat();
  const linksRelations = functions(model)
    .map((fun) =>
      (fun.links ?? []).map(
        (link) =>
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
      .concat(includeRelations)
      .concat(linksRelations)
  ).toPlantUml();
}
