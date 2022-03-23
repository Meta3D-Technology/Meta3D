import type { stream as Meta3dBsMostProtocol_StreamType_stream } from 'meta3d-bs-most-protocol/src/service/StreamType.gen';

import type { pipelineData as PipelineType_pipelineData } from '../../state/PipelineType.gen';

import type { pipelineName as PipelineType_pipelineName } from '../../state/PipelineType.gen';

import { state, operateStatesFuncs } from "../../state/StateType"

// tslint:disable-next-line:interface-over-type-literal
export type jobName = string;

// tslint:disable-next-line:interface-over-type-literal
export type stream<a> = Meta3dBsMostProtocol_StreamType_stream<a>;

// tslint:disable-next-line:interface-over-type-literal
export type execFunc = (_1: state, _2: operateStatesFuncs) => stream<state>;

// tslint:disable-next-line:interface-over-type-literal
export type getExecFunc = (_1: PipelineType_pipelineName, _2: jobName) => (null | undefined | execFunc);

// tslint:disable-next-line:interface-over-type-literal
export type pipelineData = PipelineType_pipelineData;

// tslint:disable-next-line:interface-over-type-literal
export type createStateFunc<state> = () => state;

// tslint:disable-next-line:interface-over-type-literal
export type initFunc<state> = (_1: state) => void;

// tslint:disable-next-line:interface-over-type-literal
export type workPluginName = string;

// tslint:disable-next-line:interface-over-type-literal
export type allPipelineData = pipelineData[];

// tslint:disable-next-line:interface-over-type-literal
export type workPluginContribute<state, states> = {
    readonly workPluginName: workPluginName;
    readonly createStateFunc: createStateFunc<state>;
    readonly initFunc: initFunc<state>;
    readonly getExecFunc: getExecFunc;
    readonly allPipelineData: allPipelineData
};

// tslint:disable-next-line:interface-over-type-literal
export type getWorkPluginContribute<state, config, states> = (_1: config) => workPluginContribute<state, states>;
