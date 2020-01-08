//TODO 这个貌似没有必要了？
export function modelToPlantUml(model: any): string {
    const models: any[] = ((model.domainModel && model.domainModel.entities || []) as any[])
        .concat(model.domainModel && model.domainModel.enums || [])
        .concat(model.functionModel && model.functionModel.functions || []);
    return `@startuml\n\n` +
        (model.domainModel ? model.domainModel.entities.map(entity => `object ${entity.name} {
        type = "entity"
    }`).join("\n") : '') + "\n" +
        (model.functionModel ? model.functionModel.functions.map(fun => `object ${fun.name} {
        type = "function"
    }`).join("\n") : '')
        + "\n" +
        models.map(model => model.extends ? `${model.name} --> ${model.extends} : extends` : '').join("\n")
        +
        `\n\n@enduml\n`;
}
