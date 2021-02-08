// function getIndex<T>(source: T, all: T[]): number | undefined {
//     return all.indexOf(source)
// }
import { Base64 } from "js-base64";
import { StringKeyObject } from "@quick-qui/model-defines";
import _ from "lodash";

export function hashCode(name: string): string {
  return Base64.encodeURI(name);
}
export interface Style {
  color?: string;
  spot?: string;
}
export class UmlObject {
  type: string = "object";
  id: string;
  constructor(
    public name: string,
    id: string | undefined,
    public properties: StringKeyObject,
    public stereotypes?: string,
    public style?: Style
  ) {
    this.id = id ?? hashCode(name);
  }
  ss(): string {
    return this.stereotypes || this.style?.spot
      ? `<<${this.style?.spot ? `(${this.style?.spot})` : ""} ${
          this.stereotypes ?? ""
        }>>`
      : "";
  }
  toPlantUml(): string {
    return `object "${this.name}" as ${this.id} ${this.ss()} ${
      this.style?.color ?? ""
    } {
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

    public properties: StringKeyObject,
    public nameSpace?: string[],
    public stereotypes?: string,

    public style?: Style
  ) {
    this.id = id ?? hashCode(name);
  }
  ss(): string {
    return this.stereotypes || this.style?.spot
      ? `<<${this.style?.spot ? `(${this.style?.spot})` : ""} ${
          this.stereotypes ?? ""
        }>>`
      : "";
  }
  toPlantUml(): string {
    return `class "${this.name}" as ${this.id} ${this.ss()} ${
      this.style?.color ?? ""
    } {
        ${_.map(this.properties, (value, key) => {
          return `
        ${key} = "${value}"`;
        })}
    }`;
  }
}
export class UmlRelationship {
  type= 'ref'
  constructor(
    public from: string,
    public to: string,
    public label: string,
    public refType: string ="ref"
  ) {}

  toPlantUml(): string {
    const arrows = {
      extend: "--|>",
      ref: "-->",
    };
    const arrow = arrows[this.refType ?? "ref"];
    return `"${this.from}" ${arrow} "${this.to}" : ${this.label} `;
  }
}
export type UmlElement = UmlObject | UmlClass | UmlRelationship;
export class UmlDiagram {
  constructor(public elements: UmlElement[]) {}

  toPlantUml(): string {
    const [ref, other] = _(this.elements)
      .partition((e) => e.type === "ref")
      .value();
    const packages = _(other)
      .groupBy((e) => {
        return ((e as any).nameSpace ?? []).join("/");
      })
      .value();
    console.log(packages);
    function packageToUml(packageName: string, elements: any[]): string {
      const contents = elements
        .map((element) => {
          return element.toPlantUml();
        })
        .join("\n");
      if (packageName !== "")
        return `package "${packageName}" {
        ${contents}
      }`;
      else return contents;
    }

    return `@startuml
      ${_(packages)
        .map((value, key) => packageToUml(key, value))
        .join("\n")}
        ${ref.map((r) => r.toPlantUml()).join("\n")}
      @enduml`;
  }
}
