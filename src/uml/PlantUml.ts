// function getIndex<T>(source: T, all: T[]): number | undefined {
//     return all.indexOf(source)
// }
import { Base64 } from "js-base64";
import { StringKeyObject } from "@quick-qui/model-defines";
import _ from "lodash";

export function hashCode(name: string): string {
  return Base64.encodeURI(name);
}

export class UmlObject {
  type: string = "object";
  id: string;
  constructor(
    public name: string,
    id: string | undefined,
    public properties: StringKeyObject,
    public stereotypes?: string,
    public color?: string
  ) {
    this.id = id ?? hashCode(name);
  }
  toPlantUml(): string {
    return `object "${this.name}" as ${this.id} ${
      this.stereotypes ? "<<" + this.stereotypes + ">>" : ""
    } ${this.color ?? ""} {
        ${_.map(this.properties, (value, key) => {
          return `
        ${key} = "${value}"`;
        })}
    }`;
  }
}
export class UmlClass {
  type: string = "class";
  id: string;
  constructor(
    public name: string,
    id: string | undefined,
    public properties: StringKeyObject
  ) {
    this.id = id ?? hashCode(name);
  }
  toPlantUml(): string {
    return `class "${this.name}" as ${this.id} {
         ${_.map(this.properties, (value, key) => {
           return `
        ${key} = "${value}"`;
         })}
    }`;
  }
}
export class UmlRelationship {
  constructor(
    public from: string,
    public to: string,
    public label: string,
    public type: string = "ref"
  ) {}

  toPlantUml(): string {
    const arrows = {
      extend: "--|>",
      ref: "-->"
    };
    const arrow = arrows[this.type ?? "ref"];
    return `"${this.from}" ${arrow} "${this.to}" : ${this.label} `;
  }
}
export type UmlElement = UmlObject | UmlClass | UmlRelationship;
export class UmlDiagram {
  constructor(public elements: UmlElement[]) {}
  toPlantUml(): string {
    return (
      `@startuml\n\n` +
      this.elements
        .map(element => {
          return element.toPlantUml();
        })
        .join("\n") +
      `\n\n@enduml\n`
    );
  }
}
