import jsonObject from "./modelFakeJson.json";

const defaultModel = {
  Model: [
    {
      id: "default",
      json: JSON.stringify(jsonObject),
      description: "The Default Model, but fake",
      original: jsonObject
    }
  ]
};
export default defaultModel;
