/* TypeScript file generated from RegisterWorkPluginVOType.res by genType. */
/* eslint-disable import/first */


import type {PipelineType_elementName as Meta3dEngineCoreType_PipelineType_elementName} from 'meta3d-engine-core-type/Meta3dEngineCoreType.gen';

import type {PipelineType_pipelineName as Meta3dEngineCoreType_PipelineType_pipelineName} from 'meta3d-engine-core-type/Meta3dEngineCoreType.gen';

// tslint:disable-next-line:interface-over-type-literal
export type insertAction = "before" | "after";

// tslint:disable-next-line:interface-over-type-literal
export type jobOrder = {
  readonly pipelineName: Meta3dEngineCoreType_PipelineType_pipelineName; 
  readonly insertElementName: Meta3dEngineCoreType_PipelineType_elementName; 
  readonly insertAction: insertAction
};

// tslint:disable-next-line:interface-over-type-literal
export type jobOrders = jobOrder[];
