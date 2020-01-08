export interface Location {
  protocol: string;
  resource: any;
}

export interface ModelSource {
  id: string;
  name: string;
  description: string;
  files: ModelFile[];
  // includes: Location[];
  includeSources: ModelSource[];
}
export interface ModelFile {
  id: string;
  fileName: string;
  path: string;
  repositoryBase: string; //absolute
  modelObject: any;
}
