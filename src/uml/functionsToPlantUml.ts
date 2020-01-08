import { withFunctionModel } from "@quick-qui/model-defines/dist/function/FunctionModel";

export function functionsToPlantUml(model: any): string {
    return "@startuml\n\n" +
        withFunctionModel(model)?.functionModel?.functions.map((fun) => {
            return `state ${fun.name}`;
        }).join("\n") +
        '\n\n'
        //TODO function之间的link没有了，体现为page之间的。
        // +
        // withFunctionModel(model)?.functionModel?.functions.map((fun) => {
        //     return (fun.links || []).map((link) => {
        //         return `${fun.name} -> ${link.function} : ${link.label}`;
        //     }).join("\n");
        // }).join("\n\n")
        + "\n\n@enduml";
}
