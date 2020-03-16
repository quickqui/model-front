import { exchanges } from "@quick-qui/model-defines";
import _ from "lodash";
import { UmlObject, hashCode, UmlRelationship, UmlElement, UmlDiagram } from "./PlantUml";
import { Model } from '@quick-qui/model-core';

export function exchangeToPlantUml(model: Model):string{
    const ends = exchanges(model).map(exchange => [exchange.to, exchange.from]).flat();
    const endObjects : UmlElement[]= _.uniq(ends).map(end=>new UmlObject(`ends/${end}`,undefined,{}))
    const relations = exchanges(model).map(exchange=>new UmlRelationship(hashCode(`ends/${exchange.from}`),hashCode(`ends/${exchange.to}`),exchange.resources.toString()))
    return new UmlDiagram(endObjects.concat(relations)).toPlantUml()
}