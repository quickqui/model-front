import _ from "lodash";

export function modelSpot(typeName: string) {
  return {
    spot: (
      {
        info: ["I", "#6699ff"],
        page: ["P", "#9966ff"],
        implementation: ["I", "#ff9966"],
        entity: ["E", "#66ff99"],
        function: ["F", "#6666ff"],
      }[typeName] ?? ["U", "#666666"]
    ).join(","),
  };
}
export function nameSpace(nameS: string): string[] {
  const parts = (nameS ?? "").split("/");
  return _.initial(parts);
}
// app.get("/uml/sources/:id", async function(req, res, next) {
//   try {
//     const model = await modelManager.getSource();
//     if (model) {
//       const startUML = sourceToPlantUml(model);
//       const rep = await axios.post(plantUMLServiceUrl, startUML);
//       res.status(200).json({ id: 1, source: rep.data });
//     } else res.status(404).send("no model source");
//   } catch (e) {
//     next(e);
//   }
// });

// app.get("/uml/models/:id", async function(req, res, next) {
//   try {
//     const model = (await modelManager.getOriginalModel()) as any;
//     if (model) {
//       const startUML = modelToPlantUml(model);
//       const rep = await axios.post(plantUMLServiceUrl, startUML);
//       res.status(200).json({ id: 1, source: rep.data });
//     } else res.status(404).send("no model");
//   } catch (e) {
//     next(e);
//   }
// });

// app.get("/uml", async function(req, res, next) {
//   try {
//     const model = (await modelManager.getModel()) as any;

//     if (model.domainModel)
//       res.status(200).send(domainToPlanUml(model.domainModel));
//     else res.status(404).send("no domain model");
//   } catch (e) {
//     next(e);
//   }
// });
// app.get("/uml/entities/:id", async function(req, res, next) {
//   //:id （暂时）是假的
//   try {
//     const model = (await modelManager.getModel()) as any;
//     if (model.domainModel) {
//       const startUML = domainToPlanUml(model.domainModel);
//       const rep = await axios.post(plantUMLServiceUrl, startUML);
//       res.status(200).json({ id: 1, source: rep.data });
//     } else res.status(404).send("no domain model");
//   } catch (e) {
//     next(e);
//   }
// });
// app.get("/uml/functions/:id", async function(req, res, next) {
//   //:id （暂时）是假的

//   try {
//     const model = (await modelManager.getModel()) as any;
//     if (model.functionModel) {
//       const startUML = functionsToPlantUml(model.functionModel);
//       const rep = await axios.post(plantUMLServiceUrl, startUML);
//       res.status(200).json({ id: 1, source: rep.data });
//     } else res.status(404).send("no function model");
//   } catch (e) {
//     next(e);
//   }
// });

// app.get("/uml/usecases/:id", async function(req, res, next) {
//   //:id （暂时）是假的
//   try {
//     const model = (await modelManager.getModel()) as any;
//     if (model.functionModel) {
//       const startUML = useCaseToPlantUml(model.functionModel);
//       const rep = await axios.post(plantUMLServiceUrl, startUML);
//       res.status(200).json({ id: 1, source: rep.data });
//     } else res.status(404).send("no function model");
//   } catch (e) {
//     next(e);
//   }
// });
