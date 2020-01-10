//TODO user/role没有包含在model-defines里面，所以uescase不是最底层的model，所以这个图在这里是否合适？
export function useCaseToPlantUml(functionModel: any): string| undefined {
    const uml = functionModel.functions.map((fun) => {
        return (fun.roles || []).map((role) => {
            return `:${role}: -> (${fun.name})`;
        }).join("\n");
    }).join("\n\n")
    if (uml.trim() !== '')
        return "@startuml\n\n" + uml
            + "\n\n@enduml";
    else return undefined
}
