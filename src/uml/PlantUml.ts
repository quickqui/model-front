
// function getIndex<T>(source: T, all: T[]): number | undefined {
//     return all.indexOf(source)
// }
import { Base64 } from "js-base64";

export function hashCode(name: string): string {
    return Base64.encodeURI(name);
}

